import classNames from "classnames/bind";
import styles from "../Services.module.scss";
import { processSteps } from "../constants/servicesData";

const cx = classNames.bind(styles);

const ServicesProcess = () => {
  return (
    <div className={cx("servicesProcess-wrapper")}>
      <div className={cx("heading")} data-aos="fade-down">
        <div>QUY TRÌNH CHUYÊN NGHIỆP</div>

        <h3>Các Bước Thực Hiện</h3>

        <p>
          Quy trình làm việc minh bạch, rõ ràng giúp khách hàng yên tâm tuyệt
          đối khi sử dụng dịch vụ tại AutoViet.
        </p>
      </div>

      <div className={cx("list-item")} data-aos="fade-up">
        {processSteps.map((step) => (
          <div key={step.step} className={cx("item")}>
            <div className={cx("icon")}>
              <i className={`fa-solid fa-${step.icon}`}></i>

              <div className={cx("count")}>{step.step}</div>
            </div>

            <div className={cx("desc")}>
              <h4>{step.title}</h4>

              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesProcess;
