import classNames from "classnames/bind";
import styles from "../Services.module.scss";
import type { ServiceItem } from "../../../types/services";

const cx = classNames.bind(styles);

interface Props {
  service: ServiceItem;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <div className={cx("item")} data-aos="flip-right">
      <div className={cx("heading")}>
        <div>
          <i className={`fa-solid fa-${service.icon}`}></i>
        </div>

        <h4>{service.title}</h4>
      </div>

      <div className={cx("desc")}>
        <div>{service.description}</div>

        <div className={cx("list-desc")}>
          {service.features.map((feat) => (
            <div
              key={feat}
              className={cx("desc-item")}
            >
              <span>
                <i className="fa-regular fa-circle-check"></i>
              </span>

              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="" className={cx("cta-act")}>
        <span>{service.cta}</span>

        <span>
          <i className="fa-solid fa-arrow-right"></i>
        </span>
      </a>
    </div>
  );
};

export default ServiceCard;