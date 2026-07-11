import classNames from "classnames/bind";
import styles from "./CarManagerSearch.module.scss";

const cx = classNames.bind(styles);
interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}
const CarSearch = ({ search, onSearchChange }: Props) => {
  return (
    <div className={cx("search-box")}>
      <i className="fa-solid fa-search"></i>

      <input
        type="text"
        placeholder="Tìm theo tên xe, hãng..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default CarSearch;
