import classNames from "classnames/bind";
import styles from "./ArticleManager.module.scss";

import { useCallback, useRef, useState } from "react";

import { useArticles } from "./hooks/useArticles";
import { useArticleDetail } from "./hooks/useArticleDetail";

import type { Articles, FormArticleType } from "../../../types/articles";

import FormArticleDetail from "./components/FormArticleDetail/FormArticleDetail";
import FormArticle from "./components/FormArticle";

import LoadingData from "../../../components/LoadingData/LoadingData";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import { useConfirm } from "../../../hooks/useConfirm";
import toast from "react-hot-toast";

import { toFormInput } from "./utils/toFormInput";
import type {
  ArticleDetailFormInput,
  ArticleDetailFormOutput,
} from "./components/FormArticleDetail/schema/ArticleDetailSchema";
import ArticleStats from "./components/ArticleStats";
import ArticleCard from "./components/ArticleCard";

const cx = classNames.bind(styles);

const ArticleManager = () => {
  const { articles, isLoading, createArticle, updateArticle, deleteArticle } =
    useArticles();

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);
  const [openDetail, setOpenDetail] = useState<Articles | null>(null);
  const { articleDetail, detailLoading, createDetail, updateDetail } =
    useArticleDetail(openDetail?._id);
  const { confirm, confirmProps } = useConfirm();

  // draftMap lưu giá trị "input" của form (tags: string, content: string)
  const draftMap = useRef<Record<string, ArticleDetailFormInput>>({});

  const onHandleDeleteArticle = useCallback(async (article: Articles) => {
    if (!article._id) return;
    try {
      const ok = await confirm({
        title: `Bạn có muốn xoá bài viết ${article.title} này không ?? `,
        message: "Thực hiện thao tác một lần!",
        confirmText: "Xác nhận",
        cancelText: "Huỷ",
      });
      if (!ok) return;
      deleteArticle(article._id);
    } catch {
      toast.error("Lỗi khi xoá dữ liệu!!");
    }
  }, []);

  if (isLoading) {
    return <LoadingData message="Đang tải dữ liệu"></LoadingData>;
  }

  return (
    <div className={cx("articleManager-page")}>
      <ConfirmDialog {...confirmProps}></ConfirmDialog>

      <div className={cx("header")}>
        <div className={cx("left")}>
          <h2>Quản lý bài viết</h2>
          <p>Quản lý toàn bộ bài viết AutoViet</p>
        </div>

        <button
          className={cx("create-btn")}
          onClick={() => setOpenCreate(true)}
        >
          <i className="fa-solid fa-plus"></i>
          Tạo bài viết
        </button>
      </div>

      <ArticleStats articles={articles} />

      <div className={cx("articles-grid")}>
        {articles.map((article: Articles) => (
          <ArticleCard
            key={article._id}
            article={article}
            onEdit={setSelectedArticle}
            onViewDetail={setOpenDetail}
            onDelete={onHandleDeleteArticle}
          />
        ))}
      </div>

      {openCreate && (
        <div
          className={cx("modal-overlay")}
          onClick={() => setOpenCreate(false)}
        >
          <FormArticle
            mode="create"
            closeModal={() => setOpenCreate(false)}
            onSubmit={(data) => {
              createArticle(data);
              setOpenCreate(false);
            }}
          />
        </div>
      )}

      {openDetail && (
        <div
          className={cx("modal-overlay")}
          onClick={() => setOpenDetail(null)}
        >
          {detailLoading ? (
            <LoadingData message="Đang tải nội dung..." color />
          ) : (
            <FormArticleDetail
              key={`${openDetail._id}-${articleDetail ? "loaded" : "empty"}`}
              openDetail={openDetail}
              closeModal={() => setOpenDetail(null)}
              defaultValues={
                draftMap.current[openDetail._id] ?? toFormInput(articleDetail)
              }
              onDraftChange={(draft) => {
                draftMap.current[openDetail._id] = draft;
              }}
              onSubmit={(data: ArticleDetailFormOutput) => {
                delete draftMap.current[openDetail._id];

                if (articleDetail) {
                  updateDetail({ id: openDetail._id, data });
                } else {
                  createDetail({
                    articleId: openDetail,
                    sections: data.sections,
                    tags: data.tags,
                    relatedArticles: data.relatedArticles,
                  });
                }

                setOpenDetail(null);
              }}
            />
          )}
        </div>
      )}

      {selectedArticle && (
        <div
          className={cx("modal-overlay")}
          onClick={() => setSelectedArticle(null)}
        >
          <FormArticle
            mode="update"
            defaultValues={{
              title: selectedArticle.title,
              excerpt: selectedArticle.excerpt,
              image: selectedArticle.image,
              category: selectedArticle.category,
              readTime: selectedArticle.readTime,
              status: selectedArticle.status,
            }}
            closeModal={() => setSelectedArticle(null)}
            onSubmit={(data: FormArticleType) => {
              updateArticle({ id: selectedArticle._id, data });
              setSelectedArticle(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleManager;
