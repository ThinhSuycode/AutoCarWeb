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
              {section.title ?? section.content}
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
                      <i className="fa-solid fa-check" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          );

        case "image":
          return (
            <figure key={index} className={cx("section-image")}>
              <img
                src={section.imageUrl}
                alt={section.alt ?? section.caption ?? ""}
              />
              {section.caption && <figcaption>{section.caption}</figcaption>}
            </figure>
          );

        case "quote":
          return (
            <blockquote key={index} className={cx("section-quote")}>
              <i className="fa-solid fa-quote-left" />
              <p>{section.content}</p>
              <i className="fa-solid fa-quote-right" />
              {section.caption && <cite>— {section.caption}</cite>}
            </blockquote>
          );

        case "video":
          return (
            <figure key={index} className={cx("section-video")}>
              {section.title && (
                <p className={cx("section-video__title")}>{section.title}</p>
              )}
              <div className={cx("section-video__embed")}>
                <iframe
                  src={section.imageUrl}
                  title={section.title ?? "video"}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {section.caption && <figcaption>{section.caption}</figcaption>}
            </figure>
          );

        case "code":
          return (
            <figure key={index} className={cx("section-code")}>
              {section.title && (
                <div className={cx("section-code__header")}>
                  <i className="fa-solid fa-code" />
                  <span>{section.title}</span>
                </div>
              )}
              <pre className={cx("section-code__block")}>
                <code>{section.content}</code>
              </pre>
            </figure>
          );

        default:
          return null;
      }
    })}
  </>
);

export default ArticleSections;
