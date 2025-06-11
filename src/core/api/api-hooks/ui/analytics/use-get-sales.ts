import {useAppQuery} from '@/core/api/api-hooks/use-app-query.ts'
import {QueryKey} from '@/core/api/api-types/query-key.ts'
import {getSales} from "@/core/api/endpoints/analytics-api.ts";


export const useGetSales = (payload: { period: string }) =>
    useAppQuery(QueryKey.GET_SALES, [payload.period], () => getSales(payload))
