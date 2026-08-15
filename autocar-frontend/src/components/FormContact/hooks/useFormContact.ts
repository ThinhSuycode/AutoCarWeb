import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { ContactFormData } from "../../../schemas/contact.schema";
import type { UserType } from "../../../types/user/user.type";
import type { CarDetailsType } from "../../../types/car/car-detail.type";
import usePostContact from "../../../mutations/ContactMutation/usePostContact";

interface Props {
  userInfo: UserType | undefined | null;
  car?: CarDetailsType | null;
  reset: () => void;
}

const useFormContact = ({ userInfo, car, reset }: Props) => {
  const navigate = useNavigate();

  const { mutate: postContact, isPending } = usePostContact();

  const onSubmit = async (data: ContactFormData) => {
    try {
      if (!userInfo) {
        toast.error("Vui lòng đăng nhập để gửi yêu cầu!");
        setTimeout(() => navigate("/dang-nhap"), 1500);
        return;
      }

      await postContact({
        carId: car?.carId._id,
        data: {
          ...data,
          carName: car?.carId.name,
          carBrand: car?.carId.brand,
          carPrice: car?.carId.price,
          notes: "Khách liên hệ từ website",
        },
      });
      reset();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      toast.error(message || "Gửi yêu cầu thất bại!!");
    }
  };

  return { onSubmit, isPending };
};

export default useFormContact;
