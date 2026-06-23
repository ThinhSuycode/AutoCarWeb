// hooks/useMobileFilter.ts
import { useCallback, useState } from "react";

export const useMobileFilter = () => {
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [closeFilterMobile, setCloseFilterMobile] = useState(false);

  const openFilter = useCallback(() => {
    setOpenFilterMobile(true);
  }, []);

  const closeFilter = useCallback(() => {
    setCloseFilterMobile(true);

    setTimeout(() => {
      setCloseFilterMobile(false);
      setOpenFilterMobile(false);
    }, 350);
  }, []);

  return {
    openFilterMobile,
    closeFilterMobile,
    setOpenFilterMobile,
    closeFilter,
  };
};
