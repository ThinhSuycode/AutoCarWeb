import classNames from "classnames/bind";
import styles from "./CarGallary.module.scss";
import type { CarDetailsType } from "../../../../types/car/car-detail.type";

const cx = classNames.bind(styles);

type GalleryState = {
  img: string;
  idx: number;
};

interface Props {
  carDetails: CarDetailsType;
  imgCurrent: GalleryState;
  isTransitioning: boolean;
  onChangeImg: (img: string, idx: number) => void;
}

const CarGallery = ({
  carDetails,
  imgCurrent,
  isTransitioning,
  onChangeImg,
}: Props) => {
  return (
    <div className={cx("car-image-inner")}>
      <div className={cx("image__large")}>
        <img
          src={imgCurrent.img}
          className={cx({
            transitioning: isTransitioning,
          })}
          alt={carDetails.carId.name}
        />

        <div className={cx("count-current")}>
          {imgCurrent.idx + 1}/{carDetails.images?.length || 0}
        </div>
      </div>

      <div className={cx("list-image__small")}>
        {carDetails.images.map((img: string, idx: number) => (
          <div
            key={idx}
            className={cx("img-item", {
              active: idx === imgCurrent.idx,
            })}
            onClick={() => onChangeImg(img, idx)}
          >
            <img
              src={
                img ||
                "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200"
              }
              alt={`Car view ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;
