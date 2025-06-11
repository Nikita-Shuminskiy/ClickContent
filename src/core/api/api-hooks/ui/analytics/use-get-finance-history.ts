import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getOwnerQuickLinks } from "@/core/api/endpoints/quick-link-api.ts";
import { getFinance, getIncome } from "@/core/api/endpoints/analytics-api.ts";

export const useGetFinanceHistory = (payload: { period: string }) =>
  useAppQuery(QueryKey.GET_FINANCE, [payload.period], () =>
    getFinance(payload),
  );
