import { useState } from "react";

const useShowRoom = () => {
  const [activeAddress, setActiveAddress] = useState<string>("");
  return {
    activeAddress,
    setActiveAddress,
  };
};

export default useShowRoom;
