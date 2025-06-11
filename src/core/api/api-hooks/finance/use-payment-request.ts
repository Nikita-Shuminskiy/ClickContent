import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";

import { getPaymentRequest } from "../../endpoints/finance-api";
import { useModal } from "@/contexts/ModalProvider/useModal";
import { ModalKey } from "@/core/types/modal-key.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";

// Todo Совершить выплату продавцу (под авторизацией)
export const usePaymentRequest = () => {
  const client = useQueryClient();
  const { openModal } = useModal(ModalKey.WITHDRAW);

  return useMutation({
    mutationKey: [MutationKey.PAYMENT_REQUEST],
    mutationFn: getPaymentRequest,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [QueryKey.GET_USER] });
      client.removeQueries({ queryKey: [MutationKey.PAYMENT_REQUEST] });
      openModal({
        title: "Вывод средств",
        text: "Деньги успешно отправлены",
        onCloseButtonText: "Ок",
        onOkButtonClick: null,
        okButtonText: null,
      });
    },
    onError: (error: any) => {
      const dataRequest = error?.response?.config?.data ?? "";
      const errorText = `Произошла ошибка, попробуйте позже ${
        dataRequest ? `,${dataRequest} технические логи ` : ""
      }`;
      openModal({
        title: "Вывод средств",
        text: error?.response?.data?.error ?? errorText,
        onCloseButtonText: "Ок",
        onOkButtonClick: null,
        okButtonText: null,
      });
    },
  });
};
