import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { createQuickLinkValidation } from "../../../endpoints/quick-link-api.ts";

export const useQuickLinkValidation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: [MutationKey.CREATE_QUICK_LINK_VALIDATION],
    mutationFn: createQuickLinkValidation,
    onSuccess: () => {
      //client.removeQueries({queryKey: [MutationKey.DELETE_QUICK_LINK]})
    },
    onSettled: async () => {
      //await client.invalidateQueries({queryKey: [QueryKey.GET_OWNER_QUICK_LINKS]})
    },
  });
};
