import { User } from "../models/user.model";

export const getUserWithPopulate = async (id: string) => {
  return User.findById(id)
    .select("-password")
    .populate({
      path: "favouriteCar",
      select: "name brand price year image mileage transmission",
    })
    .populate({
      path: "articleSave",
      select: "title slug excerpt thumbnail category readTime createdAt",
    })
    .populate("appointmentSchedule");
};
