import classNames from "classnames/bind";
import styles from "./ShowroomBanner.module.scss";
import type { BannerType } from "../../types/common/banner.type";
import useShowroomBanner from "./hooks/useShowroomBanner";

const cx = classNames.bind(styles);

const ShowroomBanner = ({ listImage }: { listImage: BannerType[] }) => {
  const {
    currentIndex,
    goToIndex,
    handleDragEnd,
    handleDragMove,
    listStyle,
    isDragging,
    handleDragStart,
  } = useShowroomBanner(listImage);

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
        {listImage.map((item: BannerType) => (
          <img
            key={item.id}
            src={item.image}
            alt={`banner-${item.id}`}
            draggable={false}
          />
        ))}
      </div>

      <div className={cx("nav-act")}>
        {listImage.map((img: BannerType, index: number) => (
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

export default ShowroomBanner;
