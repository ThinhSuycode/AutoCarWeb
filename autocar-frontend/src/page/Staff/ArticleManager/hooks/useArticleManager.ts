import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useArticleDetailMutations } from "../components/FormArticleDetail/mutations/useArticleDetailMutations";
import { useConfirm } from "../../../../hooks/useConfirm";
import type { ArticleDetailInput } from "../components/FormArticleDetail/schema/ArticleDetailSchema";
import useArticleMutations from "../components/FormArticle/mutations/useArticleMutations";
import type { ArticleFormInput } from "../components/FormArticle/schema/article.schema";
import type { Article } from "../../../../types/article/article.type";
import type {
  CreateArticleDto,
  UpdateArticleDto,
} from "../../../../types/article/article.dto";

const useArticleManager = () => {
  const { articles, isLoading, createArticle, updateArticle, deleteArticle } =
    useArticleMutations();

  const [openDetail, setOpenDetail] = useState<Article | null>(null);

  const { articleDetail, detailLoading, createDetail, updateDetail } =
    useArticleDetailMutations(openDetail?._id);

  const [openCreate, setOpenCreate] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { confirm, confirmProps } = useConfirm();
  const draftMapArticleDetail = useRef<Record<string, ArticleDetailInput>>({});
  const draftMapArticle = useRef<Record<string, Partial<ArticleFormInput>>>({});

  const handleCreateArticle = useCallback(
    (data: CreateArticleDto) => {
      createArticle(data);
      setOpenCreate(false);
    },
    [createArticle],
  );
  const handleUpdateArticle = useCallback(
    (id: string, data: UpdateArticleDto) => {
      updateArticle({ id, data });
      setSelectedArticle(null);
    },
    [updateArticle],
  );
  const handleDeleteArticle = useCallback(
    async (article: Article) => {
      try {
        const ok = await confirm({
          title: `Bạn có muốn xoá "${article.title}"?`,
          message: "Thao tác này không thể hoàn tác.",
          confirmText: "Xoá",
          cancelText: "Huỷ",
        });

        if (!ok) return;

        deleteArticle(article._id);
      } catch {
        toast.error("Không thể xoá bài viết.");
      }
    },
    [confirm, deleteArticle],
  );
  const openCreateModal = () => setOpenCreate(true);

  const closeCreateModal = () => {
    setOpenCreate(false);
    setSelectedArticle(null);
  };

  const openUpdateModal = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeUpdateModal = () => {
    setSelectedArticle(null);
  };

  const openDetailModal = (article: Article) => {
    setOpenDetail(article);
  };

  const closeDetailModal = () => {
    setOpenDetail(null);
  };

  return {
    articles,
    articleDetail,

    isLoading,
    detailLoading,

    openCreate,
    openDetail,
    selectedArticle,

    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    openDetailModal,
    closeDetailModal,
    closeUpdateModal,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,

    createDetail,
    updateDetail,

    draftMapArticleDetail,
    draftMapArticle,

    confirmProps,
  };
};

export default useArticleManager;
