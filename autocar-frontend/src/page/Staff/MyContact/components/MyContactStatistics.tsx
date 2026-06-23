import classNames from "classnames/bind";
import styles from "../MyContact.module.scss";
import type { StaticsType } from "../utils/myContactStatistics";

const cx = classNames.bind(styles);

interface Props {
  stats: StaticsType;
}

const MyContactStatistics = ({ stats }: Props) => {
  return (
    <div className={cx("statistics")}>
      {[
        { label: "Tổng", value: stats.total },
        { label: "Chờ xử lý", value: stats.pending },
        { label: "Đã liên hệ", value: stats.contacted },
        { label: "Hoàn thành", value: stats.done },
        { label: "Đã huỷ", value: stats.cancelled },
      ].map(({ label, value }) => (
        <div key={label} className={cx("card")}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
};

export default MyContactStatistics;
