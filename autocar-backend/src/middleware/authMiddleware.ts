import { Request, Response, NextFunction } from "express";
import { verifyToken, extractToken } from "../utils/jwt";
import type { JwtPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Xác thực token
export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

//Phân quyền
export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden - Không có quyền" });
    }

    next();
  };
};
