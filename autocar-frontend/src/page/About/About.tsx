import classNames from "classnames/bind";
import styles from "./About.module.scss";
import { useInView } from "react-intersection-observer";

import AboutBanner from "./components/AboutBanner";
import AboutHistory from "./components/AboutHistory";
import AboutStats from "./components/AboutStats";
import AboutValues from "./components/AboutValues";

const cx = classNames.bind(styles);

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className={cx("about-page")}>
      <AboutBanner />

      <AboutHistory />

      <div className={cx("info-statistical")} ref={ref}>
        <AboutStats inView={inView} />
      </div>

      <AboutValues />
    </div>
  );
};

export default About;
