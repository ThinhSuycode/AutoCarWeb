import classNames from "classnames/bind";
import styles from "../Charts.module.scss";

const cx = classNames.bind(styles);

const UsersTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={cx("tooltip")}>
      <p className={cx("tooltip-label")}>{label}</p>
      <p className={cx("tooltip-value", "blue")}>
        {payload[0]?.value} người dùng mới
      </p>
    </div>
  );
};

export default UsersTooltip;
