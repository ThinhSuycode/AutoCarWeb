import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: "" },

    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: false,
      default: null,
    },
    carName: { type: String, required: false, default: null },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
      index: true,
    },
    // Người gửi liên hệ
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Thông tin liên hệ công ty (lưu cứng tại thời điểm gửi)
    companyHotline: { type: String, default: "0869114177" },

    notes: {
      type: String,
      default: "Khách liên hệ từ web",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "done", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Index để query nhanh
ContactSchema.index({ sellerId: 1, status: 1 }); // seller xem danh sách
ContactSchema.index({ buyerId: 1 }); // buyer xem lịch sử
ContactSchema.index({ carId: 1 }); // admin xem theo xe

export const Contact = mongoose.model("Contact", ContactSchema);
