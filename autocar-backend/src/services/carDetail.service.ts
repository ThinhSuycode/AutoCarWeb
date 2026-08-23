import { CarDetail } from "../models/carDetail.model";
import { Car } from "../models/car.model";
import { AppError } from "../utils/AppError";
import { validateObjectId } from "../utils/validateObjectId";

const withCarPopulate = (q: any) => q.populate("carId").select("-__v");

export const carDetailService = {
  getAll: async () => {
    return withCarPopulate(CarDetail.find());
  },

  getByCarId: async (carId: string) => {
    const carDetail = await withCarPopulate(CarDetail.findOne({ carId }));

    if (!carDetail) {
      throw new AppError("Không tìm thấy chi tiết xe tại getId!", 404);
    }

    return carDetail;
  },

  create: async (payload: Record<string, any>) => {
    const { carId } = payload;
    const [car, existed] = await Promise.all([
      Car.findById(carId),
      CarDetail.findOne({ carId }),
    ]);

    if (!car) throw new AppError("Không tìm thấy xe!", 404);
    if (existed) throw new AppError("Xe đã có nội dung chi tiết!", 400);

    return CarDetail.create(payload);
  },

  updateByCarId: async (carId: string, payload: Record<string, any>) => {
    const updated = await CarDetail.findOneAndUpdate({ carId }, payload, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updated) throw new AppError("Không tìm thấy thông tin xe!", 404);
    return updated;
  },

  deleteByCarId: async (carId: string) => {
    const deleted = await CarDetail.findOneAndDelete({ carId });
    if (!deleted) throw new AppError("Không tìm thấy xe!", 404);
    return deleted;
  },
};
