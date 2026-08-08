import { useParams } from "react-router-dom";

import { useCarDetail as useCarDetailQuery } from "../../../queries/useCarDetail";
import { useCurrentUser } from "../../../queries/useCurrentUser";

import { useCarGallery } from "./useCarGallery";
import useCarActions from "./useCarActions";

const useCarDetail = () => {
  const { id } = useParams();

  const { data: carDetails, isLoading } = useCarDetailQuery(id);

  const { imgCurrent, isTransitioning, onChangeImg } = useCarGallery(
    carDetails?.images,
  );

  const { data: userInfo } = useCurrentUser(!!localStorage.getItem("token"));

  const { isFavourite } = useCarActions({
    userInfo,
    carDetails,
  });

  return {
    id,
    carDetails,
    isLoading,

    userInfo,
    isFavourite,

    imgCurrent,
    isTransitioning,
    onChangeImg,
  };
};

export default useCarDetail;
