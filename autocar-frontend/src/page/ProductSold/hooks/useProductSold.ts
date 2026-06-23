import { useEffect, useState } from "react";
import type { CarType } from "../../../types/car";
import { callApi } from "../../../services/api";
import type { PaginatedResponse } from "../../../types/pagination";

export const useProductSold = () => {
  const [carDataSold, setCarDataSold] = useState<CarType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          await callApi.getData<PaginatedResponse<CarType>>("cars?all=true");
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
