import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

export const getUserWithPopulate = async (id: string) => {
  return User.findById(id)
    .select("-password")
    .populate({
      path: "favouriteCar",
      select: "name brand price year thumbnail mileage transmission",
    })
    .populate({
      path: "articleSave",
      select: "title slug excerpt thumbnail category readTime createdAt",
    })
    .populate("appointmentSchedule");
};

const SALT_ROUNDS = 10;
const ALLOWED_SORT_FIELDS = ["createdAt", "updatedAt", "username", "email"];

interface GetAllUserParams {
  role?: string;
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
  search?: string;
  isActive?: string;
}

/** Toggle 1 id trong 1 mảng field (dùng chung cho favouriteCar / articleSave) */
const toggleIdInArray = async (
  userId: string,
  field: "favouriteCar" | "articleSave",
  targetId: string,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("Không tìm thấy người dùng", 404);

  const list: mongoose.Types.ObjectId[] = user[field];
  const exists = list.some((item) => item.toString() === targetId);

  user[field] = exists
    ? list.filter((item) => item.toString() !== targetId)
    : [...list, new mongoose.Types.ObjectId(targetId)];

  await user.save();
  return { user, action: exists ? "remove" : "add" };
};

export const userService = {
  getAll: async (params: GetAllUserParams) => {
    const {
      role,
      page = "1",
      limit = "9",
      sort = "createdAt",
      order = "desc",
      search,
      isActive,
    } = params;

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

    return {
      data: users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  },

  create: async (payload: Record<string, any>) => {
    const { email, password, ...rest } = payload;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError("Email này đã có tài khoản sử dụng!!", 409);
    }

    const hashedPassword = await bcrypt.hash(password.trim(), SALT_ROUNDS);
    const user = new User({ email, ...rest, password: hashedPassword });
    const newUser = await user.save();

    const { password: _pw, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  },

  update: async (id: string, payload: Record<string, any>) => {
    const updateData = { ...payload };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) throw new AppError("Không tìm thấy người dùng!", 404);
    return updatedUser;
  },

  delete: async (id: string) => {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new AppError("Không tìm thấy người dùng!", 404);
    return deletedUser;
  },

  updateAvatar: async (id: string, avatarUrl: string) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true },
    ).select("-password");

    if (!updatedUser) throw new AppError("Không tìm thấy người dùng!", 404);
    return updatedUser;
  },

  toggleFavouriteCar: (userId: string, carId: string) =>
    toggleIdInArray(userId, "favouriteCar", carId),

  toggleArticleSave: (userId: string, articleId: string) =>
    toggleIdInArray(userId, "articleSave", articleId),
};
