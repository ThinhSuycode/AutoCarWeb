import classNames from "classnames/bind";
import styles from "../About.module.scss";
import CountUp from "react-countup";
import { statistics } from "../constants/aboutData";

const cx = classNames.bind(styles);

interface Props {
  inView: boolean;
}

const AboutStats = ({ inView }: Props) => {
  return (
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
  );
};

export default AboutStats;
