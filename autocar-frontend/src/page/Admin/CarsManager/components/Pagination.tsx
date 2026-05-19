import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import type { PaginationMeta } from "../../../../types/pagination";

const cx = classNames.bind(styles);

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, totalPages, total, limit } = pagination;
  if (totalPages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className={cx("pagination")}>
      <span className={cx("pagination-info")}>
        Hiển thị {from}–{to} / {total} xe
      </span>
      <div className={cx("pagination-controls")}>
        <button onClick={() => onPageChange(1)} disabled={page === 1}>
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={cx("page-number", {
                active: pageNumber === page,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
