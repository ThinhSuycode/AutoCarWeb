import classNames from "classnames/bind";
import styles from "./AboutValues.module.scss";
import { coreValues } from "../../constants/aboutData";

const cx = classNames.bind(styles);

const AboutValues = () => {
  return (
    <div className={cx("info-cost")}>
      <div className={cx("heading")} data-aos="fade-down">
        <h3>GIÁ TRỊ CỐT LỖI</h3>

        <p>
          Những nguyên tắc định hình văn hóa và cách chúng tôi phục vụ khách
          hàng mỗi ngày
        </p>
      </div>

      <div className={cx("list-info")}>
        {coreValues.map((item) => (
          <div
            key={item.title}
            className={cx("info-item")}
            data-aos="flip-right"
          >
            <div>
              <i className={item.icon}></i>
            </div>

            <h4>{item.title}</h4>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutValues;
