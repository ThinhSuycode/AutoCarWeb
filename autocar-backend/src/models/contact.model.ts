import mongoose from "mongoose";

export const CONTACT_STATUS = [
  "new",
  "assigned",
  "contacted",
  "appointment_created",
  "completed",
  "cancelled",
] as const;

export type ContactStatusType = (typeof CONTACT_STATUS)[number];

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    notes: { type: String, default: "Khách liên hệ từ web" },

    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", default: null },

    carName: { type: String, default: null },
    carBrand: { type: String, default: null },
    carPrice: { type: Number, default: null },

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

    status: {
      type: String,
      enum: CONTACT_STATUS,
      default: "new",
    },
    timeline: [
      {
        action: {
          type: String,
          required: true,
        },

        note: {
          type: String,
          default: "",
        },

        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

ContactSchema.index({ managerId: 1, status: 1, createdAt: -1 });
ContactSchema.index({ buyerId: 1, createdAt: -1 });
ContactSchema.index({ carId: 1 });
ContactSchema.index({ status: 1, createdAt: -1 });

export const Contact = mongoose.model("Contact", ContactSchema);
