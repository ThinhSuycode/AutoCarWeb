import classNames from "classnames/bind";
import styles from "./AboutStats.module.scss";
import CountUp from "react-countup";
import { statistics } from "../../constants/aboutData";
import { useInView } from "react-intersection-observer";

const cx = classNames.bind(styles);

const AboutStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div className={cx("info-statistical")} ref={ref}>
      <div className={cx("list-info")}>
        {statistics.map((item) => (
          <div key={item.label} className={cx("info-item")}>
            <div className={cx("heading")}>
              <span>{inView && <CountUp end={item.value} duration={2} />}</span>

              {item.plus && (
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
              )}
            </div>

            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutStats;
