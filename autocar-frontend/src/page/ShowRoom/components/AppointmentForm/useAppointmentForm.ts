import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeApi } from "../../../../services/api";
import { config } from "../../../../config";
import toast from "react-hot-toast";

interface AppointmentForm {
  name: string;
  phone: string;
  location: string;
  type: string;
  date: string;
  time: string;
  note: string;
}

const INIT_FORM: AppointmentForm = {
  name: "",
  phone: "",
  location: "",
  type: "",
  date: "",
  time: "",
  note: "",
};

export const useAppointmentForm = () => {
  const [form, setForm] = useState<AppointmentForm>(INIT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const onHandleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const validate = useCallback((): boolean => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để đặt lịch!");
      setTimeout(() => navigate(config.Routes.Login), 2000);
      return false;
    }
    if (!form.name.trim()) {
      toast.error("Vui lòng nhập họ và tên!");
      return false;
    }
    if (!form.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return false;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ!");
      return false;
    }
    if (!form.location) {
      toast.error("Vui lòng chọn showroom!");
      return false;
    }
    if (!form.type) {
      toast.error("Vui lòng chọn dịch vụ!");
      return false;
    }
    if (!form.date) {
      toast.error("Vui lòng chọn ngày hẹn!");
      return false;
    }
    if (!form.time) {
      toast.error("Vui lòng chọn giờ hẹn!");
      return false;
    }
    return true;
  }, [form, userId, navigate]);

  const onHandleSubmit = useCallback(async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await changeApi.request("appointments", "add", {
        type: form.type,
        name: form.name,
        phone: form.phone,
        location: form.location,
        date: form.date,
        time: form.time,
        note: form.note || "",
        userId,
      });

      toast.success("Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm.");
      setForm(INIT_FORM);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Không thể đặt lịch, vui lòng thử lại!",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [form, userId, validate]);

  return { form, isSubmitting, onHandleChange, onHandleSubmit };
};
