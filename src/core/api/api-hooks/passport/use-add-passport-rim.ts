import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key";
import { createPassportRim } from "@/core/api/endpoints/passport-api.ts";

export const useCreateRimPassport = () => {
  return useMutation({
    mutationKey: [MutationKey.CREATE_PASSPORT_RIM],
    mutationFn: createPassportRim,
    onSuccess: async (data) => {
      // localStorage.setItem("redirectRimId", data.id);
      localStorage.setItem("currentRedirectUrl", data.url);
      window.location.replace(data.url);
    },
  });
};
