import classNames from "classnames/bind";
import styles from "./Banner.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { BannerData } from "../../types/showroom";
import { imgBannerData } from "../../data/ShowRoom";

const cx = classNames.bind(styles);

const Banner = ({ dataImg }: { dataImg: BannerData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const changeSlide = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      setCurrentIndex((prev) => {
        if (direction === "next") return (prev + 1) % dataImg.length;
        return prev === 0 ? dataImg.length - 1 : prev - 1;
      });

      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning, dataImg.length],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) changeSlide("next");
    }, 3000);
    return () => clearInterval(timer);
  }, [isDragging, changeSlide]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [currentIndex, isTransitioning],
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTransitioning) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - startXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(dragOffsetRef.current) > 60) {
      changeSlide(dragOffsetRef.current > 0 ? "prev" : "next");
    }
  };

  // Translate toàn bộ list theo currentIndex + dragOffset
  const listStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
    transition: isDragging ? "none" : "transform 0.7s ease",
  };

  return (
    <div
      className={cx("banner-showRoom")}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div style={listStyle} className={cx("list-img")}>
        {imgBannerData.map((item: BannerData) => (
          <img
            key={item.id}
            src={item.image}
            alt={`banner-${item.id}`}
            draggable={false}
          />
        ))}
      </div>

      <div className={cx("nav-act")}>
        {dataImg.map((img: BannerData, index: number) => (
          <div
            key={img.id}
            className={cx("item", { active: currentIndex === index })}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
