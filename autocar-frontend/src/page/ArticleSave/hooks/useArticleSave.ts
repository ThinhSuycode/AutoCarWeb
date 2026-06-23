import { useEffect, useState } from "react";
import type { Articles } from "../../../types/articles";
import type { UserType } from "../../../types/users";
import { callApi } from "../../../services/api";
import { getMeApi } from "../../../services/auth.service";
import type { PaginatedResponse } from "../../../types/pagination";

const useArticleSave = () => {
  const [articleSave, setArticleSave] = useState<Articles[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUser = getMeApi() as Promise<UserType>;
      const fetchArticle = callApi.getData("articles") as Promise<
        PaginatedResponse<Articles>
      >;
      const [res1, res2] = await Promise.all([fetchUser, fetchArticle]);
      console.log(res2.data, res1);
      if (res2.data && Array.isArray(res2.data)) {
        const getData = res2.data.filter((article: Articles) =>
          res1.articleSave?.includes(article._id),
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
  return {
    articleSave,
  };
};

export default useArticleSave;
