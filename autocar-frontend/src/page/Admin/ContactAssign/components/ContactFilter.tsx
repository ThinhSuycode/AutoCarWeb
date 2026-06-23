import classNames from "classnames/bind";
import styles from "../ContactAssign.module.scss";

const cx = classNames.bind(styles);

interface Props {
  search: string;
  status: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ContactFilter = ({
  search,
  status,
  setSearch,
  setStatus,
  setPage,
}: Props) => {
  return (
    <div className={cx("filters")}>
      <input
        type="text"
        placeholder="Tìm theo tên hoặc số điện thoại..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="pending">Chờ xử lý</option>
        <option value="contacted">Đã liên hệ</option>
        <option value="done">Hoàn thành</option>
        <option value="cancelled">Đã huỷ</option>
      </select>
    </div>
  );
};

export default ContactFilter;
