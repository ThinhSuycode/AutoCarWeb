import classNames from "classnames/bind";
import styles from "./Social.module.scss";
import { socialData } from "../../data/social";
import type { SocialItem } from "../../types/social";
const cx = classNames.bind(styles);

const Social = () => {
  return (
    <div className={cx("social-wrapper")}>
      <div className={cx("list-social")}>
        {socialData.map((social: SocialItem, idx: number) => (
          <a href={social.href} key={idx} className={cx(`${social.title}`)}>
            <i className={`fa-brands ${social.icon}`}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Social;
