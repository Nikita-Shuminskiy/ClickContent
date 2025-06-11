import {useAppQuery} from "@/core/api/api-hooks/use-app-query.ts";
import {QueryKey} from "@/core/api/api-types/query-key.ts";
import {getReferralLink} from "@/core/api/endpoints/referral.ts";


export const useGetReferralLink = (code: string) => {
    return useAppQuery(QueryKey.GET_REFERRAL_LINK_BY_CODE,
        [code],
        () => getReferralLink(code), {enabled: !!code}
    )
}
