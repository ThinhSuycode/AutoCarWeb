import { useEffect, useState } from "react";
import { callApi } from "../../../services/api";
import type { CarType } from "../../../types/car/car.type";
import type { CarListResponse } from "../../../types/car/car.response";

export const useProductSold = () => {
  const [carDataSold, setCarDataSold] = useState<CarType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callApi.getData<CarListResponse>("cars?all=true");
        setCarDataSold(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    carDataSold,
    isLoading,
  };
};
