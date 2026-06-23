import mongoose from "mongoose";
import { MANAGER_STATUS } from "../schemas/car.schema";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    brand: {
      type: String,
      required: true,
    },

    year: Number,
    mileage: Number,
    transmission: String,
    color: String,
    image: String,

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    managerStatus: {
      type: String,
      enum: MANAGER_STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const Car = mongoose.model("Car", carSchema);
