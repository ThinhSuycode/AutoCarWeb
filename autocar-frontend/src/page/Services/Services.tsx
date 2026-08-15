import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import ServicesBanner from "./components/ServicesBanner";
import ServicesList from "./components/ServicesList";
import ServicesProcess from "./components/ServicesProcess";
import ServicesContact from "./components/ServicesContact";
import useServices from "./hooks/useServices";

const cx = classNames.bind(styles);
const Services = () => {
  const { userInfo } = useServices();
  return (
    <div className={cx("services-page")}>
      <ServicesBanner></ServicesBanner>
      <ServicesList></ServicesList>
      <ServicesProcess></ServicesProcess>
      <ServicesContact userInfo={userInfo}></ServicesContact>
    </div>
  );
};

export default Services;
