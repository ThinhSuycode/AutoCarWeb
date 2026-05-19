import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import { useLocation } from "react-router-dom";
import { getBaseRoute } from "../../hooks/useBaseRoute";
import { hiddenFooterRoutes } from "../../config/route";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const getUrl = useLocation();
  const urlCurrent = getBaseRoute(getUrl.pathname);
  const check = !!hiddenFooterRoutes.includes(urlCurrent);

  return (
    <>
      <Header></Header>
      <div className={cx("container")}>{children}</div>
      <Footer hidden={check}></Footer>
    </>
  );
};

export default DefaultLayout;
