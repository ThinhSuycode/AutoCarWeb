import classNames from "classnames/bind";
import styles from "./ContactStatics.module.scss";
import type { StaticsType } from "../../utils/contactStatistics";

const cx = classNames.bind(styles);

interface Props {
  stats: StaticsType;
}

const ContactStatics = ({ stats }: Props) => {
  return (
    <div className={cx("statistics")}>
      {[
        { label: "Tổng", value: stats.total },

        { label: "Mới", value: stats.new },

        { label: "Đã phân công", value: stats.assigned },

        { label: "Đã liên hệ", value: stats.contacted },

        {
          label: "Đã tạo lịch hẹn",
          value: stats.appointment_created,
        },

        {
          label: "Hoàn thành",
          value: stats.completed,
        },

        {
          label: "Đã huỷ",
          value: stats.cancelled,
        },
      ].map(({ label, value }) => (
        <div key={label} className={cx("card")}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
};

export default ContactStatics;
