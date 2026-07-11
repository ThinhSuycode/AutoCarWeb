import classNames from "classnames/bind";
import styles from "../ArticlesManager.module.scss";
import type { Articles } from "../../../../types/articles";
import { ArticleRow } from "./ArticleRow";
import type { ArticleStatus } from "../../../Staff/ArticleManager/constants/statusMapData";

const cx = classNames.bind(styles);

interface Props {
  articles: Articles[];
  isLoading: boolean;
  isUpdating: boolean;
  onUpdateStatus: (payload: { id: string; status: ArticleStatus }) => void;
}

export const ArticleTable = ({
  articles,
  isLoading,
  isUpdating,
  onUpdateStatus,
}: Props) => (
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
            <td colSpan={7} className={cx("loading-cell")}>
              <i className="fa-solid fa-spinner fa-spin" /> Đang tải...
            </td>
          </tr>
        ) : articles.length === 0 ? (
          <tr>
            <td colSpan={7} className={cx("empty-cell")}>
              <i className="fa-regular fa-folder-open" />
              <p>Không có bài viết nào</p>
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
