import { AppError } from "../utils/AppError";
import { Appointment } from "../models/appoinment.model";
import { toMinutes } from "../utils/time";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const VALID_TYPES = ["test_drive", "consultation", "maintenance", "inspection"];
const ACTIVE_STATUSES = ["pending", "confirmed"];
const BUFFER_MINUTES = 120;
const PHONE_REGEX = /^(0|\+84)[0-9]{9}$/;

// ─── 1. Validate field bắt buộc ───────────────────────────────────────────────
export const validateRequiredFields = (body: Record<string, any>) => {
  const { type, date, time, location } = body;
  const missing = [
    !type && "type",
    !date && "date",
    !time && "time",
    !location && "location",
  ]
    .filter(Boolean)
    .join(", ");

  if (missing) throw new AppError(`Thiếu thông tin bắt buộc: ${missing}`, 400);
};

// ─── 2. Validate khách vãng lai ───────────────────────────────────────────────
export const validateGuestInfo = (name: string, phone: string) => {
  if (!name || !phone) {
    throw new AppError("Vui lòng cung cấp họ tên và số điện thoại!", 400);
  }
  if (!PHONE_REGEX.test(phone.replace(/\s/g, ""))) {
    throw new AppError("Số điện thoại không hợp lệ!", 400);
  }
};

// ─── 3. Validate loại dịch vụ ────────────────────────────────────────────────
export const validateType = (type: string) => {
  if (!VALID_TYPES.includes(type)) {
    throw new AppError("Loại dịch vụ không hợp lệ!", 400);
  }
};

// ─── 4. Validate trạng thái ───────────────────────────────────────────────────
export const validateStatus = (status: string) => {
  if (!status || !VALID_STATUSES.includes(status)) {
    throw new AppError("Trạng thái không hợp lệ!", 400);
  }
};

// ─── 5. Kiểm tra trùng lịch ───────────────────────────────────────────────────
export const validateNoConflict = async (body: {
  carId?: string;
  userId?: string;
  phone?: string;
  date: string;
  time: string;
}) => {
  const { carId, userId, phone, date, time } = body;
  const requestedMinutes = toMinutes(time);

  // Cùng xe, cùng ngày
  if (carId) {
    const sameCarSameDay = await Appointment.find({
      carId,
      date,
      status: { $in: ACTIVE_STATUSES },
    });

    for (const appt of sameCarSameDay) {
      const diff = Math.abs(requestedMinutes - toMinutes(appt.time));

      if (diff === 0) {
        throw new AppError(
          `Xe này đã có lịch hẹn lúc ${appt.time} ngày ${date}. Vui lòng chọn giờ khác!`,
          409,
        );
      }
      if (diff < BUFFER_MINUTES) {
        throw new AppError(
          `Xe này đã có lịch hẹn lúc ${appt.time} ngày ${date}. Vui lòng đặt cách ít nhất 2 tiếng!`,
          409,
        );
      }
    }
  }

  // Cùng user, cùng ngày
  if (userId) {
    const sameUserSameDay = await Appointment.findOne({
      userId,
      date,
      status: { $in: ACTIVE_STATUSES },
    });

    if (sameUserSameDay) {
      throw new AppError(
        `Bạn đã có lịch hẹn vào ngày ${date} lúc ${sameUserSameDay.time}. Mỗi ngày chỉ được đặt 1 lịch!`,
        409,
      );
    }
  }

  // Khách vãng lai — cùng số điện thoại, cùng ngày
  if (!userId && phone) {
    const samePhoneSameDay = await Appointment.findOne({
      phone,
      date,
      status: { $in: ACTIVE_STATUSES },
    });

    if (samePhoneSameDay) {
      throw new AppError(
        `Số điện thoại này đã có lịch hẹn vào ngày ${date}. Mỗi ngày chỉ được đặt 1 lịch!`,
        409,
      );
    }
  }
};
