import { useAppQuery } from "@/core/api/api-hooks/use-app-query";
import { QueryKey } from "@/core/api/api-types/query-key";
import { getIncomingSearchPayments } from "@/core/api/endpoints/analytics-api";
import { UseQueryResult } from "@tanstack/react-query";
import { IIncomingPaymentDto } from "@/data-contracts.ts";

export const useGetIncomingSearchPayments = (
  id: string | null,
): UseQueryResult<IIncomingPaymentDto[]> =>
  useAppQuery(
    QueryKey.GET_INCOMING_SEARCH,
    [id],
    () => getIncomingSearchPayments(id),
    { gcTime: 0, staleTime: 0 },
  );
