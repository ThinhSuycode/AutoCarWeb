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
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    year: {
      type: Number,
      min: 1900,
    },

    mileage: {
      type: Number,
      min: 0,
    },

    transmission: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    image: String,

    images: {
      type: [String],
      default: [],
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    color: {
      type: [String],
      default: null,
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

carDetailSchema.index({ brand: 1 });
carDetailSchema.index({ price: 1 });

export const CarDetail = mongoose.model("CarDetail", carDetailSchema);
