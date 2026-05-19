import classNames from "classnames/bind";
import styles from "../UsersManager.module.scss";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

interface KeyProps {
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: KeyProps) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const searchDebounce = useDebounce(inputSearch, 350);
  const refInput = useRef<HTMLInputElement | null>(null);
  const isSearch = inputSearch.trim() !== "" && inputSearch !== searchDebounce;
  const hasValue = inputSearch.trim() !== "";

  const handleClearAll = useCallback(() => {
    setInputSearch("");
    refInput.current?.focus();
  }, []);
  useEffect(() => {
    onSearch(searchDebounce);
  }, [searchDebounce, onSearch]);
  return (
    <div className={cx("form-search")}>
      <span>Tìm người dùng: </span>
      <div className={cx("input-form")}>
        <input
          type="text"
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Tìm người dùng..."
          value={inputSearch}
          ref={refInput}
        />
        {isSearch && (
          <span className={cx("loading")}>
            <i className="fa-solid fa-spinner"></i>
          </span>
        )}
        {!isSearch && hasValue && (
          <span className={cx("deleteAll")} onClick={handleClearAll}>
            <i className="fa-solid fa-x"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default Search;
