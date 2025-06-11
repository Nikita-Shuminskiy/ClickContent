import { api } from "@/core/api/api.ts";
import { authInstance } from "@/core/api/config.ts";
import { ApiRequest } from "@/core/api/types.ts";

type CreateReferralLinkRequest = ApiRequest<
  "REFERRAL.CREATE_REFERRAL_LINK",
  any,
  null,
  { url: string }
>;

export const createReferralLink = async () => {
  const response = await api.post<CreateReferralLinkRequest>(authInstance, {
    url: "auth/referral/create",
  });
  return response.data;
};

type GetReferralLinkRequest = ApiRequest<
  "REFERRAL.GET_REFERRAL_LINK",
  any,
  string,
  { id: string }
>;

export const getReferralLink = async (code: string) => {
  const response = await api.get<GetReferralLinkRequest>(authInstance, {
    url: "auth/referral",
    urlParams: { code },
  });
  return response.data;
};
