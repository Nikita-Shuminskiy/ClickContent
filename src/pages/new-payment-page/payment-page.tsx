/**
 * ---------------------Ссылка оплачена флоу---------------------
 * 1 - в корне проверяем есть ли id БС из урла среди БС из ЛС и если есть, делаем запрос /check за БС с paymentId
 * 2 - если /check c paymentId вернул success - PayIn, то делаем редирект в страницу Успешной покупки
 * 3 - если /check c paymentId вернул success - PayInError, то делаем редирект в страницу Not Found
 *
 * ---------------------Ссылка не оплачена флоу---------------------
 * 1 - если id БС из урла нет среди БС из ЛС, то делаем запрос за БС без paymentId
 * 2 - делаем запрос /pay c qr:true -> получаем url для оплаты по СБП -> отрисовываем его и запускаем таймер на 5 минут
 * **/
import { AnimatePresence, motion } from "framer-motion";
import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { useQuickLinkPayCheck } from "./hooks/use-quick-link-pay-check";
import { Extra, PaymentStatus } from "@/data-contracts.ts";
import { usePayForQuickLink } from "@/core/api/api-hooks/finance/use-pay-for-quicklink";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider";
import { getCorrectPrice } from "@/helpers/NumberFormatter";

import { FullScreenLoader } from "./components/full-screen-loader";
import { TabComponent } from "./components/tab-component";
import { Overlay } from "./components/overlay";
import { PaymentCard } from "./components/card";
import OldStorageService from "@/core/service/old-storage-service.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import TelegramFastAccess from "@/pages/new-payment-page/telegram-widget.tsx";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import { EmailAlertModal } from "@/pages/old-disign-payments-page/publication-page/components/email-alert-modal.tsx";

const PaymentPage = () => {
  const { showAlert } = useAlert();
  const { isMobile } = useWindowWidth();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { openModal: openPayModal } = useModal(ModalKey.PAY_WITH_CARD);
  const { openModal: openEmailCheckModal, closeModal } = useModal(
    ModalKey.EMAIL_CHECK,
  );
  const { mutateAsync: pay, isPending: isPendingQuickPay } =
    usePayForQuickLink();
  const { isDataPending, quickLink, checkPaymentData } = useQuickLinkPayCheck();

  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [isConsentReceived, setIsConsentReceived] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"email" | "telegram">("email");

  const isPayRejected = checkPaymentData?.success === PaymentStatus.PayInError;

  const onHandleChangeConsentReceived = (e: ChangeEvent<HTMLInputElement>) => {
    setIsConsentReceived(e.target.checked);
  };

  const amount = quickLink ? getCorrectPrice(quickLink.amount, true) : "";

  const shortLinkOrNickname = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1,
  );

  const handlePay = useCallback(async () => {
    if (!isConsentReceived) {
      alert("Примите условия сервиса!");
      return;
    }
    if (!buyerEmail) {
      openEmailCheckModal({
        title: "Внимание!",
        text: "Укажите почту, на которую необходимо отправить контент",
        onCloseButtonText: "Пропустить",
        okButtonText: "Указать",
        onCancelButtonClick: (data) => {
          handlePayMethod(data);
        },
        onOkButtonClick: closeModal,
        payload: quickLink,
      });
      return;
    }

    await handlePayMethod({ email: buyerEmail });
  }, [pay, isConsentReceived, buyerEmail]);

  const handlePayMethod = async (data: Extra) => {
    OldStorageService.clearPayment();
    //await pay()
    openPayModal({
      quicklinkId: quickLink.id,
      extra: data,
    });
  };

  const payBySBP = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    OldStorageService.clearPayment();
    if (!isConsentReceived) {
      showAlert("Примите условия сервиса!", "error");
      return;
    }

    if (!buyerEmail) {
      openEmailCheckModal({
        title: "Внимание!",
        text: "Укажите почту, на которую необходимо отправить контент",
        onCloseButtonText: "Пропустить",
        okButtonText: "Указать",
        onCancelButtonClick: async () => {
          OldStorageService.setPoolingStarting();

          openPayModal({
            quicklinkId: shortLinkOrNickname,
            byQr: true,
            extra: { email: buyerEmail } as Extra,
          });
        },
        onOkButtonClick: closeModal,
        payload: quickLink,
      });
      return;
    }
    OldStorageService.setPoolingStarting();
    openPayModal({
      quicklinkId: shortLinkOrNickname,
      byQr: true,
      extra: { email: buyerEmail } as Extra,
    });
  };

  const payByTelegram = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    OldStorageService.clearPayment();

    window.location.href = `https://t.me/clickcontenteu_bot?start=${quickLink.id}`;
  };

  if (isDataPending && !quickLink) {
    return <FullScreenLoader />;
  }

  const togglePanelTelegram = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-[#00000080] z-0  ">
      <Overlay>
        <PaymentCard>
          <EmailAlertModal />
          <AnimatePresence>
            {isPanelOpen && (
              <motion.div
                initial={{ y: isMobile ? "200%" : "0%" }}
                animate={{ y: isMobile ? "70%" : 0 }}
                exit={{ y: isMobile ? "300%" : "-100%" }}
                transition={{ type: "spring", duration: 0.9 }}
                className="absolute top-0 h-full w-full max-h-[400px] max-sm:max-h-[500px]  z-50 flex justify-center"
              >
                <TelegramFastAccess
                  close={togglePanelTelegram}
                  payByTelegram={payByTelegram}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-sm:h-full max-sm:flex max-sm:flex-col max-sm:justify-between">
            <div>
              <PaymentCard.MainInfo
                title={quickLink.title}
                amount={amount}
                description={quickLink.description}
              />
              <div className="py-4 px-6 ">
                <TabComponent
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  buyerEmail={buyerEmail}
                  setBuyerEmail={setBuyerEmail}
                />
              </div>
            </div>

            <PaymentCard.Actions
              togglePanelTelegram={togglePanelTelegram}
              onChangeAgreement={onHandleChangeConsentReceived}
              amount={amount}
              payBySBP={payBySBP}
              handlePay={handlePay}
              isPayRejected={isPayRejected}
              isPending={isPendingQuickPay}
            />
          </div>
        </PaymentCard>
      </Overlay>
    </main>
  );
};

export default PaymentPage;

// TODO старая  платежка убранор СБП
/*    const payBySBP = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        OldStorageService.clearPayment()
        if (!isConsentReceived) {
            showAlert('Примите условия сервиса!', "error")
            return
        }

        OldStorageService.setPoolingStarting()
        ({
            quicklinkId: shortLinkOrNickname,
            byQr: true,
            extra: {email: buyerEmail} as Extra
        })
        /!* await pay({
             quicklinkId: shortLinkOrNickname,
             byQr: true,
             extra: { ...getValues() as Extra },
         })*!/
        /!*  if (!buyerEmail) {
      openEmailCheckModal({
          title: 'Внимание!',
          text: 'Укажите почту, на которую необходимо отправить контент',
          onCloseButtonText: 'Пропустить',
          okButtonText: 'Указать',
          onCancelButtonClick: async () => {
              OldStorageService.setPoolingStarting()
              /!*await pay({
                  quicklinkId: shortLinkOrNickname,
                  byQr: true,
                  extra: { ...getValues() as Extra }
              })*!/
              openPayModal({
                  quicklinkId: shortLinkOrNickname,
                  byQr: true,
                  extra:  {email: buyerEmail} as Extra
              })
          },
          onOkButtonClick: closeModal,
          payload: {
              email: buyerEmail,
          }
      })
      return
  }*!/
    }*/
