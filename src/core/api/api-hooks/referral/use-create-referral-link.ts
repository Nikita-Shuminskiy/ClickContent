import { createReferralLink } from "@/core/api/endpoints/referral.ts";
import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";

export const useCreateReferralLink = () =>
  useAppQuery(QueryKey.CREATE_REFERRAL_LINK, [], createReferralLink);
