import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getPassport } from "@/core/api/endpoints/passport-api.ts";

export const useGetPassport = () => {
  return useAppQuery(QueryKey.GET_PASSPORT, [], getPassport);
};
