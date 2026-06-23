import classNames from "classnames/bind";
import styles from "../Articles.module.scss";

import ListArticle from "../../../components/ListArticle/ListArticle";
import { filterArticle } from "../../../data/articleData";

import type { Articles, FilterArticleType } from "../../../types/articles";
import LoadingData from "../../../components/LoadingData/LoadingData";

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

  showArticleData: Articles[];

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

  return (
    <div className={cx("news-filters")}>
      <div className={cx("nav-filters")}>
        {filterArticle.map((item: FilterArticleType, index: number) => (
          <div
            key={index}
            className={cx("item-nav", {
              active: filterValue === item.nameVI,
            })}
            onClick={() => setFilterValue(item.nameVI)}
          >
            {item.nameVI}
          </div>
        ))}
      </div>

      {isLoading ? (
        <LoadingData message=""></LoadingData>
      ) : (
        <ListArticle
          data={showArticleData}
          emptyDesc="Không tìm thấy bài viết phù hợp!!"
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
