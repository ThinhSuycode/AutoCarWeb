import classNames from "classnames/bind";
import styles from "../Services.module.scss";
import ServiceCard from "./ServicesCard";
import { ServicesData } from "../constants/servicesData";

const cx = classNames.bind(styles);

const ServicesList = () => {
  return (
    <div className={cx("info-services")}>
      <div className={cx("list-info")}>
        {ServicesData.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
