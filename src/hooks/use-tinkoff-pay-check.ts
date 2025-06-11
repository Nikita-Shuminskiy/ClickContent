import StorageService from "@/core/service/storage-service.ts";
import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { PaymentStatus, SuccessfulResponseDto } from "@/data-contracts.ts";
import { executePooling } from "@/core/api/utils/execute-pooling.ts";

const PROCESSED_STATUSES = [
  PaymentStatus.PayIn,
  PaymentStatus.PayInError,
  PaymentStatus.NotFound,
];

export const useTinkoffPayCheck = (
  setInitialLoading: (value: boolean) => void,
) => {
  const { status } = useParams<{ status: string }>();

  const payments = StorageService.getPayments();
  const currentActivePayment =
    payments && payments.filter((p) => p.isActive)[0];

  const { mutateAsync: paymentCheck, data: paymentStatus } =
    usePaymentStatusCheck();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (status === "success") {
        StorageService.setPoolingStarting();
        if (currentActivePayment?.paymentId) {
          await executePooling(
            () => paymentCheck({ paymentId: currentActivePayment?.paymentId }),
            (result) =>
              PROCESSED_STATUSES.includes(
                (result as SuccessfulResponseDto).success,
              ),
            1000,
            (result) => {
              if (
                (result as SuccessfulResponseDto).success ===
                PaymentStatus.PayIn
              ) {
                navigate(`/receipt?id=${currentActivePayment?.id}`);
              }
              if (
                (result as SuccessfulResponseDto).success ===
                  PaymentStatus.PayInError ||
                (result as SuccessfulResponseDto).success ===
                  PaymentStatus.NotFound
              ) {
                navigate("/authorize?status=fail&error=Нет%20информации");
              }
            },
            (error) => {
              StorageService.stopPooling();
              navigate(`/authorize?status=fail&error=${error.info.error}`);
              console.error("WarningError checking payment status:", error);
            },
          );
        }
      } else if (status === "fail") {
        navigate("/authorize?status=fail&error=Нет%20информации");
      }
    };
    checkAndRedirect().finally(() => {
      setInitialLoading(false);
      StorageService.updatePayments(currentActivePayment?.paymentId);
    });
  }, [status]);

  return paymentStatus?.success ?? "";
};
