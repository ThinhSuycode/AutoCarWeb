import { useState } from "react";

const useUserAppointment = () => {
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  return {
    openOrder,
    setOpenOrder,
  };
};

export default useUserAppointment;
