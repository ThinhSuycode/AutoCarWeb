import { useState } from "react";
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { useArticlesQuery } from "../../../../../../queries/useArticlesQuery";
import type { Articles } from "../../../../../../types/articles";

interface Props {
  value: Articles[];
  onChange: (articles: Articles[]) => void;
  articlesActive: Articles;
}

const useRelatedArticles = ({ value, onChange, articlesActive }: Props) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading } = useArticlesQuery({
    page: 1,
    limit: 20,
    search: debouncedQuery || undefined,
  });

  // ✅ Lọc bỏ bài đang mở để không hiện trong danh sách
  const articles = (data?.data ?? []).filter(
    (a) => a._id !== articlesActive._id,
  );

  const selectedIds = new Set(value.map((a) => a._id));

  const toggle = (article: Articles) => {
    if (selectedIds.has(article._id)) {
      onChange(value.filter((a) => a._id !== article._id));
    } else {
      onChange([...value, article]);
    }
  };

  const remove = (id: string) => onChange(value.filter((a) => a._id !== id));

  const clearQuery = () => setQuery("");

  return {
    query,
    setQuery,
    clearQuery,
    articles,
    isLoading,
    selectedIds,
    toggle,
    remove,
  };
};

export default useRelatedArticles;
