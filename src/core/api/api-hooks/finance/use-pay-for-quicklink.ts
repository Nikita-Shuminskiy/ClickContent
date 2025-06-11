import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { payForQuickLink } from "../../endpoints/finance-api";
import { useNavigate } from "react-router-dom";
import { executePooling } from "@/core/api/utils/execute-pooling.ts";
import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check.ts";
import StorageService from "@/core/service/storage-service.ts";
import { PaymentStatus, SuccessfulResponseDto } from "@/data-contracts.ts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import { AxiosError } from "axios";

const RESOLVED_PAYMENT_STATUSES = [
  PaymentStatus.PayIn,
  PaymentStatus.PayInError,
];

/** Оплата быстрой ссылки */
export const usePayForQuickLink = () => {
  const navigate = useNavigate();
  const { mutateAsync: checkPaymentStatus } = usePaymentStatusCheck();
  const client = useQueryClient();
  const { showAlert } = useAlert();

  const isMobile = window.innerWidth < 400;

  return useMutation({
    mutationKey: [MutationKey.PAY_FOR_QUICK_LINK],
    mutationFn: payForQuickLink,
    onSuccess: async (data, variables) => {
      client.removeQueries({ queryKey: [MutationKey.PAY_FOR_QUICK_LINK] });
      const { byQr, quicklinkId, extra } = variables;
      const { url, paymentId } = data;
      /** Если оплата через СБП - открываем модалку с qr - кодом или переходим в страницу оплаты в мобильной версии*/
      if (byQr) {
        if (isMobile) {
          window.location.href = url;
        }
        await executePooling(
          () => checkPaymentStatus({ paymentId }),
          (result) =>
            RESOLVED_PAYMENT_STATUSES.includes(
              (result as SuccessfulResponseDto).success,
            ),
          5000,
          (result) => {
            /** сразу переходим в модалку успешной оплаты без промежуточного чека урла
             * в компоненте AuthorizePage **/
            if (
              (result as SuccessfulResponseDto).success === PaymentStatus.PayIn
            ) {
              StorageService.setPayments({
                id: quicklinkId,
                type: "quicklink",
                date: new Date(),
                email: extra.email,
                paymentId,
                isActive: false,
              });
              StorageService.stopPooling();
              navigate(`/receipt?id=${quicklinkId}`);
            }
          },
          (error) => {
            StorageService.stopPooling();
            navigate(`/authorize?status=fail&error=${error.info.error}`);
            console.error("WarningError checking payment status:", error);
          },
        );
      } else {
        window.location.href = url;
        StorageService.setPayments({
          id: quicklinkId,
          type: "quicklink",
          date: new Date(),
          email: extra.email,
          paymentId,
          isActive: true,
        });
      }
    },
    onError: (error: unknown) => {
      console.log("error", error);
      if (error instanceof AxiosError) {
        showAlert(error.response.data.error, "error", 10000);
      }
    },
  });
};
