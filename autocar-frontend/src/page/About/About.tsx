import classNames from "classnames/bind";
import styles from "./About.module.scss";
import AboutHistory from "./components/AboutHistory/AboutHistory";
import AboutStats from "./components/AboutStats/AboutStats";
import AboutValues from "./components/AboutValues/AboutValues";
import AboutBanner from "./components/AboutBanner/AboutBanner";

const cx = classNames.bind(styles);

const About = () => {
  return (
    <div className={cx("about-page")}>
      <AboutBanner />

      <AboutHistory />

      <AboutStats />

      <AboutValues />
    </div>
  );
};

export default About;
