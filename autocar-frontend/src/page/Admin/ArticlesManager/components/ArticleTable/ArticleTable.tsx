import classNames from "classnames/bind";
import styles from "./ArticleTable.module.scss";
import { ArticleRow } from "./ArticleRow";
import type { ArticleStatus } from "../../../../Staff/ArticleManager/constants/statusMapData";
import LoadingData from "../../../../../components/LoadingData/LoadingData";
import EmptyState from "../../../../../components/EmtyState/EmptyState";
import type { Article } from "../../../../../types/article/article.type";

const cx = classNames.bind(styles);

interface Props {
  articles: Article[];
  isLoading: boolean;
  isUpdating: boolean;
  onUpdateStatus: (payload: { id: string; status: ArticleStatus }) => void;
}

export const ArticleTable = ({
  articles,
  isLoading,
  isUpdating,
  onUpdateStatus,
}: Props) => {
  return (
    <div className={cx("table-wrapper")}>
      <table className={cx("table")}>
        <thead>
          <tr>
            <th>Bài viết</th>
            <th>Danh mục</th>
            <th>Tác giả</th>
            <th>Lượt xem</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7}>
                <LoadingData message="Đang tải..."></LoadingData>
              </td>
            </tr>
          ) : articles.length === 0 ? (
            <tr>
              <td colSpan={7}>
                {" "}
                <EmptyState type="articles"></EmptyState>
              </td>
            </tr>
          ) : (
            articles.map((article) => (
              <ArticleRow
                key={article._id}
                article={article}
                isUpdating={isUpdating}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
