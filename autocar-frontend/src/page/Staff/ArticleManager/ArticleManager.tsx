import classNames from "classnames/bind";
import styles from "./ArticleManager.module.scss";

import LoadingData from "../../../components/LoadingData/LoadingData";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

import FormArticle from "./components/FormArticle/FormArticle";
import FormArticleDetail from "./components/FormArticleDetail/FormArticleDetail";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import ArticleStats from "./components/ArticleStats/ArticleStats";

import { toFormInput } from "./utils/toFormInput";
import type { ArticleDetailOutput } from "./components/FormArticleDetail/schema/ArticleDetailSchema";

import useArticleManager from "./hooks/useArticleManager";
import ArticleHeader from "./components/ArticleHeader/ArticleHeader";
import type { Article } from "../../../types/article/article.type";

import type { CreateArticleDto } from "../../../types/article/article.dto";

const cx = classNames.bind(styles);

const ArticleManager = () => {
  const {
    articles,
    articleDetail,

    isLoading,
    detailLoading,

    openCreate,
    openDetail,
    selectedArticle,

    draftMapArticle,
    draftMapArticleDetail,

    confirmProps,

    openCreateModal,
    closeCreateModal,

    openUpdateModal,
    closeUpdateModal,

    openDetailModal,
    closeDetailModal,

    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,

    createDetail,
    updateDetail,
  } = useArticleManager();

  return (
    <div className={cx("articleManager-page")}>
      <ConfirmDialog {...confirmProps} />

      {/* Header */}
      <ArticleHeader openCreateModal={openCreateModal}></ArticleHeader>

      <ArticleStats articles={articles} />

      {isLoading ? (
        <LoadingData message="Đang tải dữ liệu..." />
      ) : (
        <div className={cx("articles-grid")}>
          {articles.map((article: Article) => (
            <ArticleCard
              key={article._id}
              article={article}
              onEdit={openUpdateModal}
              onViewDetail={openDetailModal}
              onDelete={handleDeleteArticle}
            />
          ))}
        </div>
      )}

      {/* CREATE */}
      {openCreate && (
        <div className={cx("modal-overlay")}>
          <FormArticle
            mode="create"
            closeModal={closeCreateModal}
            onSubmit={handleCreateArticle}
          />
        </div>
      )}

      {/* UPDATE */}
      {selectedArticle && (
        <div className={cx("modal-overlay")}>
          <FormArticle
            key={selectedArticle._id}
            mode="update"
            defaultValues={
              draftMapArticle.current[selectedArticle._id] ?? selectedArticle
            }
            onDraftChange={(draft) => {
              draftMapArticle.current[selectedArticle._id] = draft;
            }}
            closeModal={closeUpdateModal}
            onSubmit={(data: CreateArticleDto) => {
              delete draftMapArticle.current[selectedArticle._id];
              handleUpdateArticle(selectedArticle._id, data);
            }}
          />
        </div>
      )}

      {/* DETAIL */}
      {openDetail && (
        <div className={cx("modal-overlay")} onClick={closeDetailModal}>
          {detailLoading ? (
            <LoadingData message="Đang tải nội dung..." color />
          ) : (
            <FormArticleDetail
              key={`${openDetail._id}-${!!articleDetail}`}
              openDetail={openDetail}
              closeModal={closeDetailModal}
              defaultValues={
                draftMapArticleDetail.current[openDetail._id] ??
                toFormInput(articleDetail)
              }
              onDraftChange={(draft) => {
                draftMapArticleDetail.current[openDetail._id] = draft;
              }}
              onSubmit={(data: ArticleDetailOutput) => {
                delete draftMapArticleDetail.current[openDetail._id];

                if (articleDetail) {
                  updateDetail({
                    id: openDetail._id,
                    data,
                  });
                } else {
                  createDetail({
                    articleId: openDetail._id,
                    sections: data.sections,
                    tags: data.tags,
                    relatedArticles: data.relatedArticles,
                  });
                }

                closeDetailModal();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleManager;
