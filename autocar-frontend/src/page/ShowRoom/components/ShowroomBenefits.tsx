import classNames from "classnames/bind";
import styles from "../ShowRoom.module.scss";
import { whyVisitData } from "../constants/showroomData";
import type { WhyVisitType } from "../../../types/showroom";

const cx = classNames.bind(styles);

const ShowroomBenefits = () => {
  return (
    <div className={cx("why-visit")}>
      <div className={cx("heading")}>
        <h3>Tại sao nên ghé thăm Showroom?</h3>
      </div>
      <div className={cx("main")}>
        <div className={cx("list-features")}>
          {whyVisitData.map((item: WhyVisitType) => (
            <div key={item.title} className={cx("features-item")}>
              <div className={cx("icon")}>
                <i className={`fa-solid ${item.icon}`} />
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowroomBenefits;
