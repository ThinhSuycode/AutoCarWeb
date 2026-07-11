import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import type { ContactFormData } from "../../../schemas/contact.schema";
import type { UserType } from "../../../types/users";
import type { CarDetailsType } from "../../../types/car";

interface Props {
  userInfo: UserType | null;
  car?: CarDetailsType | null;
  reset: () => void;
  postContact: any;
}

const useFormContact = ({ userInfo, car, reset, postContact }: Props) => {
  const navigate = useNavigate();

  const onSubmit = (data: ContactFormData) => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
      setTimeout(() => navigate("/dang-nhap"), 1500);
      return;
    }

    postContact(
      {
        carId: car?.carId._id,
        data: {
          ...data,
          carName: car?.name,
          carBrand: car?.brand,
          carPrice: car?.price,
          notes: "Khách liên hệ từ website",
        },
      },
      {
        onSuccess: () => {
          toast.success("Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.");
          reset();
        },
        onError: () => {
          toast.error("Không thể gửi yêu cầu, vui lòng thử lại!");
        },
      },
    );
  };

  return { onSubmit };
};

export default useFormContact;
