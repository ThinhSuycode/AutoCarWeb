import { Car } from "../models/car.model";
import { CarDetail } from "../models/carDetail.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { ManagerStatusType } from "../schemas/car.schema";
import { AppError } from "../utils/AppError";

interface GetAllCarParams {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
  all?: string;
  search?: string;
  transmission?: string;
  brand?: string;
  bodyType?: string;
  priceMin?: string;
  priceMax?: string;
  yearMin?: string;
  yearMax?: string;
}

const buildCarQuery = ({
  search,
  brand,
  bodyType,
  transmission,
  yearMin,
  yearMax,
  priceMin,
  priceMax,
}: Pick<
  GetAllCarParams,
  | "search"
  | "brand"
  | "bodyType"
  | "transmission"
  | "yearMin"
  | "yearMax"
  | "priceMin"
  | "priceMax"
>) => {
  const query: Record<string, any> = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { id: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (brand && brand !== "Hãng xe") query.brand = brand;

  if (bodyType && bodyType !== "Tất cả loại")
    query.bodyType = { $in: [bodyType] };

  if (transmission && transmission !== "Tất cả")
    query.transmission = transmission;

  if (yearMin || yearMax) {
    query.year = {};
    if (yearMin) query.year.$gte = Number(yearMin);
    if (yearMax) query.year.$lte = Number(yearMax);
  }

  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }

  return query;
};

export const carService = {
  getAll: async (params: GetAllCarParams) => {
    const {
      page = "1",
      limit = "9",
      sort = "createdAt",
      order = "desc",
      all,
    } = params;

    const query = buildCarQuery(params);

    const sortOrder = order === "asc" ? 1 : -1;

    if (all === "true") {
      const cars = await Car.find(query)
        .sort({ [sort]: sortOrder })
        .select("-__v");

      return {
        data: cars,
        pagination: {
          page: 1,
          limit: cars.length,
          total: cars.length,
          totalPages: 1,
        },
      };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [cars, total] = await Promise.all([
      Car.find(query)
        .sort({ [sort]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .select("-__v"),
      Car.countDocuments(query),
    ]);

    return {
      data: cars,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  },

  create: async (payload: Record<string, any>) => {
    return Car.create({ ...payload, managerId: null });
  },

  update: async (id: string, payload: Record<string, any>) => {
    const updatedCar = await Car.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!updatedCar) throw new AppError("Không tìm thấy xe!", 404);

    await CarDetail.findOneAndUpdate(
      { carId: id },
      {
        name: updatedCar.name,
        brand: updatedCar.brand,
        price: updatedCar.price,
        year: updatedCar.year,
      },
      { new: true },
    );

    return updatedCar;
  },

  delete: async (id: string) => {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) throw new AppError("Không tìm thấy xe!", 404);
    return deletedCar;
  },

  assignManager: async (carId: string, managerId: string) => {
    const [staff, car] = await Promise.all([
      User.findById(managerId),
      Car.findById(carId),
    ]);

    if (!staff) throw new AppError("Không tìm thấy nhân viên!", 404);
    if (staff.role !== "staff")
      throw new AppError("User này không phải nhân viên!", 400);
    if (!car) throw new AppError("Không tìm thấy xe!", 404);

    return Car.findByIdAndUpdate(
      carId,
      { managerId, managerStatus: "pending" },
      { new: true },
    ).populate("managerId", "username email staffInfo");
  },

  removeManager: async (carId: string) => {
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { managerId: null },
      { new: true },
    );

    if (!updatedCar) throw new AppError("Không tìm thấy xe!", 404);
    return updatedCar;
  },

  getAllWithManager: async (params: {
    page?: string;
    limit?: string;
    hasManager?: string;
  }) => {
    const { page, hasManager, limit: limitQuery = "5" } = params;

    const limit = Math.min(Math.max(Number(limitQuery), 1), 50);
    const query: Record<string, any> = {};

    if (hasManager === "false") query.managerId = null;
    if (hasManager === "true") query.managerId = { $ne: null };

    const [cars, total] = await Promise.all([
      Car.find(query)
        .populate("managerId", "username email staffInfo avatar")
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * limit)
        .limit(limit)
        .select("-__v"),
      Car.countDocuments(query),
    ]);

    return {
      data: cars,
      pagination: {
        page: Number(page),
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getAllStaffWithCarCount: async () => {
    const staffList = await User.find({ role: "staff" })
      .select("username email staffInfo avatar")
      .sort({ createdAt: -1 });

    const staffIds = staffList.map((s) => s._id);

    const carCounts = await Car.aggregate([
      { $match: { managerId: { $in: staffIds } } },
      { $group: { _id: "$managerId", count: { $sum: 1 } } },
    ]);

    const countMap = Object.fromEntries(
      carCounts.map((c) => [c._id.toString(), c.count]),
    );

    return staffList.map((staff) => ({
      ...staff.toObject(),
      carCount: countMap[staff._id.toString()] ?? 0,
    }));
  },

  getByManager: async (
    managerId: any,
    params: {
      page?: string;
      limit?: string;
      search?: string;
      managerStatus?: string;
    },
  ) => {
    const { page = "1", limit = "10", search, managerStatus = "all" } = params;

    const query: Record<string, any> = { managerId };
    if (managerStatus !== "all") query.managerStatus = managerStatus;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const [cars, total] = await Promise.all([
      Car.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("managerId", "username email")
        .select("-__v"),
      Car.countDocuments(query),
    ]);

    return {
      data: cars,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  },

  updateManagerStatus: async (
    carId: string,
    managerStatus: ManagerStatusType,
    userId: string,
  ) => {
    const car = await Car.findById(carId);
    if (!car) throw new AppError("Không tìm thấy xe!", 404);

    if (car.managerId?.toString() !== userId.toString()) {
      throw new AppError("Bạn không được quản lý xe này!", 403);
    }

    car.managerStatus = managerStatus;

    const order = await Order.findOne({ carId });
    if (!order) {
      throw new AppError("Không tìm thấy đơn hàng!", 404);
    }

    if (car.managerStatus === "completed") {
      order.status = "ready_for_delivery";
    }

    await car.save();

    await order.save();
    return car;
  },
};
