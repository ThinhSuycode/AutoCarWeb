import classNames from "classnames/bind";
import styles from "./ArticleSave.module.scss";
import { useEffect, useState } from "react";
import { getMeApi } from "../../services/auth.service";
import type { Articles } from "../../types/articles";
import { callApi } from "../../services/api";
import type { UserType } from "../../types/users";
import ListArticle from "../../components/ListArticle/ListArticle";

const cx = classNames.bind(styles);
const ArticleSave = () => {
  const [articleSave, setArticleSave] = useState<Articles[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUser = getMeApi() as Promise<UserType>;
      const fetchArticle = callApi.getData("articles") as Promise<Articles[]>;
      const [res1, res2] = await Promise.all([fetchUser, fetchArticle]);
      if (res2 && Array.isArray(res2)) {
        const getData = res2.filter((article: Articles) =>
          res1.articleSave?.includes(article.id),
        );
        if (getData && getData.length > 0) {
          setArticleSave(getData);
        } else {
          setArticleSave([]);
        }
      }
    };
    fetchData();
  }, []);
  console.log(articleSave);
  return (
    <div className={cx("articleSave-page")}>
      <ListArticle
        heading={`Bài viết đã lưu (${articleSave?.length})`}
        data={articleSave}
        hiddenBtn
      ></ListArticle>
    </div>
  );
};

export default ArticleSave;
