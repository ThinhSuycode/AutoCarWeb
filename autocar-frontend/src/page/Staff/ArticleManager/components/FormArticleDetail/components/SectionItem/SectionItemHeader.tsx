// SectionItemHeader.tsx — chỉ chứa badge + move/delete buttons
import classNames from "classnames/bind";
import styles from "../../FormArticleDetail.module.scss";
import {
  getSectionIcon,
  getSectionLabel,
  getSectionBadge,
} from "../../constants/sectionTypes";

const cx = classNames.bind(styles);

interface Props {
  index: number;
  total: number;
  currentType: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export const SectionItemHeader = ({
  index,
  total,
  currentType,
  onMoveUp,
  onMoveDown,
  onRemove,
}: Props) => (
  <div className={cx("section-item-header")}>
    <span className={cx("section-index")}>#{index + 1}</span>

    <span className={cx("section-type-badge", getSectionBadge(currentType))}>
      <i className={`fa-solid ${getSectionIcon(currentType)}`} />
      {getSectionLabel(currentType)}
    </span>

    <div className={cx("section-item-actions")}>
      {index > 0 && (
        <button
          type="button"
          className={cx("move-btn")}
          onClick={onMoveUp}
          title="Di chuyển lên"
        >
          <i className="fa-solid fa-chevron-up" />
        </button>
      )}
      {index < total - 1 && (
        <button
          type="button"
          className={cx("move-btn")}
          onClick={onMoveDown}
          title="Di chuyển xuống"
        >
          <i className="fa-solid fa-chevron-down" />
        </button>
      )}
      <button type="button" className={cx("remove-section")} onClick={onRemove}>
        <i className="fa-solid fa-trash" />
      </button>
    </div>
  </div>
);
