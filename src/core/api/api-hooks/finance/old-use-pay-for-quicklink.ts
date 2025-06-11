import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { payForQuickLink } from "../../endpoints/finance-api";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key";
import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check.ts";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import StorageService from "@/core/service/storage-service.ts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import { AxiosError } from "axios";
import OldStorageService from "@/core/service/old-storage-service.ts";

/** Оплата быстрой ссылки */
export const useOldPayForQuickLink = () => {
  const navigate = useNavigate();
  const { mutateAsync: checkPaymentStatus } = usePaymentStatusCheck();
  const client = useQueryClient();
  const { openModal } = useModal(ModalKey.SBP_PAYMENT);
  const { isMobile } = useWindowWidth();
  const { showAlert } = useAlert();

  return useMutation({
    mutationKey: [MutationKey.PAY_FOR_QUICK_LINK],
    mutationFn: payForQuickLink,
    onSuccess: async (data, variables) => {
      client.removeQueries({ queryKey: [MutationKey.PAY_FOR_QUICK_LINK] });
      const { byQr, quicklinkId, extra } = variables;
      const { url, paymentId } = data;
      /*

            /!** Если оплата через СБП - открываем модалку с qr - кодом или переходим в страницу оплаты в мобильной версии*!/
            if (byQr) {
                isMobile ? window.location.href = url : openModal({ paymentId, url })
                await executePooling(
                    () => checkPaymentStatus({ paymentId }),
                    ( result ) => RESOLVED_PAYMENT_STATUSES.includes((result as SuccessfulResponseDto).success),
                    5000,
                    ( result ) => {
                        /!** сразу переходим в модалку успешной оплаты без промежуточного чека урла
                         * в компоненте AuthorizePage **!/

                        if ((result as SuccessfulResponseDto).success === PaymentStatus.PayIn) {
                            navigate('/receipt')
                        }
                    },
                    ( error ) => {
                        navigate(`/authorize?status=fail&error=${ error.info.error }`)
                        console.error('WarningError checking payment status:', error)
                    },
                )
            } else {
                window.location.href = url
            }*/

      StorageService.setQuickLinkParams({
        type: "quicklink",
        id: quicklinkId,
        email: extra.email,
        paymentId,
      });

      StorageService.setPayments({
        id: quicklinkId,
        type: "quicklink",
        date: new Date(),
        email: extra.email,
        paymentId,
      });
    },
    onError: (error: unknown) => {
      console.log("error", error);
      OldStorageService.clearPayment();
      if (error instanceof AxiosError) {
        showAlert(error.response.data.error, "error", 10000);
      }
    },
  });
};
