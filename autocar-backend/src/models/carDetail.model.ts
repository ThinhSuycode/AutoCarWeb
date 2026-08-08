import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const specSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    items: [itemSchema],
  },
  { _id: false },
);

const carDetailSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Car",
      unique: true,
    },

    location: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    hasWarranty: {
      type: Boolean,
      default: false,
    },

    isInspected: {
      type: Boolean,
      default: false,
    },

    features: {
      type: [String],
      default: [],
    },

    specs: {
      type: [specSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const CarDetail = mongoose.model("CarDetail", carDetailSchema);
