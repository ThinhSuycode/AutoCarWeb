import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  brand: String,
  price: Number,
  year: Number,
  mileage: Number,
  transmission: String,
  bodyType: String,
  fuelType: String,
  engineSize: String,
  color: String,
  seats: Number,
  image: String,
  hasWarranty: Boolean,
  isInspected: Boolean,
  features: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const Car = mongoose.model("Car", carSchema);
