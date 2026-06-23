import { useEffect, useState } from "react";

export const useCarGallery = (images: string[] = []) => {
  const [imgCurrent, setImgCurrent] = useState({
    img: "",
    idx: 0,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!images.length) return;

    setImgCurrent({
      img: images[0],
      idx: 0,
    });
  }, [images]);

  const onChangeImg = (img: string, idx: number) => {
    if (idx === imgCurrent.idx || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setImgCurrent({
        img,
        idx,
      });

      setIsTransitioning(false);
    }, 300);
  };

  return {
    imgCurrent,
    isTransitioning,
    onChangeImg,
  };
};
