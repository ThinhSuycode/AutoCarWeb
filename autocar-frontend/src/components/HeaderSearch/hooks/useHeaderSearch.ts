import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

interface Props {
  onChangeSearch: (value: string) => void;
}

const useHeaderSearch = ({ onChangeSearch }: Props) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const searchDebounce = useDebounce(inputSearch, 350);
  const refInput = useRef<HTMLInputElement | null>(null);
  const isSearch = inputSearch.trim() !== "" && inputSearch !== searchDebounce;
  const hasValue = inputSearch.trim() !== "";

  const handleClearSearch = useCallback(() => {
    setInputSearch("");
    refInput.current?.focus();
  }, []);

  useEffect(() => {
    onChangeSearch(searchDebounce);
  }, [searchDebounce, onChangeSearch]);

  return {
    isSearch,
    hasValue,
    handleClearSearch,
    inputSearch,
    setInputSearch,
    refInput

  };
};

export default useHeaderSearch;
