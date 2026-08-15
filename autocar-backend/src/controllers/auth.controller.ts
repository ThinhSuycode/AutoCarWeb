import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";
import { OAuth2Client } from "google-auth-library";

import {
  changePasswordSchema,
  forgotPasswordSchema,
  googleLoginSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema";
import * as authService from "../services/auth.service";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER
export const register = catchAsync(async (req: Request, res: Response) => {
  const validated = registerSchema.safeParse(req.body);

  if (!validated.success) {
    throw new AppError(validated.error.issues[0].message);
  }

  const { email, password, username, phone } = validated.data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "Email đã tồn tại!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    username,
    phone,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();

  return res.status(201).json({
    message: "Đăng ký thành công",
    user: userWithoutPassword,
  });
});
// LOGIN
export const login = catchAsync(async (req: Request, res: Response) => {
  const validated = loginSchema.safeParse(req.body);

  if (!validated.success) {
    throw new AppError(validated.error.issues[0].message);
  }

  const { email, password } = validated.data;

  const user = await User.findOne({ email });

  if (user?.googleId) {
    return res.status(400).json({
      message: "Tài khoản này đăng nhập bằng Google!",
    });
  }

  if (!user || !user.password) {
    return res.status(401).json({
      message: "Email hoặc mật khẩu không đúng!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Email hoặc mật khẩu không đúng!",
    });
  }

  const token = signToken({
    _id: user.id,
    username: user.username ?? "",
    email: user.email ?? "",
    role: user.role ?? "user",
  });

  return res.status(200).json({
    token,
    user: {
      _id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    },
  });
});
// LOGIN GOOGLE
export const loginWithGoogle = catchAsync(
  async (req: Request, res: Response) => {
    const validated = googleLoginSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(validated.error.issues[0].message);
    }

    const { credential } = validated.data;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({
        message: "Token không hợp lệ",
      });
    }

    const { email, name, picture, sub } = payload;

    if (!email) {
      return res.status(400).json({
        message: "Google account không có email",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        username: name,
        avatar: picture,
        googleId: sub,
        loginType: "google",
        password: "",
      });
    } else if (!user.googleId) {
      user.googleId = sub;
      await user.save();
    }

    const token = signToken({
      _id: user.id,
      username: user.username ?? "",
      email: user.email ?? "",
      role: user.role ?? "user",
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
    });
  },
);
// CHANGE PASSWORD
export const changePasswordAccount = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const validated = changePasswordSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(validated.error.issues[0].message);
    }
    const { currentPassword, newPassword } = validated.data;

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "Mật khẩu mới không được trùng mật khẩu cũ!",
      });
    }

    const user = await User.findById(req.user?._id);

    if (!user?.password) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const validated = forgotPasswordSchema.safeParse(req.body);

    if (!validated.success) {
      throw new AppError(validated.error.issues[0].message);
    }

    const { email } = validated.data;

    await authService.forgotPassword(email);

    return res.status(200).json({
      message: "Đã gửi email đặt lại mật khẩu",
    });
  },
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const validated = resetPasswordSchema.safeParse(req.body);

  if (!validated.success) {
    throw new AppError(validated.error.issues[0].message);
  }

  const { token, password } = validated.data;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }

  user.password = await bcrypt.hash(password, 10);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return res.status(200).json({
    message: "Đặt lại mật khẩu thành công",
  });
});
