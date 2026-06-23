import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { WHY_CHOOSE_ITEMS } from "../constants/homeData";

const cx = classNames.bind(styles);

const HomeWhyChoose = () => {
  return (
    <div className={cx("information-inner")}>
      <div className={cx("content")}>
        <div className={cx("heading")} data-aos="fade-left">
          <h3>Tại sao chọn Auto Viet ?</h3>
          <p>
            Chúng tôi cam kết mang đến trải nghiệm mua xe tốt nhất với dịch vụ
            chuyên nghiệp và uy tín
          </p>
        </div>

        <div className={cx("list-item")} data-aos="fade-right">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div key={idx} className={cx("item")}>
              <div className={cx("icon")}>
                <i className={item.icon} />
              </div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeWhyChoose;
