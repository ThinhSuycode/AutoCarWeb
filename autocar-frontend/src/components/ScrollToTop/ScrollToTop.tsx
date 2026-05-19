import classNames from "classnames/bind";
import styles from "./ScrollToTop.module.scss";
import { useCallback } from "react";

const cx = classNames.bind(styles);
const ScrollToTop = ({ showScroll }: { showScroll: boolean }) => {
  const onHandleScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  if (!showScroll) return;
  return (
    <div
      className={cx("scrollToTop-wrapper", { show: showScroll })}
      onClick={onHandleScroll}
    >
      <i className="fa-solid fa-angles-up"></i>
    </div>
  );
};

export default ScrollToTop;
