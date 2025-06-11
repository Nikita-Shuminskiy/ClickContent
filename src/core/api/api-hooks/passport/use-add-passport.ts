import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key";
import { createPassport } from "@/core/api/endpoints/passport-api.ts";

export const useCreatePassport = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.CREATE_PASSPORT],
    mutationFn: createPassport,
    onSuccess: async (data) => {},
  });
};
