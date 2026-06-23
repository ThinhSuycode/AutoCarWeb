import classNames from "classnames/bind";
import styles from "../ArticleDetails.module.scss";
import type { ArticleSection } from "../../../types/articles";

const cx = classNames.bind(styles);

interface Props {
  sections: ArticleSection[];
}

const ArticleSections = ({ sections }: Props) => (
  <>
    {sections.map((section, index) => {
      switch (section.sectionType) {
        case "heading":
          return (
            <h4 key={index} className={cx("section-heading")}>
              {section.content}
            </h4>
          );

        case "paragraph":
          return (
            <p key={index} className={cx("section-paragraph")}>
              {section.content}
            </p>
          );

        case "list":
          return (
            <ul key={index} className={cx("section-list")}>
              {Array.isArray(section.content) &&
                section.content.map((item, idx) => (
                  <li key={idx}>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          );

        case "image":
          return (
            <figure key={index} className={cx("section-image")}>
              <img src={section.imageUrl} alt={section.caption} />
              {section.caption && <figcaption>{section.caption}</figcaption>}
            </figure>
          );

        case "quote":
          return (
            <blockquote key={index} className={cx("section-quote")}>
              <i className="fa-solid fa-quote-left"></i>
              <p>{section.content}</p>
              <i className="fa-solid fa-quote-right"></i>
            </blockquote>
          );

        default:
          return null;
      }
    })}
  </>
);

export default ArticleSections;
