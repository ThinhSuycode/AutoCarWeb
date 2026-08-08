import { Response } from "express";
import { User } from "../models/user.model";
import { verifyToken, extractToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";
import { getUserWithPopulate } from "../services/user.service";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        message: "Không có token",
      });
    }

    const decoded = verifyToken(token);

    const user = await getUserWithPopulate(decoded._id);

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
