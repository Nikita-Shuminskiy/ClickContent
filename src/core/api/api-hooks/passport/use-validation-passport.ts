import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key";
import { validationPassport } from "@/core/api/endpoints/passport-api.ts";
import { getUser } from "@/core/api/endpoints/user-api.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";

export const useValidationPassport = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.VALIDATION_PASSPORT],
    mutationFn: validationPassport,
    onSuccess: async (data) => {
      const user = await getUser();
      client.setQueriesData(
        { queryKey: [QueryKey.GET_USER, []] },
        (oldData) => ({
          ...user,
        }),
      );
    },
  });
};
