import classNames from "classnames/bind";
import styles from "./ArticlesManager.module.scss";
import { useArticlesManager } from "./hooks/useArticlesManager";
import { ArticleFilters } from "./components/ArticleFilters";
import { ArticleTable } from "./components/ArticleTable";
import PageHeader from "../../../components/PageHeader/PageHeader";
import PagePagination from "../../../components/PagePagination/PagePagination";

const cx = classNames.bind(styles);

const ArticlesManager = () => {
  const {
    articles,
    pagination,
    isLoading,
    page,
    setPage,
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    updateStatus,
    isUpdating,
  } = useArticlesManager();

  return (
    <div className={cx("page")}>
      <PageHeader
        title="Quản lý bài viết"
        description="Duyệt và quản lý bài viết từ nhân viên"
      ></PageHeader>

      <ArticleFilters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        status={status}
        onStatus={setStatus}
      />

      <ArticleTable
        articles={articles}
        isLoading={isLoading}
        isUpdating={isUpdating}
        onUpdateStatus={updateStatus}
      />

      <PagePagination
        onPageChange={setPage}
        currentPage={page}
        limit={pagination?.limit ?? 8}
        totalPages={pagination?.totalPages ?? 0}
        total={pagination?.total ?? 0}
      ></PagePagination>
    </div>
  );
};

export default ArticlesManager;
