import classNames from "classnames/bind";
import styles from "./ArticleDetails.module.scss";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingData from "../../components/LoadingData/LoadingData";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import ListArticle from "../../components/ListArticle/ListArticle";

import { useArticleDetail } from "../../queries/useArticleDetail";
import { useCurrentUser } from "../../queries/useCurrentUser";
import useArticleSave from "./hooks/useArticleSave";
import { createHandleReadArticle } from "../../hooks/HandleArticles";

import ArticleSections from "./components/ArticleSections";
import ArticleTagsAndSocial from "./components/ArticleTagsAndSocial";
import ArticleRelatedSidebar from "./components/ArticleRelatedSidebar";

import type { UserType } from "../../types/users";
import ArticleDetailBanner from "./components/ArticleDetailBanner";

const cx = classNames.bind(styles);

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userActive, setUserActive] = useState<UserType | null>(null);

  const { data: articleDetail, isLoading } = useArticleDetail(id);
  const login = !!localStorage.getItem("token");
  const { data: userInfo } = useCurrentUser(login);

  useMemo(() => {
    if (userInfo) setUserActive(userInfo);
  }, [userInfo]);

  const handleReadArticle = useMemo(
    () => createHandleReadArticle(navigate),
    [navigate],
  );

  const { onHandleSaveArticle, isSaved } = useArticleSave({
    userActive,
    articleDetail,
    setUserActive,
  });

  if (isLoading) return <LoadingData message="Đang tải dữ liệu" />;

  if (!articleDetail)
    return <LoadingData message="Bài viết này chưa cập nhật" />;

  return (
    <div className={cx("articleDetail-page")}>
      <NavigationPage
        pageActive="Tin tức"
        title={articleDetail.articleId.category || "Chi tiết"}
      />

      {/* BANNER */}
      <ArticleDetailBanner
        articleDetail={articleDetail}
        isSaved={isSaved}
        onSave={onHandleSaveArticle}
      />

      {/* COVER IMAGE */}
      <div className={cx("img-large")}>
        <img
          src={articleDetail.articleId.image}
          alt={articleDetail.articleId.title}
        />
      </div>

      {/* CONTENT + SIDEBAR */}
      <div className={cx("content-wrapper")}>
        <div className={cx("article-body")}>
          <ArticleSections sections={articleDetail.sections} />
          <ArticleTagsAndSocial tags={articleDetail.tags} />
        </div>

        <ArticleRelatedSidebar
          relatedArticles={articleDetail.relatedArticles}
          onReadArticle={handleReadArticle}
        />
      </div>

      {/* OTHER ARTICLES */}
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
