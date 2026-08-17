import React, { useCallback, useState } from "react";

const useContactQuestion = () => {
  const [activeIdx, setActiveIdx] = useState<number[]>([]);
  const onHandleQuestion = useCallback((idx: number) => {
    setActiveIdx((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((item: number) => item !== idx);
      }
      return [...prev, idx];
    });
  }, []);
  return {
    activeIdx,
    onHandleQuestion,
  };
};

export default useContactQuestion;
