import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key";

import { paymentStatusCheck } from "../../endpoints/finance-api";

// Todo Проверка статуса оплаты (под авторизацией)
//  url  https://secure.clickcontent.eu/
export const usePaymentStatusCheck = () => {
  return useMutation({
    mutationKey: [MutationKey.PAYMENT_STATUS_CHECK],
    mutationFn: paymentStatusCheck,
  });
};
