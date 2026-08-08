import { useMemo, useState } from "react";
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { useArticlesQuery } from "../../../../../../queries/useArticlesQuery";
import type { Article } from "../../../../../../types/article/article.type";

interface Props {
  value: string[];
  onChange: (articles: string[]) => void;
  articlesActive: Article;
}

const useRelatedArticles = ({ value, onChange, articlesActive }: Props) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading } = useArticlesQuery({
    page: 1,
    limit: 20,
    search: debouncedQuery || undefined,
  });

  const articles = useMemo(
    () => (data?.data ?? []).filter((a) => a._id !== articlesActive._id),
    [data?.data, articlesActive._id],
  );

  const selectedIds = useMemo(() => new Set(value), [value]);

  const selectedArticles = useMemo(
    () => articles.filter((article) => selectedIds.has(article._id)),
    [articles, selectedIds],
  );

  const toggle = (article: Article) => {
    if (selectedIds.has(article._id)) {
      onChange(value.filter((id) => id !== article._id));
    } else {
      onChange([...value, article._id]);
    }
  };

  const remove = (id: string) => {
    onChange(value.filter((item) => item !== id));
  };

  return {
    query,
    setQuery,
    clearQuery: () => setQuery(""),
    articles,
    selectedArticles,
    selectedIds,
    isLoading,
    toggle,
    remove,
  };
};

export default useRelatedArticles;
