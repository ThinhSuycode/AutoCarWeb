import React, { useCallback, useState } from "react";
import styles from "./FormContact.module.scss";
import classNames from "classnames/bind";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { changeApi } from "../../services/api";
import type { Contact } from "../../types/contact";
import type { CarDetailsType } from "../../types/car";
import type { UserType } from "../../types/users";
import { Button } from "../Button/Button";

const cx = classNames.bind(styles);

interface FormContactType {
  userInfo: UserType | null;
  carDetail?: CarDetailsType;
}

const FormContact: React.FC<FormContactType> = ({ userInfo, carDetail }) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();
  //  Handle input change cho form liên hệ
  const onChangeContactForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const onHandleSubmitContact = useCallback(async () => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập để thực hiện gửi yêu cầu!!");
      setTimeout(() => navigate("/dang-nhap"), 1500);
      return;
    }

    if (!contactForm.name.trim()) {
      toast.error("Vui lòng nhập họ và tên!");
      return;
    }

    if (!contactForm.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(contactForm.phone.trim().replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }
    if (!contactForm.message.trim()) {
      toast.error("Vui lòng nhập yêu cầu muốn gửi!");
      return;
    }
    // if (!carDetail?.id) {
    //   toast.error("Không tìm thấy thông tin xe!");
    //   return;
    // }

    setIsSending(true);

    try {
      const payload = {
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        message: contactForm.message.trim(),
        carId: carDetail?._id ?? null,
        carName: carDetail?.name ?? null,
        managerId: carDetail?.managerId ?? null,
        buyerId: userInfo?._id,
        notes: "Khách liên hệ từ website",
        status: "pending",
      };

      const contactSuccess = await changeApi.request<Contact>(
        "contacts",
        "add",
        payload,
      );
      if (contactSuccess) {
        toast.success(
          "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm.",
        );
        return;
      } else {
        toast.error("Gửi yêu cầu không thành công! ");
      }

      setContactForm({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submit contact error:", error);
      toast.error("Không thể gửi yêu cầu, vui lòng thử lại!");
    } finally {
      setIsSending(false);
    }
  }, [contactForm, carDetail, userInfo, navigate]);
  return (
    <div className={cx("form-contact")}>
      <div className={cx("heading")}>Liên Hệ Người Bán</div>
      <div className={cx("desc")}>
        Để lại thông tin để được tư vấn chi tiết và đặt lịch xem xe.
      </div>
      <div className={cx("form-request")}>
        <div className={cx("form-input")}>
          <p>Họ và tên</p>
          <input
            type="text"
            name="name"
            placeholder="Nhập họ và tên"
            value={contactForm.name}
            onChange={onChangeContactForm}
          />
        </div>
        <div className={cx("form-input")}>
          <p>Số điện thoại</p>
          <input
            type="text"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={contactForm.phone}
            onChange={onChangeContactForm}
          />
        </div>
        <div className={cx("form-input")}>
          <p>Lời nhắn</p>
          <textarea
            name="message"
            id="message"
            placeholder="Nhập lời nhắn của bạn"
            value={contactForm.message}
            onChange={onChangeContactForm}
          ></textarea>
        </div>
      </div>
      <Button
        large
        iconLeft={<i className="fa-regular fa-paper-plane"></i>}
        onClick={onHandleSubmitContact}
      >
        {isSending ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
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
