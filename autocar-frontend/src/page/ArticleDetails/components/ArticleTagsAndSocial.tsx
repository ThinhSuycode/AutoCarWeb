import classNames from "classnames/bind";
import styles from "../ArticleDetails.module.scss";
import type { SocialItem } from "../../../types/social";
import { socialData } from "../../../data/social";

const cx = classNames.bind(styles);

interface Props {
  tags?: string[];
}

const ArticleTagsAndSocial = ({ tags }: Props) => (
  <>
    {/* TAGS */}
    <div className={cx("tags-container")}>
      <div className={cx("heading-border")}>Từ khoá</div>
      <div className={cx("tag-list")}>
        {tags?.map((tag) => (
          <span key={tag} className={cx("tag-item")}>
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* SOCIAL */}
    <div className={cx("social-container")}>
      <h3>Chia sẻ bài viết</h3>
      <div className={cx("list-social")}>
        {socialData.map((social: SocialItem, idx: number) => (
          <div className={cx("social-item")} key={idx}>
            <span>
              <i className={`fa-brands ${social.icon}`}></i>
            </span>
            <span>{social.title}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default ArticleTagsAndSocial;
