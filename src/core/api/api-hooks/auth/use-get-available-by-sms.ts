import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getAvailableBySms } from "@/core/api/endpoints/auth-api.ts";

export const useGetAvailableBySms = () => {
  return useAppQuery(
    QueryKey.GET_AVAILABLE_BY_SMS,
    [],
    () => getAvailableBySms(),
    {},
  );
};
