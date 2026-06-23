import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: String,
    email: { type: String, required: true, unique: true },
    username: String,
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    address: String,
    role: {
      type: String,
      enum: ["admin", "staff", "user"],
      default: "user",
    },
    staffInfo: {
      department: { type: String, default: "" }, // phòng ban
      position: { type: String, default: "" }, // chức vụ
      phone: { type: String, default: "" }, // hotline nhân viên
    },
    googleId: {
      type: String,
      default: null,
    },
    loginType: {
      type: String,
      enum: ["normal", "google"],
      default: "normal",
    },
    avatar: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/15/User-PNG-Photos.png",
    },
    favouriteCar: [String],
    appointmentSchedule: [],
    articleSave: [String],

    resetPasswordToken: String,

    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
