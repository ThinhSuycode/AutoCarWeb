import classNames from "classnames/bind";
import styles from "./SearchResult.module.scss";
import type { CarType } from "../../../../../../types/car/car.type";
import ResultItem from "./ResultItem/ResultItem";

const cx = classNames.bind(styles);
const SearchResult = ({
  cars,
  isLoading,
}: {
  cars: CarType[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <></>;
  }
  if (!cars) return;
  return (
    <div className={cx("list-result")}>
      {cars.map((car: CarType) => (
        <ResultItem car={car}></ResultItem>
      ))}
    </div>
  );
};

export default SearchResult;
