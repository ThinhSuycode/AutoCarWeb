import classNames from "classnames/bind";
import styles from "../ContactAssign.module.scss";
import { CONTACT_STATUS_OPTIONS } from "../constants/contactManagerData";

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

        {CONTACT_STATUS_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContactFilter;
