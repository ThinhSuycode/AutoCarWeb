import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useArticlesQuery } from "../../../queries/articleQuery/useArticlesQuery";

const useArticles = () => {
  const [page, setPage] = useState(1);

  const [filterValue, setFilterValue] = useState("Tất cả");

  const [searchValue, setSearchValue] = useState("");

  const [bannerState, setBannerState] = useState<
    "visible" | "hiding" | "hidden"
  >("visible");

  const searchDelay = useDebounce(searchValue, 400);

  const { data, isLoading, error } = useArticlesQuery({
    page,
    limit: 6,
    search: searchDelay,
    category: filterValue === "Tất cả" ? undefined : filterValue,
    status: "published",
  });

  useEffect(() => {
    setPage(1);
  }, [searchDelay, filterValue]);

  useEffect(() => {
    if (searchValue.trim()) {
      setBannerState("hiding");

      const timer = setTimeout(() => {
        setBannerState("hidden");
      }, 200);

      return () => clearTimeout(timer);
    }

    setBannerState("visible");
  }, [searchValue]);

  const onHandleAddArticle = () => {
    setPage((prev) => prev + 1);
  };

  const isDebouncing = searchValue.trim() !== "" && searchValue !== searchDelay;

  return {
    loading: isLoading,

    error: error instanceof Error ? error.message : null,

    searchValue,
    setSearchValue,

    filterValue,
    setFilterValue,

    bannerState,

    articles: data?.data ?? [],

    pagination: data?.pagination,

    onHandleAddArticle,

    isDebouncing,
  };
};

export default useArticles;
