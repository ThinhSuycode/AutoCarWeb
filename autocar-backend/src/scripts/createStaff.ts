import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { connectDB } from "../config/db";

dotenv.config();

const staffData = [
  {
    email: "nguyen.van.a@caroom.vn",
    password: "Staff@123",
    username: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Q.1, TP.HCM",
    role: "staff",
    staffInfo: {
      department: "Kinh Doanh",
      position: "Tư Vấn Bán Hàng",
      phone: "0901234567",
    },
  },
  {
    email: "tran.thi.b@caroom.vn",
    password: "Staff@123",
    username: "Trần Thị B",
    phone: "0912345678",
    address: "Q.3, TP.HCM",
    role: "staff",
    staffInfo: {
      department: "Kinh Doanh",
      position: "Tư Vấn Bán Hàng",
      phone: "0912345678",
    },
  },
  {
    email: "le.van.c@caroom.vn",
    password: "Staff@123",
    username: "Lê Văn C",
    phone: "0923456789",
    address: "Q.7, TP.HCM",
    role: "staff",
    staffInfo: {
      department: "Kỹ Thuật",
      position: "Kỹ Thuật Viên",
      phone: "0923456789",
    },
  },
  {
    email: "pham.thi.d@caroom.vn",
    password: "Staff@123",
    username: "Phạm Thị D",
    phone: "0934567890",
    address: "Q.Bình Thạnh, TP.HCM",
    role: "staff",
    staffInfo: {
      department: "Chăm Sóc Khách Hàng",
      position: "Nhân Viên CSKH",
      phone: "0934567890",
    },
  },
];

const run = async () => {
  await connectDB();

  let created = 0;
  let skipped = 0;

  for (const staff of staffData) {
    const existing = await User.findOne({ email: staff.email });
    if (existing) {
      console.log(`Đã tồn tại: ${staff.email}`);
      skipped++;
      continue;
    }

    const hashedPassword = await bcrypt.hash(staff.password, 10);
    await User.create({ ...staff, password: hashedPassword });
    console.log(`Tạo thành công: ${staff.username} - ${staff.email}`);
    created++;
  }

  console.log(`\nHoàn thành! Tạo mới: ${created} | Bỏ qua: ${skipped}`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Lỗi:", err);
  process.exit(1);
});
