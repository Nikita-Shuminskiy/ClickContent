import { AxiosError } from "axios";
import { QueryObserverResult, useMutation } from "@tanstack/react-query";
import {
  IUserDto,
  PaymentStatus,
  SuccessfulResponseDto,
} from "@/data-contracts";
import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check";
import { executePooling } from "@/core/api/utils/execute-pooling";
import { MutationKey } from "@/core/api/api-types/mutation-key";
import { ModalKey } from "@/core/types/modal-key";
import { useModal } from "@/contexts/ModalProvider/useModal";
import successCardIcon from "@/assets/images/icons/card-success.svg";
import closeIcon from "@/assets/images/icons/close.svg";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";

import { addCard } from "../../endpoints/finance-api";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";

const RESOLVED_PAYMENT_STATUSES = [
  PaymentStatus.AddCard,
  PaymentStatus.AddCardError,
  PaymentStatus.NotFound,
];

export const useAddCard = () => {
  const { showAlert } = useAlert();
  const { data: user, refetch } = useGetUser();

  const { mutateAsync: checkPaymentStatus } = usePaymentStatusCheck();

  const { openModal } = useModal(ModalKey.ADD_CARD_NOTIFICATION);
  const { closeModal } = useModal(ModalKey.ADD_CARD);

  return useMutation({
    mutationKey: [MutationKey.ADD_CARD],
    mutationFn: addCard,
    onSuccess: async (data) => {
      const { paymentId } = data;
      /** long pooling function */
      await executePooling(
        () => checkPaymentStatus({ paymentId }),
        (result) =>
          RESOLVED_PAYMENT_STATUSES.includes(
            (result as SuccessfulResponseDto).success,
          ),
        1000,
        async (result) => {
          if (
            (result as SuccessfulResponseDto).success === PaymentStatus.AddCard
          ) {
            closeModal();
            openModal({
              text: "Карта добавлена успешно",
              icon: "successCardIcon",
            });
            showAlert("Карта добавлена", "success");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            user &&
              user.balance.total &&
              (await executePooling(
                () => refetch(),
                (result) =>
                  (result as QueryObserverResult<IUserDto>).data.balance
                    .total !== user.balance.total,
                1000,
                () => {},
                () => {},
              ));
          }
          if (
            (result as SuccessfulResponseDto).success ===
              PaymentStatus.AddCardError ||
            (result as SuccessfulResponseDto).success === PaymentStatus.NotFound
          ) {
            closeModal();
            openModal({
              text: "Ошибка добавления карты",
              icon: "closeIcon",
            });
            showAlert("Произошла ошибка", "error");
          }
        },
        (error) => {
          closeModal();
          openModal({
            text: "Ошибка добавления карты",
            icon: "closeIcon",
          });
          showAlert("Произошла ошибка", "error");
          console.error("WarningError checking payment status:", error);
        },
      );
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showAlert(error.response.data.error, "error", 10000);
      }
    },
  });
};
