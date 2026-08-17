import classNames from "classnames/bind";
import styles from "./ArticleSearch.module.scss";

const cx = classNames.bind(styles);

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isDebouncing: boolean;
}

const ArticleSearch = ({
  searchValue,
  setSearchValue,
  isDebouncing,
}: Props) => {
  return (
    <div className={cx("form-search")} data-aos="fade-right">
      <div className={cx("left")}>
        <h3>TIN TỨC & TƯ VẤN</h3>

        <p>
          Cập nhật thông tin thị trường ô tô, kinh nghiệm mua bán và chăm sóc xe
          hữu ích nhất từ chuyên gia AutoViet.
        </p>
      </div>

      <div className={cx("right")}>
        <div className={cx("input-form")}>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />

          {searchValue.trim() && (
            <div className={cx("icon")}>
              {isDebouncing ? (
                <div className={cx("icon-load")}>
                  <i className="fa-solid fa-spinner"></i>
                </div>
              ) : (
                <div
                  className={cx("icon-close")}
                  onClick={() => setSearchValue("")}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleSearch;
