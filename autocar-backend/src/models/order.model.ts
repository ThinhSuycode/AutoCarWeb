import mongoose, { Schema } from "mongoose";

export const ORDER_STATUS = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const;

export const PAYMENT_METHOD = ["cash", "bank_transfer", "installment"] as const;
const orderSchema = new Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    staffId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
      index: true,
    },

    buyerSnapshot: {
      username: {
        type: String,
        required: true,
      },
      email: String,
      phone: String,
    },

    carSnapshot: {
      name: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      color: String,
      year: Number,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    // Giá niêm yết
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Giá bán sau thương lượng
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // %
    taxRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 10,
    },

    // Số tiền VAT
    tax: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    deposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Thành tiền cuối cùng
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: PAYMENT_METHOD,
      default: "cash",
    },

    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "pending",
      index: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model("Order", orderSchema);
