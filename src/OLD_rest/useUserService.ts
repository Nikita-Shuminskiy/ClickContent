import { IAimsInfo } from "@/OLD_models/responses/IAimsInfo";
import useSWR from "swr";
import { get } from "./api";

export function useGetAim(id: string) {
  const {
    data: aim,
    error,
    mutate,
    isLoading,
  } = useSWR<IAimsInfo>(id ? `/v2/donates/aim/${id}` : null, get);
  return { aim, error, mutate, isLoading };
}
