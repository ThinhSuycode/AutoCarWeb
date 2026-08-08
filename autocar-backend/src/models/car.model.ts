import mongoose from "mongoose";
import { CAR_STATUS, MANAGER_STATUS } from "../schemas/car.schema";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 100_000_000,
    },

    year: {
      type: Number,
      required: true,
    },

    mileage: {
      type: Number,
      default: 0,
      min: 0,
    },

    bodyType: {
      type: [String],
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    fuel: {
      type: String,
      enum: ["Xăng", "Diesel", "Hybrid", "Điện"],
      required: true,
    },

    engine: {
      type: String,
      required: true,
      trim: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 2,
    },

    color: {
      type: String,
      required: true,
    },

    origin: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: CAR_STATUS,
      default: "available",
      index: true,
    },

    managerStatus: {
      type: String,
      enum: MANAGER_STATUS,
      default: "pending",
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    soldAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

carSchema.index({
  brand: 1,
  status: 1,
});

export const Car = mongoose.model("Car", carSchema);
