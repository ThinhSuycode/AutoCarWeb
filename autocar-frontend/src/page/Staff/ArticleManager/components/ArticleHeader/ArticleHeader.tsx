import classNames from "classnames/bind";
import styles from "./ArticleHeader.module.scss";
import PageHeader from "../../../../../components/PageHeader/PageHeader";

const cx = classNames.bind(styles);
const ArticleHeader = ({
  openCreateModal,
}: {
  openCreateModal: () => void;
}) => {
  return (
    <PageHeader
      title="Quản lý bài viết"
      description="Cập nhật bài viết của hệ thống AutoViet"
    >
      <button className={cx("create-btn")} onClick={openCreateModal}>
        <i className="fa-solid fa-plus" />
        Tạo bài viết
      </button>
    </PageHeader>
  );
};

export default ArticleHeader;
