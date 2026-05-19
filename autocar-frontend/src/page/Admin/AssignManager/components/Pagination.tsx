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

  if (totalPages <= 0) return null;

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
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | "...")[]>((acc, p, i, arr) => {
            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`}>...</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                disabled={p === page}
                className={cx({ active: p === page })}
              >
                {p}
              </button>
            ),
          )}

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
