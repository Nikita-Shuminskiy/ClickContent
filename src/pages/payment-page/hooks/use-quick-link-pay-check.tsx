import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Extra,
  IAddCardDto,
  IQuickLinkDto,
  PaymentStatus,
  SuccessfulResponseDto,
} from "@/data-contracts";
import StorageService from "@/core/service/storage-service";
import { usePaymentStatusCheck } from "@/core/api/api-hooks/finance/use-payment-status-check";
import { useGetQuickLink } from "@/core/api/api-hooks/ui/quick-link/use-get-quick-link";
import { usePayForQuickLink } from "@/core/api/api-hooks/finance/use-pay-for-quicklink";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider";

import { PayErrorAlert } from "../components/pay-error-alert";

type UseQuickLinkPayCheck = () => {
  isDataPending: boolean;
  isPayPending: boolean;
  quickLink: IQuickLinkDto;
  SBPQrData: IAddCardDto;
  payError: unknown;
  checkPaymentData: SuccessfulResponseDto;
};

export const useQuickLinkPayCheck: UseQuickLinkPayCheck = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const isMobile = window.innerWidth < 400;

  /** стейт нужен для того, чтобы запускать запрос за БС в сдучае, если ее нет в списке оплаченных*/
  const [isQuickLinkDontPaid, setIsQuickLinkDontPaid] =
    useState<boolean>(false);

  /** Забираем айди БС из урла*/
  const { quickLinkId } = useParams<{ quickLinkId?: string }>();

  /** Забираем из ЛС список оплченных БС*/
  const payments = StorageService.getPayments();

  /** Проверяем, есть ли текущая БС в списке оплаченных*/
  const paidQuickLink = payments?.find((payment) => payment.id === quickLinkId);

  /** хук для проверки статуса оплаты ссылки*/
  const {
    mutateAsync: checkPaymentStatus,
    isPending,
    data: checkPaymentData,
  } = usePaymentStatusCheck();

  const {
    mutateAsync: pay,
    data: SBPQrData,
    isPending: isPayPending,
    error: payError,
  } = usePayForQuickLink();

  const {
    data: quickLink,
    isLoading: quickLinkLoading,
    error,
  } = useGetQuickLink(quickLinkId, undefined, isQuickLinkDontPaid);

  const isDataPending = isPending || quickLinkLoading || isPayPending;

  useEffect(() => {
    const checkAndRedirect = async () => {
      /** если БС уже оплачена*/
      if (paidQuickLink) {
        const result = await checkPaymentStatus({
          paymentId: paidQuickLink.paymentId,
        });
        if (result.success === PaymentStatus.PayIn) {
          navigate(`/receipt?hasQuicklink=true&id=${quickLinkId}`);
        }
        if (result.success === PaymentStatus.PayInError) {
          /** ошибка оплаты  */
          payError &&
            showAlert(
              <PayErrorAlert
                title="Возникла ошибка!"
                text="Пожалуйста, повторите попытку позже, либо свяжитесь с автором ссылки"
              />,
              "error",
              5000,
            );
        }
        /** если возвращаемся из платежной страницы без оплаты*/
        if (result.success === PaymentStatus.Pending) {
          setIsQuickLinkDontPaid(true);
          StorageService.removePayments(paidQuickLink.paymentId);
        }
      } else {
      /** если БС не оплачена*/
        if (!isMobile) {
          StorageService.setPoolingStarting();
          setIsQuickLinkDontPaid(true);
          await pay({
            quicklinkId: quickLinkId,
            byQr: true,
            extra: {} as Extra,
          });
        }
      }
    };
    checkAndRedirect().finally();
    return () => {
      setIsQuickLinkDontPaid(false);
    };
  }, []);

  /** если БС нет то редиректим на 404 */
  useEffect(() => {
    error &&
      (error as AxiosError).response.status === 400 &&
      navigate("/not-found");
  }, [error]);

  /** ошибка оплаты  */
  useEffect(() => {
    payError &&
      showAlert(
        <PayErrorAlert
          title="Возникла ошибка!"
          text="Пожалуйста, повторите попытку позже, либо свяжитесь с автором ссылки"
        />,
        "error",
        5000,
      );
  }, [payError]);

  return {
    isDataPending,
    isPayPending,
    quickLink,
    SBPQrData,
    checkPaymentData,
    payError,
  };
};
