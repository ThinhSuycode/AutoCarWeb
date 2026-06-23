import { User } from "../models/user.model";
import crypto from "crypto";
import { resetPasswordTemplate } from "../templates/resetPasswordTemplate";
import { sendEmail } from "./email.service";

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email không tồn tại");
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;

  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Đặt lại mật khẩu",
    html: resetPasswordTemplate(user.username || "", resetLink),
  });
};
