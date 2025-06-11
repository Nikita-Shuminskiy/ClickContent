import { UseQueryResult } from "@tanstack/react-query";
import { ILimitsByCardsDto } from "@/data-contracts";
import { useAppQuery } from "@/core/api/api-hooks/use-app-query";
import { QueryKey } from "@/core/api/api-types/query-key";

import { getLimitsByCards } from "../../endpoints/finance-api";


export const useGetLimitsByCards = (): UseQueryResult<ILimitsByCardsDto> =>
    useAppQuery(QueryKey.GET_LIMITS_BY_CARDS, [], getLimitsByCards)