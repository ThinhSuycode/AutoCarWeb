import classNames from "classnames/bind";
import styles from "./NewsDetails.module.scss";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api";
import EmptyData from "../../components/EmtyData/EmptyData";
import { onHandleReadArticle } from "../../hooks/HandleArticles";
import type { ArticleDetail, ArticlesItem } from "../../types/articles";
import type { SocialItem } from "../../types/social";
import { socialData } from "../../services/data/social";

const cx = classNames.bind(styles);

const NewsDetails = () => {
  const [articleActive, setArticleActive] = useState<ArticlesItem | null>(null);
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [articlesRelative, setArticlesRelative] = useState<
    ArticlesItem[] | null
  >([]);

  useEffect(() => {
    const local = localStorage.getItem("articleActive");
    if (local) {
      setArticleActive(JSON.parse(local));
    }
  }, []);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      if (!articleActive?.id) return;
      setLoading(true);
      try {
        const data = await callApi.getData("articlesDetail");
        if (data && Array.isArray(data)) {
          const filterData = data.find(
            (detail: ArticleDetail) => detail.id === articleActive.id,
          );
          setArticleDetail(filterData || null);
        }
      } catch (error) {
        console.error("Failed to fetch article details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [articleActive?.id]);
  useEffect(() => {
    const fetchArticleAllData = async () => {
      if (!articleDetail?.relatedArticles) return;
      try {
        const data = await callApi.getData("articles");
        console.log(data);
        if (data && Array.isArray(data)) {
          const getArticlesRelative = data.filter((article: ArticlesItem) => {
            return articleDetail.relatedArticles.find(
              (item: string) => item === article.id,
            );
          });
          setArticlesRelative(getArticlesRelative);
        }
      } catch (error) {
        console.error("Error ", error);
      }
    };
    fetchArticleAllData();
  }, [articleDetail?.relatedArticles]);

  if (loading) return <div>Đang tải...</div>;
  if (!articleDetail) return <EmptyData />;

  return (
    <div className={cx("newsDetail-page")}>
      <NavigationPage
        pageActive="Tin tức"
        title={articleActive?.category || "Chi tiết"}
      />

      <div className={cx("newsDetail-inner")}>
        <div className={cx("news-banner")}>
          <div className={cx("category")}>{articleActive?.category}</div>
          <h2 className={cx("main-title")}>{articleActive?.title}</h2>
          <p className={cx("excerpt")}>{articleActive?.excerpt}</p>

          <div className={cx("info-user")}>
            <div className={cx("left")}>
              <div className={cx("info-item")}>
                <span className={cx("icon")}>
                  <i className="fa-solid fa-user"></i>
                </span>
                <div className={cx("author-info")}>
                  <div className={cx("name")}>Trần Quý Thịnh</div>
                  <div className={cx("role")}>Tác giả</div>
                </div>
              </div>
              <div className={cx("info-item")}>
                <span className={cx("icon")}>
                  <i className="fa-regular fa-calendar"></i>
                </span>
                <span>{articleActive?.date}</span>
              </div>
              <div className={cx("info-item")}>
                <span className={cx("icon")}>
                  <i className="fa-solid fa-clock"></i>
                </span>
                <span>{articleActive?.readTime}</span>
              </div>
            </div>

            <div className={cx("right")}>
              <span className={cx("action-btn")}>
                <i className="fa-regular fa-bookmark"></i>
              </span>
              <span className={cx("action-btn")}>
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
              </span>
            </div>
          </div>
        </div>

        <div className={cx("img-large")}>
          <img src={articleActive?.image} alt={articleActive?.title} />
        </div>

        <div className={cx("content-wrapper")}>
          <div className={cx("article-body")}>
            {articleDetail.sections.map((section, index) => {
              switch (section.type) {
                case "heading":
                  return (
                    <h3 key={index} className={cx("section-heading")}>
                      {section.content}
                    </h3>
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
                      {section.caption && (
                        <figcaption>{section.caption}</figcaption>
                      )}
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
            <div className={cx("tags-container")}>
              <div className={cx("heading-border")}>Từ khoá</div>
              {articleDetail.tags?.map((tag) => (
                <span key={tag} className={cx("tag-item")}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={cx("social-container")}>
              <h3>Chia sẻ bài viết</h3>
              <div className={cx("list-social")}>
                {socialData.map((social: SocialItem) => (
                  <div className={cx("social-item")}>
                    <span>
                      <i className={`fa-brands ${social.icon}`}></i>
                    </span>
                    <span>{social.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className={cx("sidebar-right")}>
            <div className={cx("articles-relative")}>
              <h3 className={cx("heading-border")}>Bài Viết Liên Quan</h3>
              <div className={cx("articles-list")}>
                {articlesRelative?.map((item: ArticlesItem) => (
                  <div
                    className={cx("articles-item")}
                    onClick={() => onHandleReadArticle(item)}
                  >
                    <div className={cx("image-small")}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={cx("info")}>
                      <h4>{item.title}</h4>
                      <div className={cx("time-read")}>
                        <span>
                          <i className="fa-regular fa-calendar"></i>
                        </span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
