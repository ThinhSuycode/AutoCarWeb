import classNames from "classnames/bind";
import styles from "./ContactHistory.module.scss";
import LoadingData from "../../components/LoadingData/LoadingData";
import useContactHistory from "./hooks/useContactHistory";
import ContactHistoryFilter from "./components/ContactHistoryFilter";
import ContactHistoryCard from "./components/ContactHistoryCard";
import ContactHistoryPagination from "./components/ContactHistoryPagination";

const cx = classNames.bind(styles);

const ContactHistory = () => {
  const { contacts, pagination, isLoading, status, setStatus, page, setPage } =
    useContactHistory();

  return (
    <div className={cx("wrapper")}>
      {/* Header */}
      <div className={cx("header")}>
        <div className={cx("header-left")}>
          <h2>Lịch sử liên hệ</h2>
          <p>Theo dõi các yêu cầu bạn đã gửi</p>
        </div>

        {pagination && (
          <span className={cx("total-badge")}>{pagination.total} yêu cầu</span>
        )}
      </div>

      {/* Filter tabs */}
      <ContactHistoryFilter active={status} onChange={setStatus} />

      {/* Content */}
      {isLoading ? (
        <LoadingData message="Đang tải lịch sử..." />
      ) : contacts.length === 0 ? (
        <div className={cx("empty")}>
          <i className="fa-regular fa-folder-open"></i>
          <p>Chưa có yêu cầu liên hệ nào</p>
          <span>Gửi yêu cầu khi xem xe để bắt đầu</span>
        </div>
      ) : (
        <div className={cx("grid")}>
          {contacts.map((contact) => (
            <ContactHistoryCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <ContactHistoryPagination
        pagination={pagination}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ContactHistory;
