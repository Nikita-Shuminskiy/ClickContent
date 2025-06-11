import { useAppQuery } from "@/core/api/api-hooks/use-app-query";
import { QueryKey } from "@/core/api/api-types/query-key";
import { getIncomingPayments } from "@/core/api/endpoints/analytics-api";
import { UseQueryResult } from "@tanstack/react-query";
import { IIncomingPaymentDto } from "@/data-contracts.ts";

export const useGetIncomingPayments = (
  from: string | null,
  to: string | null,
  selected: string,
): UseQueryResult<IIncomingPaymentDto[]> =>
  useAppQuery(QueryKey.GET_INCOMING, [], () => getIncomingPayments(from, to), {
    gcTime: 0,
    staleTime: 0,
    enabled: from !== null && to !== null && selected === "incoming",
  });
