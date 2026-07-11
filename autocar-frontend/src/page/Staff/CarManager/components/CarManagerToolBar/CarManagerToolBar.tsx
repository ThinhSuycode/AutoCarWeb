import classNames from "classnames/bind";
import styles from "./CarManagerToolBar.module.scss";
import CarFilter from "./CarManagerFilter/CarFilter";
import CarSearch from "./CarManagerSearch/CarManagerSearch";

const cx = classNames.bind(styles);

interface CarManagerToolBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

const CarManagerToolBar = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: CarManagerToolBarProps) => {
  return (
    <div className={cx("toolbar")}>
      <CarSearch search={search} onSearchChange={onSearchChange}></CarSearch>

      <CarFilter value={statusFilter} onChange={onStatusFilterChange} />
    </div>
  );
};

export default CarManagerToolBar;
