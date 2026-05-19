import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["test_drive", "consultation", "maintenance", "inspection"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    // Thông tin người đặt lịch
    name: { type: String, trim: true },
    phone: { type: String, trim: true },

    // Thông tin xe — optional vì form showroom chưa chọn xe cụ thể
    carId: { type: String, ref: "Car", default: null },
    carName: { type: String, default: "", trim: true },

    // Thông tin lịch hẹn
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    note: { type: String, default: "" },

    // Liên kết user — optional nếu chưa đăng nhập
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

appointmentSchema.index({ userId: 1, status: 1 });
appointmentSchema.index({ managerId: 1, status: 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
