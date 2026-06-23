import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";

const useProductNavigation = () => {
  const navigate = useNavigate();
  const onHandleAllProduct = useCallback(() => {
    navigate(config.Routes.ProductSold);
  }, []);
  return {
    onHandleAllProduct,
  };
};

export default useProductNavigation;
