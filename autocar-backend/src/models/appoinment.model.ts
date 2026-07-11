import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    showroom: {
      type: String,
      enum: ["AutoViet Hà Nội", "AutoViet Đà Nẵng", "AutoViet Bình Định"],
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    confirmedAt: Date,

    completedAt: Date,

    cancelledAt: Date,
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
