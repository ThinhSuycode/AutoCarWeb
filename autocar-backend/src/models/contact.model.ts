import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    // ── Người liên hệ ──────────────────────────────
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    notes: { type: String, default: "Khách liên hệ từ web" },

    // ── Xe liên quan ──────────────────────────────
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", default: null },
    // Snapshot tại thời điểm gửi — tránh mất data khi xe bị xóa
    carName: { type: String, default: null },
    carBrand: { type: String, default: null },
    carPrice: { type: Number, default: null },

    // ── Người dùng ──────────────────────────────
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedAt: { type: Date, default: null },

    // ── Trạng thái ──────────────────────────────
    status: {
      type: String,
      enum: ["pending", "contacted", "done", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// ── Indexes ──────────────────────────────────────
ContactSchema.index({ managerId: 1, status: 1, createdAt: -1 }); // staff dashboard
ContactSchema.index({ buyerId: 1, createdAt: -1 }); // lịch sử buyer
ContactSchema.index({ carId: 1 }); // admin xem theo xe
ContactSchema.index({ status: 1, createdAt: -1 }); // admin lọc tổng

export const Contact = mongoose.model("Contact", ContactSchema);
