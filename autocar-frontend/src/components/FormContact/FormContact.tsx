import React from "react";
import styles from "./FormContact.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import {
  contactFormSchema,
  type ContactFormData,
} from "../../schemas/contact.schema";
import useFormContact from "./hooks/useFormContact";
import type { UserType } from "../../types/user/user.type";
import type { CarDetailsType } from "../../types/car/car-detail.type";

const cx = classNames.bind(styles);

interface Props {
  userInfo: UserType | undefined | null;
  car?: CarDetailsType | null;
}

const FormContact: React.FC<Props> = ({ userInfo, car }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });
  const { onSubmit, isPending } = useFormContact({
    userInfo,
    car,
    reset,
  });
  return (
    <div className={cx("form-contact")}>
      <div className={cx("heading")}>Liên Hệ Người Bán</div>
      <div className={cx("desc")}>
        Để lại thông tin để được tư vấn chi tiết và đặt lịch xem xe.
      </div>

      <form
        className={cx("form-request")}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Họ tên */}
        <div className={cx("form-input")}>
          <p>Họ và tên</p>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            {...register("name")}
          />
          <i className={cx("field-icon", "fa-regular", "fa-user")}></i>
          {errors.name && (
            <span className={cx("error")}>{errors.name.message}</span>
          )}
        </div>

        {/* Số điện thoại */}
        <div className={cx("form-input")}>
          <p>Số điện thoại</p>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            {...register("phone")}
          />
          <i className={cx("field-icon", "fa-solid", "fa-phone")}></i>
          {errors.phone && (
            <span className={cx("error")}>{errors.phone.message}</span>
          )}
        </div>

        {/* Lời nhắn */}
        <div className={cx("form-input")}>
          <p>Lời nhắn</p>
          <textarea
            placeholder="Nhập lời nhắn của bạn"
            {...register("message")}
          />
          <i
            className={cx("field-icon", "fa-regular", "fa-message")}
            style={{ top: 42 }}
          ></i>
          {errors.message && (
            <span className={cx("error")}>{errors.message.message}</span>
          )}
        </div>

        <Button
          large
          type="submit"
          iconLeft={<i className="fa-regular fa-paper-plane"></i>}
        >
          {isPending ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </form>

      <div className={cx("hotline")}>
        <p>Hoặc liên hệ trực tiếp qua hotline</p>
        <div className={cx("phone-info")}>
          <span>
            <i className="fa-solid fa-phone"></i>
          </span>
          <span>0869114177</span>
        </div>
      </div>
    </div>
  );
};

export default FormContact;
