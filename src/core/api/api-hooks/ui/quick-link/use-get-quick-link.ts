import { useAppQuery } from '@/core/api/api-hooks/use-app-query.ts'
import { QueryKey } from '@/core/api/api-types/query-key.ts'
import { getQuickLink } from '../../../endpoints/quick-link-api.ts'


// Получение быстрой ссылки
export const useGetQuickLink = ( id?: string, paymentId?: number, isQuickLinkDontPaid?: boolean ) =>
    useAppQuery(QueryKey.GET_QUICK_LINK, [ id, paymentId ], () => getQuickLink(id, paymentId), {
        enabled: !!id || (!!id && isQuickLinkDontPaid),
        gcTime: 0
    })