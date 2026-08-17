import classNames from "classnames/bind";
import styles from "./ServiceList.module.scss";
import ServiceCard from "./ServiceCard/ServicesCard";
import { ServicesData } from "../../constants/servicesData";

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
