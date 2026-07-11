import classNames from "classnames/bind";
import styles from "./HeaderSearch.module.scss";
import { Button } from "../Button/Button";
import useHeaderSearch from "./hooks/useHeaderSearch";

interface Props {
  title?: string;
  placeholder?: string;
  onChangeSearch: (value: string) => void;
  setOpen: (status: boolean) => void;
}

const cx = classNames.bind(styles);
const HeaderSearch = ({
  title,
  placeholder,
  onChangeSearch,
  setOpen,
}: Props) => {
  const {
    isSearch,
    hasValue,
    handleClearSearch,
    inputSearch,
    setInputSearch,
    refInput,
  } = useHeaderSearch({ onChangeSearch });
  return (
    <div className={cx("form-search")}>
      <span>{title || "Tìm kiếm xe"}: </span>
      <div className={cx("input-form")}>
        <input
          type="text"
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder={`${placeholder || "Nhập tên xe, hãng xe"}...`}
          value={inputSearch}
          ref={refInput}
        />
        {isSearch && (
          <span className={cx("loading")}>
            <i className="fa-solid fa-spinner"></i>
          </span>
        )}
        {!isSearch && hasValue && (
          <span className={cx("deleteAll")} onClick={handleClearSearch}>
            <i className="fa-solid fa-x"></i>
          </span>
        )}
      </div>
      <Button small onClick={() => setOpen(true)}>
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
};

export default HeaderSearch;
