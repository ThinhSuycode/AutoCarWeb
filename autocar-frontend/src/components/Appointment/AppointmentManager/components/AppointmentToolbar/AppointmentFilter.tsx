import classNames from "classnames/bind";
import styles from "./AppointmentToolbar.module.scss";

const cx = classNames.bind(styles);

interface Props {
  search: string;
  status: string;
  onSearch: (value: string) => void;
  onStatus: (value: string) => void;
}

const AppointmentFilter = ({ search, status, onSearch, onStatus }: Props) => {
  return (
    <div className={cx("filter")}>
      <input
        type="text"
        placeholder="Tìm khách hàng..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="all">Tất cả</option>
        <option value="pending">Chờ xác nhận</option>
        <option value="confirmed">Đã xác nhận</option>
        <option value="completed">Hoàn thành</option>
        <option value="cancelled">Đã hủy</option>
      </select>
    </div>
  );
};

export default AppointmentFilter;
