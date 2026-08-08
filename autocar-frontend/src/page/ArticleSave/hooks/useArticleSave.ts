import { useEffect, useState } from "react";
import { getMeApi } from "../../../services/auth.service";
import type { Article } from "../../../types/article/article.type";

const useArticleSave = () => {
  const [articleSave, setArticleSave] = useState<Article[] | null>(null);
  useEffect(() => {
    const getMeData = async () => {
      const res = await getMeApi();
      if (res && res.articleSave) {
        setArticleSave(res.articleSave ?? []);
      }
    };
    getMeData();
  }, []);
  return {
    articleSave,
  };
};

export default useArticleSave;
