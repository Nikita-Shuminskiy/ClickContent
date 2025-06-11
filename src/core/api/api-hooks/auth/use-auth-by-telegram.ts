import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { authByTelegram } from "@/core/api/endpoints/auth-api.ts";

export const useAuthByTelegram = () =>
  useMutation({
    mutationKey: [MutationKey.AUTH_BY_TELEGRAM],
    mutationFn: authByTelegram,
  });
