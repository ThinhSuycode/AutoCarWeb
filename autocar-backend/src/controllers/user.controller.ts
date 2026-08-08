import type { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import type { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const SALT_ROUNDS = 10;

const ALLOWED_SORT_FIELDS = ["createdAt", "updatedAt", "username", "email"];

// ─── GET ALL ──────────────────────────────────────────────────────────────────
export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const {
    role,
    page = "1",
    limit = "9",
    sort = "createdAt",
    order = "desc",
    search,
    isActive,
  } = req.query as Record<string, string>;

  const query: Record<string, any> = {};

  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === "true";

  if (search?.trim()) {
    query.$or = [
      { username: { $regex: search.trim(), $options: "i" } },
      { email: { $regex: search.trim(), $options: "i" } },
      { phone: { $regex: search.trim(), $options: "i" } },
      { role: { $regex: search.trim(), $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(100, Math.max(1, Number(limit)));
  const sortOrder = order === "asc" ? 1 : -1;
  const sortField = ALLOWED_SORT_FIELDS.includes(sort) ? sort : "createdAt";

  const [users, total] = await Promise.all([
    User.find(query)
      .select("-password")
      .sort({ [sortField]: sortOrder })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    User.countDocuments(query),
  ]);

  res.status(200).json({
    data: users,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const createUser = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const validated = createUserSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(validated.error.issues[0].message);
    }

    const { email, password, ...rest } = validated.data;

    const existing = await User.findOne({ email });

    if (existing) {
      res.status(409).json({
        message: "Email này đã có tài khoản sử dụng!!",
      });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), SALT_ROUNDS);
    const user = new User({ email, ...rest, password: hashedPassword });
    const newUser = await user.save();

    const { password: _pw, ...userWithoutPassword } = newUser.toObject();

    logger.info("User created", { userId: newUser._id, by: req.user?._id });
    res.status(201).json(userWithoutPassword);
  },
);

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateUser = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const validated = updateUserSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(validated.error.issues[0].message);
    }

    const updateData = { ...validated.data };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) throw new AppError("Không tìm thấy người dùng!", 404);

    logger.info("User updated", { userId: id, by: req.user?._id });
    res.status(200).json(updatedUser);
  },
);

export const toggleFavouriteCar = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { carId } = req.body;

    if (id && typeof id !== "string") {
      throw new AppError("ID người dùng không hợp lệ", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID người dùng không hợp lệ", 400);
    }

    if (!carId) {
      throw new AppError("Thiếu carId", 400);
    }

    const user = await User.findById(id);

    if (!user) {
      throw new AppError("Không tìm thấy người dùng", 404);
    }

    const exists = user.favouriteCar.some((item) => item.toString() === carId);

    user.favouriteCar = exists
      ? user.favouriteCar.filter((item) => item.toString() !== carId)
      : [...user.favouriteCar, new mongoose.Types.ObjectId(carId)];
    await user.save();

    logger.info("Toggle favourite", {
      userId: id,
      carId,
      action: exists ? "remove" : "add",
      by: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  },
);
export const toggleArticleSave = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { articleId } = req.body;

    if (id && typeof id !== "string") {
      throw new AppError("ID người dùng không hợp lệ", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID người dùng không hợp lệ", 400);
    }

    if (!articleId) {
      throw new AppError("Thiếu articleId", 400);
    }

    const user = await User.findById(id);

    if (!user) {
      throw new AppError("Không tìm thấy người dùng", 404);
    }

    const exists = user.articleSave.some(
      (item) => item.toString() === articleId,
    );
    user.articleSave = exists
      ? user.articleSave.filter((item) => item.toString() !== articleId)
      : [...user.articleSave, new mongoose.Types.ObjectId(articleId)];

    await user.save();

    logger.info("Toggle article", {
      userId: id,
      articleId,
      action: exists ? "remove" : "add",
      by: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  },
);

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteUser = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      throw new AppError("ID không hợp lệ!!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("ID không hợp lệ!", 400);
    }
    // Không cho phép tự xoá chính mình
    if (req.user?._id === id) {
      throw new AppError("Không thể xoá tài khoản của chính mình!", 403);
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new AppError("Không tìm thấy người dùng!", 404);

    logger.info("User deleted", { userId: id, by: req.user?._id });
    res.status(200).json({ message: "Xoá dữ liệu thành công!" });
  },
);

// ─── UPDATE AVATAR ────────────────────────────────────────────────────────────
export const updateAvatar = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!req.file) throw new AppError("Không có file ảnh!", 400);

    const avatarUrl = (req.file as any).path ?? req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true },
    ).select("-password");

    if (!updatedUser) throw new AppError("Không tìm thấy người dùng!", 404);

    logger.info("Avatar updated", { userId: id, by: req.user?._id });
    res.status(200).json(updatedUser);
  },
);
