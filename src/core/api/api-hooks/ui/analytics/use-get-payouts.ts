import { useAppQuery } from '@/core/api/api-hooks/use-app-query.ts'
import { QueryKey } from '@/core/api/api-types/query-key.ts'
import { getPayouts } from '@/core/api/endpoints/analytics-api.ts'
import { UseQueryResult } from '@tanstack/react-query'
import { IPayoutsDto } from '@/data-contracts.ts'

export const useGetPayouts = (
    from: string | null,
    to: string | null,
    selected: string
): UseQueryResult<IPayoutsDto[]> =>
    useAppQuery(
        QueryKey.GET_PAYOUTS,
        [from, to],
        () => getPayouts(from, to),
        { gcTime: 0, staleTime: 0, enabled: from !== null && to !== null && selected === 'payouts' }
    )