import classNames from "classnames/bind";
import styles from "./Articles.module.scss";
import ArticleSearch from "./components/ArticleSearch/ArticleSearch";
import ArticleBanner from "./components/ArticleBanner/ArticleBanner";
import ArticleFilter from "./components/ArticleFilter/ArtilceFilter";
import ArticleRegister from "./components/ArticleRegister/ArticleRegister";

import useArticles from "./hooks/useArticles";

const cx = classNames.bind(styles);

const Article = () => {
  const {
    loading,
    error,

    searchValue,
    setSearchValue,

    isDebouncing,

    bannerState,

    filterValue,
    setFilterValue,

    articles,
    pagination,

    onHandleAddArticle,
  } = useArticles();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cx("article-page")}>
      <ArticleSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isDebouncing={isDebouncing}
      />

      <div className={cx("main")}>
        <ArticleBanner bannerState={bannerState} />

        <ArticleFilter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          showArticleData={articles}
          isLoading={loading}
          pagination={pagination}
          onHandleAddArticle={onHandleAddArticle}
        />

        <ArticleRegister />
      </div>
    </div>
  );
};

export default Article;
