import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import ServicesBanner from "./components/ServiceBanner/ServicesBanner";
import ServicesList from "./components/ServiceList/ServicesList";
import useServices from "./hooks/useServices";
import ServiceProcess from "./components/ServiceProcess/ServiceProcess";
import ServiceContact from "./components/ServiceContact/ServiceContact";

const cx = classNames.bind(styles);
const Services = () => {
  const { userInfo } = useServices();
  return (
    <div className={cx("services-page")}>
      <ServicesBanner></ServicesBanner>
      <ServicesList></ServicesList>
      <ServiceProcess></ServiceProcess>
      <ServiceContact userInfo={userInfo}></ServiceContact>
    </div>
  );
};

export default Services;
