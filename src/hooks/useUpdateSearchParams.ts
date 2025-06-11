import { useSearchParams } from "react-router-dom";

type UseUpdateSearchParamsReturn = {
  updateParams: (params: Record<string, string>) => void;
  clearParams: (params: string[]) => void;
  params?: URLSearchParams;
};

type UseUpdateSearchParams = () => UseUpdateSearchParamsReturn;

export const useUpdateSearchParams: UseUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (params: Record<string, string>) => {
    setSearchParams({ ...Object.fromEntries(searchParams), ...params });
  };

  const clearParams = (params: string[]) => {
    for (const key of params) {
      setSearchParams((params) => {
        params.delete(key);
        return params;
      });
    }
  };

  return {
    updateParams,
    clearParams,
    params: searchParams,
  };
};
