import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { config } from "../../../config";
import { useFavouriteMutation } from "../../../mutations/useFavouriteMutation";
import type { UserType } from "../../../types/user/user.type";
import type { CarDetailsType } from "../../../types/car/car-detail.type";

interface Props {
  userInfo?: UserType | null;
  carDetails?: CarDetailsType;
}

const useCarActions = ({ userInfo, carDetails }: Props) => {
  const navigate = useNavigate();

  const { mutateAsync: favouriteMutation, isPending } = useFavouriteMutation();

  const carId = carDetails?.carId;

  const isFavourite = useMemo(() => {
    if (!userInfo || !carId) return false;

    return userInfo.favouriteCar?.some((item) => item._id === carId._id);
  }, [userInfo?.favouriteCar, carId]);

  const onHandleFavourite = useCallback(async () => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập để thêm xe yêu thích!");

      setTimeout(() => {
        navigate(config.Routes.Login);
      }, 1500);

      return;
    }

    try {
      await favouriteMutation({
        id: userInfo._id ?? "",
        carId: carId?._id ?? "",
      });

      toast.success(
        isFavourite
          ? "Đã xóa khỏi danh sách yêu thích!"
          : "Đã thêm vào danh sách yêu thích!",
      );
    } catch (error) {
      console.error(error);
    }
  }, [userInfo, carId, isFavourite, favouriteMutation, navigate]);

  const onHandleShare = useCallback(() => {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: carDetails?.carId.name ?? "Chi tiết xe",
          text: `Xem ${carDetails?.carId.name} - ${carDetails?.carId.price?.toLocaleString(
            "vi-VN",
          )} VNĐ`,
          url,
        })
        .then(() => toast.success("Chia sẻ thành công!"))
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(err);
          }
        });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Đã sao chép liên kết!"))
        .catch(() => toast.error("Không thể sao chép liên kết!"));
    }
  }, [carDetails]);

  return {
    isFavourite,
    onHandleFavourite,
    onHandleShare,
    isLoading: isPending,
  };
};

export default useCarActions;
