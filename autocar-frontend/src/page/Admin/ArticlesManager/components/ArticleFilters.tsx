import classNames from "classnames/bind";
import styles from "../ArticlesManager.module.scss";
import { ARTICLE_CATEGORIES } from "../../../../constants/articleData";
import { STATUS_OPTIONS } from "../constant/articleManagerData";

const cx = classNames.bind(styles);

interface Props {
  search: string;
  category: string;
  status: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
  onStatus: (v: string) => void;
}

export const ArticleFilters = ({
  search,
  category,
  status,
  onSearch,
  onCategory,
  onStatus,
}: Props) => {
  return (
    <div className={cx("filters")}>
      <input
        className={cx("search")}
        type="text"
        placeholder="Tìm theo tiêu đề..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategory(e.target.value)}>
        <option value="">Tất cả</option>
        {ARTICLE_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
};
