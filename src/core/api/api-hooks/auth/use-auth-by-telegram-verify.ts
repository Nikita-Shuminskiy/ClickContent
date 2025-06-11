import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { authByTelegramVerify } from "@/core/api/endpoints/auth-api.ts";
import { getUser } from "@/core/api/endpoints/user-api.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { setIsAuthCookie, setUserCookie } from "@/helpers/NavigateToMarket.ts";
import StorageService from "@/core/service/storage-service.ts";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";

export const useAuthByTelegramVerify = () => {
  const { showAlert } = useAlert();
  let url = StorageService.getLocation() ?? "/dashboard";
  const nav = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.AUTH_BY_TELEGRAM_VERIFY],
    mutationFn: authByTelegramVerify,

    onSuccess: async () => {
      showAlert("Успех", "success");
      const user = await getUser();
      client.setQueriesData(
        { queryKey: [QueryKey.GET_USER, []] },
        (oldData) => ({
          ...user,
        }),
      );
      localStorage.setItem("userLoggedIn", "logIn"); // todo для логина во всех вкладках
      setUserCookie({ user });
      setIsAuthCookie("auth");
      StorageService.clearRedirectUrl();
      nav(url); // todo (после авторизации редирект обратно)
    },
  });
};
