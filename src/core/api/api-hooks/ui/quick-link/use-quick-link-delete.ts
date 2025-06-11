import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { deleteQuickLink } from "../../../endpoints/quick-link-api.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";

export const useQuickLinkDelete = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.DELETE_QUICK_LINK],
    mutationFn: deleteQuickLink,
    onSuccess: () => {
      client.removeQueries({ queryKey: [MutationKey.DELETE_QUICK_LINK] });
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: [QueryKey.GET_OWNER_QUICK_LINKS],
      });
    },
  });
};
