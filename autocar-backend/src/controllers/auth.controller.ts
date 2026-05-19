import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";
import { OAuth2Client } from "google-auth-library";
import { isValidEmail, isValidPassword } from "../utils/validate";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, phone } = req.body;

    if (!email || !password || !username || !phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Định dạng Email không hợp lệ!!" });
    }

    const passwordValidate = isValidPassword(password);
    if (passwordValidate) {
      return res.status(400).json({ message: passwordValidate });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      phone,
    });

    // Không trả về password
    const { password: _, ...userWithoutPassword } = user.toObject();
    return res
      .status(201)
      .json({ message: "Đăng ký thành công", user: userWithoutPassword });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email và password là bắt buộc" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Định dạng email không hợp lệ!!" });
    }

    const passwordValidate = isValidPassword(password);
    if (passwordValidate) {
      return res.status(400).json({ message: passwordValidate });
    }

    const user = await User.findOne({ email });

    if (user?.googleId) {
      return res.status(400).json({
        message: "Tài khoản này đăng nhập bằng Google!",
      });
    }

    if (!user || !user.password) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    const token = signToken({
      id: String(user._id),
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
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
// LOGIN GOOGLE
export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Thiếu credential" });
    }

    // verify token Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    const { email, name, picture, sub } = payload;
    if (!email) {
      return res.status(400).json({ message: "Google account không có email" });
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
    } else {
      if (!user.googleId) {
        user.googleId = sub;
        await user.save();
      }
    }

    // tạo token
    const token = signToken({
      id: String(user._id),
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
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      message: "Đăng nhập Google thất bại",
    });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    // Validate mật khẩu mới
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự!" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu mới không được trùng mật khẩu cũ!" });
    }

    const user = await User.findById(req.user?.id);
    if (!user?.password) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
