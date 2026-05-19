import classNames from "classnames/bind";
import styles from "./ArticleDetails.module.scss";
import NavigationPage from "../../components/NavigationPage/NavigationPage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { callApi, changeApi } from "../../services/api";
import EmptyData from "../../components/EmtyData/EmptyData";
import type {
  ArticleDetail,
  ArticleResponse,
  Articles,
} from "../../types/articles";
import type { SocialItem } from "../../types/social";
import { socialData } from "../../data/social";
import LoadingData from "../../components/LoadingData/LoadingData";
import { getColorCategory } from "../../hooks/getCategoryColor";
import ListArticle from "../../components/ListArticle/ListArticle";
import { createHandleReadArticle } from "../../hooks/HandleArticles";
import toast from "react-hot-toast";
import type { UserType } from "../../types/users";
import { getMeApi } from "../../services/auth.service";

const cx = classNames.bind(styles);

const ArticleDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleReadArticle = useMemo(
    () => createHandleReadArticle(navigate),
    [navigate],
  );
  const articlesCache = useRef<Articles[] | null>(null);

  const [articleActive, setArticleActive] = useState<Articles | null>(null);
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [articlesRelative, setArticlesRelative] = useState<Articles[] | null>(
    [],
  );
  const [userActive, setUserActive] = useState<UserType | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserActive = async () => {
      const userData = await getMeApi();
      setUserActive(userData);
    };
    fetchUserActive();
  }, []);

  useEffect(() => {
    if (userActive && articleActive?.id) {
      setIsSaved(userActive.articleSave?.includes(articleActive.id) ?? false);
    }
  }, [userActive, articleActive?.id]);

  useEffect(() => {
    if (location.state?.article) {
      setArticleActive(location.state.article);
    } else {
      const local = localStorage.getItem("articleActive");
      if (local) setArticleActive(JSON.parse(local));
    }
    setArticleDetail(null);
    setArticlesRelative([]);
  }, [location.pathname, location.state]);

  useEffect(() => {
    if (articleActive) {
      localStorage.setItem("articleActive", JSON.stringify(articleActive));
    }
  }, [articleActive]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchArticleDetail = async () => {
      if (!articleActive?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await callApi.getData("articleDetails");
        if (!controller.signal.aborted && data && Array.isArray(data)) {
          const filterData = data.find(
            (detail: ArticleDetail) => detail.id === articleActive.id,
          );
          setArticleDetail(filterData || null);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch article details:", error);
          setArticleDetail(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchArticleDetail();
    return () => controller.abort();
  }, [articleActive?.id]);
  console.log(userActive);

  useEffect(() => {
    const fetchArticleAllData = async () => {
      if (!articleDetail?.relatedArticles) return;
      try {
        let data: Articles[] = [];
        if (articlesCache.current) {
          data = articlesCache.current;
        } else {
          const res =
            await callApi.getData<ArticleResponse>("articles?all=true");
          data = res.data;
        }
        if (data && Array.isArray(data)) {
          const getArticlesRelative = data.filter((article: Articles) =>
            articleDetail.relatedArticles.find(
              (item: string) => item === article.id,
            ),
          );
          setArticlesRelative(getArticlesRelative);
        }
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    };
    fetchArticleAllData();
  }, [articleDetail?.relatedArticles]);

  const onHandleSaveArticle = useCallback(async () => {
    if (!userActive) {
      toast.error("Vui lòng đăng nhập để lưu bài viết!");
      setTimeout(() => navigate("/dang-nhap"), 1500);
      return;
    }
    if (!articleActive?.id) return;

    // Toggle danh sách lưu (immutable)
    const currentSaved = userActive.articleSave ?? [];
    const isAlreadySaved = currentSaved.includes(articleActive.id);
    const updatedSave = isAlreadySaved
      ? currentSaved.filter((id) => id !== articleActive.id)
      : [...currentSaved, articleActive.id];

    setIsSaved(!isAlreadySaved);
    setUserActive((prev) =>
      prev ? { ...prev, articleSave: updatedSave } : prev,
    );

    try {
      await changeApi.request<UserType>(
        "users",
        "patch",
        { articleSave: updatedSave },
        userActive._id,
      );
      toast.success(
        isAlreadySaved ? "Đã bỏ lưu bài viết!" : "Đã lưu bài viết!",
      );
    } catch (err: any) {
      setIsSaved(isAlreadySaved);
      setUserActive((prev) =>
        prev ? { ...prev, articleSave: currentSaved } : prev,
      );
      const message = err?.response?.data?.message;
      toast.error(message || "Lưu không thành công!");
    }
  }, [articleActive?.id, userActive, navigate]);

  if (loading) return <LoadingData />;
  if (!articleDetail) return <EmptyData />;

  return (
    <div className={cx("articleDetail-page")}>
      <NavigationPage
        pageActive="Tin tức"
        title={articleActive?.category || "Chi tiết"}
      />
      <div className={cx("articleDetail-inner")}>
        <div className={cx("articleDetail-banner")}>
          <div
            className={cx(
              "category",
              getColorCategory(articleActive?.category || ""),
            )}
          >
            {articleActive?.category}
          </div>
          <h2 className={cx("main-title")}>{articleActive?.title}</h2>
          <p className={cx("excerpt")}>{articleActive?.excerpt}</p>
          <div className={cx("meta-info")}>
            <div className={cx("info-user")}>
              <div className={cx("left")}>
                <div className={cx("info-item")}>
                  <span className={cx("icon")}>
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <div className={cx("author-info")}>
                    <div className={cx("name")}>
                      {articleActive?.manager?.managerName ?? "Hoàng Thịnh"}
                    </div>
                    <div className={cx("role")}>Tác giả</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("user")}>
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
              <div className={cx("action-wrapper")}>
                <span
                  className={cx("action-btn", { saved: isSaved })}
                  onClick={onHandleSaveArticle}
                  title={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                >
                  <i
                    className={
                      isSaved
                        ? "fa-solid fa-bookmark"
                        : "fa-regular fa-bookmark"
                    }
                  ></i>
                </span>
                <span className={cx("action-btn")}>
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </span>
              </div>
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
              <div className={cx("tag-list")}>
                {articleDetail.tags?.map((tag) => (
                  <span key={tag} className={cx("tag-item")}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

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
          </div>

          <aside className={cx("sidebar-right")}>
            <div className={cx("articles-relative")}>
              <h3 className={cx("heading-border")}>Bài Viết Liên Quan</h3>
              <div className={cx("articles-list")}>
                {articlesRelative?.map((item: Articles) => (
                  <div
                    className={cx("articles-item")}
                    onClick={() => handleReadArticle(item)}
                    key={item.id}
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

        <div className={cx("orther-article")}>
          <ListArticle data={articlesRelative || []} heading="Bài viết khác" />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
