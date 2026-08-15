import { useState } from "react";
import { useArticlesQuery } from "../../../../queries/articleQuery/useArticlesQuery";
import useUpdateStatus from "../../../../mutations/ArticleMutation/useUpdateStatus";
export const useArticlesManager = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("all");
  const limit = 8;

  const { data, isLoading, isFetching } = useArticlesQuery({
    page,
    limit,
    search,
    category,
    status,
  });
  const { updateStatus, isPending } = useUpdateStatus();

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return {
    articles: data?.data,
    pagination: data?.pagination,

    isLoading,
    isFetching,

    page,
    setPage,

    search,
    setSearch: handleSearch,

    category,
    setCategory: handleCategory,

    status,
    setStatus: handleStatus,

    updateStatus,
    isUpdating: isPending,
  };
};
