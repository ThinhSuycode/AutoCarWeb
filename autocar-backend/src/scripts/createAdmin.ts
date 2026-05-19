import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { connectDB } from "../config/db";

dotenv.config();
const run = async () => {
  const {
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_USERNAME,
    ADMIN_PHONE,
    ADMIN_ADDRESS,
  } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD trong .env!");
    process.exit(1);
  }

  await connectDB();

  // Kiểm tra admin đã tồn tại chưa
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("Admin đã tồn tại!");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await User.create({
    email: ADMIN_EMAIL,
    password: hashedPassword,
    username: ADMIN_USERNAME || "Admin",
    phone: ADMIN_PHONE || "",
    address: ADMIN_ADDRESS || "",
    role: "admin",
    staffInfo: {
      department: "Ban Giám Đốc",
      position: "Quản Trị Viên",
      phone: ADMIN_PHONE || "",
    },
  });

  console.log("Tạo admin thành công!");
  process.exit(0);
};

run().catch((err) => {
  console.error("Lỗi:", err);
  process.exit(1);
});
