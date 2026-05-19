import { Request, Response } from "express";
import { User } from "../models/user.model";
import { verifyToken, extractToken } from "../utils/jwt"; // dùng utils

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: "Không có token" });
    }

    // verifyToken thay thế jwt.verify + cast
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
