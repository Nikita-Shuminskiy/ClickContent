import {UseQueryResult} from "@tanstack/react-query";
import {ICanWithdrawDto} from "@/data-contracts";
import {useAppQuery} from "@/core/api/api-hooks/use-app-query";
import {QueryKey} from "@/core/api/api-types/query-key";

import {getCanWithdraw} from "../../endpoints/finance-api";


export const useGetCanWithdraw = (): UseQueryResult<ICanWithdrawDto> =>
    useAppQuery(QueryKey.GET_CAN_WITHDRAW, [], getCanWithdraw)
