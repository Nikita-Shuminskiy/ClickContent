import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getOwnerQuickLinks } from "@/core/api/endpoints/quick-link-api.ts";
import { getIncome } from "@/core/api/endpoints/analytics-api.ts";

export const useGetIncome = (payload: { period: string }) =>
  useAppQuery(QueryKey.GET_INCOME, [payload.period], () => getIncome(payload));
