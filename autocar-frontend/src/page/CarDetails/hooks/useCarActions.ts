import { useCallback, useMemo } from "react";
import type { UserType } from "../../../types/users";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";
import { useFavouriteMutation } from "../../../mutations/useFavouriteMutation";
import type { CarDetailsType } from "../../../types/car";

interface Props {
  userInfo: UserType | undefined;
  carDetails: CarDetailsType | undefined;
}

const useCarActions = ({ userInfo, carDetails }: Props) => {
  const navigate = useNavigate();
  const favouriteMutation = useFavouriteMutation();
  const onHandleFavourite = useCallback(
    async (id: string) => {
      if (!userInfo) {
        toast.error("Vui lòng đăng nhập để thêm sản phẩm yêu thích!");

        setTimeout(() => navigate(config.Routes.Login), 1500);

        return;
      }

      const currentFavourite = [...(userInfo.favouriteCar ?? [])];

      const isAlreadyFavourite = currentFavourite.includes(id);

      const updateFavouriteData = isAlreadyFavourite
        ? currentFavourite.filter((fav) => fav !== id)
        : [...currentFavourite, id];

      const dataNew: UserType = {
        ...userInfo,
        favouriteCar: updateFavouriteData,
      };

      try {
        await favouriteMutation.mutateAsync({
          id: userInfo._id ?? "",
          data: dataNew,
        });

        toast.success(
          isAlreadyFavourite
            ? "Đã xóa khỏi danh sách yêu thích!"
            : "Đã thêm vào danh sách yêu thích!",
        );
      } catch (error) {
        console.error(error);
      }
    },
    [userInfo, navigate, favouriteMutation],
  );
  const isFavourite = useMemo(() => {
    const favouriteCars = userInfo?.favouriteCar ?? [];
    return favouriteCars.some(
      (id) => String(id) === String(carDetails?.carId._id),
    );
  }, [userInfo?.favouriteCar, carDetails?.carId._id]);
  //  Handle share
  const onHandleShare = useCallback(() => {
    const url = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: carDetails?.name || "Chi tiết xe",
          text: `Xem chi tiết ${carDetails?.name} - Giá: ${carDetails?.price?.toLocaleString("vi-VN")}₫`,
          url: url,
        })
        .then(() => toast.success("Chia sẻ thành công!"))
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Share error:", error);
          }
        });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Đã sao chép link vào clipboard!"))
        .catch(() => toast.error("Không thể sao chép link!"));
    }
  }, [carDetails]);

  return {
    onHandleFavourite,
    isFavourite,
    onHandleShare,
  };
};

export default useCarActions;
