import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <div className={cx("container")}>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default DefaultLayout;
