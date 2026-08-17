import classNames from "classnames/bind";
import styles from "./ArticleFilter.module.scss";
import ListArticle from "../../../../components/ListArticle/ListArticle";
import LoadingData from "../../../../components/LoadingData/LoadingData";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategoryItem,
} from "../../../../constants/articleData";

import type { Article } from "../../../../types/article/article.type";

const cx = classNames.bind(styles);

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Props {
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;

  showArticleData: Article[];

  pagination?: Pagination;
  isLoading: boolean;

  onHandleAddArticle: () => void;
}

const ArticleFilter = ({
  filterValue,
  setFilterValue,
  showArticleData,
  pagination,
  onHandleAddArticle,
  isLoading,
}: Props) => {
  const hasMore = pagination && pagination.page < pagination.totalPages;
  // const hasFilterArticles = useMemo(() => {
  //   return filterValue.trim() !== "Tất cả" && showArticleData.length === 0;
  // }, [filterValue, showArticleData]);

  return (
    <div className={cx("news-filters")}>
      <div className={cx("nav-filters")}>
        <div
          className={cx("item-nav", {
            active: filterValue === "Tất cả",
          })}
          onClick={() => setFilterValue("Tất cả")}
        >
          Tất cả
        </div>
        {ARTICLE_CATEGORIES.map((item: ArticleCategoryItem, index: number) => (
          <div
            key={index}
            className={cx("item-nav", {
              active: filterValue === item.value,
            })}
            onClick={() => setFilterValue(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {isLoading ? (
        <LoadingData message=""></LoadingData>
      ) : (
        <ListArticle
          data={showArticleData}
          emptyDesc={"Chúng tôi sẽ sớm cập nhật tin tức sớm nhất cho bạn !!"}
        />
      )}

      {hasMore ? (
        <div className={cx("add-news")} onClick={onHandleAddArticle}>
          <span>Xem thêm bài viết</span>

          <span>
            <i className="fa-solid fa-chevron-right" />
          </span>
        </div>
      ) : showArticleData.length > 0 ? (
        <div className={cx("empty-add")}>
          Chúng tôi sẽ cập nhật thêm. Cảm ơn đã đọc tin tức ^^
        </div>
      ) : null}
    </div>
  );
};

export default ArticleFilter;
