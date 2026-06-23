import classNames from "classnames/bind";
import styles from "../ContactHistory.module.scss";
import type { ContactPagination } from "../../../types/contact";

const cx = classNames.bind(styles);

interface Props {
  pagination?: ContactPagination;
  page: number;
  onPageChange: (p: number) => void;
}

const ContactHistoryPagination = ({
  pagination,
  page,
  onPageChange,
}: Props) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className={cx("pagination")}>
      <button
        className={cx("page-btn")}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
        (p) => (
          <button
            key={p}
            className={cx("page-btn", { active: p === page })}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        className={cx("page-btn")}
        disabled={page >= pagination.totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      <span className={cx("page-info")}>{pagination.total} yêu cầu</span>
    </div>
  );
};

export default ContactHistoryPagination;
