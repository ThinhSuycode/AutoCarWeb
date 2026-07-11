import classNames from "classnames/bind";
import styles from "./PagePagination.module.scss";

const cx = classNames.bind(styles);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const PagePagination = ({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;
  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  return (
    <div className={cx("pagination")}>
      <span className={cx("pagination-info")}>
        Hiển thị {from}–{to} / {total} người dùng
      </span>
      <div className={cx("pagination-controls")}>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={cx("page-number", {
                active: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PagePagination;
