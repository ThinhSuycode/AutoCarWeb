import classNames from "classnames/bind";
import styles from "./CarSpecs.module.scss";
import type {
  CarDetailsType,
  InfoSpecsType,
} from "../../../../types/car/car-detail.type";

const cx = classNames.bind(styles);

const CarSpecs = ({ carDetails }: { carDetails: CarDetailsType }) => {
  return (
    <div className={cx("car-information")}>
      <div className={cx("specifications")}>
        <div className={cx("heading")}>
          <h3>Thông số kỹ thuật</h3>
        </div>
        <div className={cx("main")}>
          {carDetails.specs?.map((specs, specIndex) => (
            <div key={specIndex} className={cx("info-item")}>
              <h4>{specs.title}</h4>
              <div className={cx("desc")}>
                {specs.items.map((specsInfo: InfoSpecsType, itemIndex) => (
                  <div key={itemIndex}>
                    <p>{specsInfo.label}</p>
                    <p>{specsInfo.value || "N/A"}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cx("features")}>
        <div className={cx("heading")}>
          <h3>Tính năng nổi bật</h3>
        </div>
        <div className={cx("main")}>
          {carDetails.features &&
            carDetails.features.length > 0 &&
            carDetails.features.map((feature, index) => (
              <div key={index} className={cx("info-item")}>
                <div className={cx("icon")}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <p>{feature}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarSpecs;
