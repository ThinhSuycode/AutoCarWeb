import classNames from "classnames/bind";
import styles from "./ArticleDetails.module.scss";
import LoadingData from "../../components/LoadingData/LoadingData";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import ListArticle from "../../components/ListArticle/ListArticle";
import ArticleRelatedSidebar from "./components/ArticleDetailSideBar/ArticleDetailSideBar";
import ArticleDetailBanner from "./components/ArticleDetailBanner/ArticleDetailBanner";
import { getLabelCategory } from "../../hooks/getCategoryColor";
import useArticleDetail from "./hooks/useArticleDetail";
import ArticleDetailMeta from "./components/ArticleDetailMeta/ArticleDetailMeta";
import ArticleDetailSection from "./components/ArticleDetailSection/ArticleDetailSections";

const cx = classNames.bind(styles);

const ArticleDetails = () => {
  const {
    articleDetail,
    isLoading,
    isSaved,
    onHandleSaveArticle,
    handleReadArticle,
  } = useArticleDetail();
  if (isLoading) return <LoadingData message="Đang tải dữ liệu" />;

  if (!articleDetail)
    return <LoadingData message="Bài viết này chưa cập nhật" />;

  return (
    <div className={cx("articleDetail-page")}>
      <NavigationPage
        pageActive="Tin tức"
        title={getLabelCategory(articleDetail.articleId.category)}
      />

      <ArticleDetailBanner
        articleDetail={articleDetail}
        isSaved={isSaved}
        onSave={onHandleSaveArticle}
      />

      <div className={cx("img-large")}>
        <img
          src={articleDetail.articleId.thumbnail}
          alt={articleDetail.articleId.title}
        />
      </div>

      <div className={cx("content-wrapper")}>
        <div className={cx("article-body")}>
          <ArticleDetailSection sections={articleDetail.sections} />
          <ArticleDetailMeta tags={articleDetail.tags} />
        </div>

        <ArticleRelatedSidebar
          relatedArticles={articleDetail.relatedArticles}
          onReadArticle={handleReadArticle}
        />
      </div>

      <div className={cx("orther-article")}>
        <ListArticle
          data={articleDetail.relatedArticles}
          heading="Bài viết khác"
        />
      </div>
    </div>
  );
};

export default ArticleDetails;
