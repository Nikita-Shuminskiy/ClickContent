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

import { CSSProperties, useState } from "react";
import { useQuickLinkPayCheck } from "./hooks/use-quick-link-pay-check.tsx";
import { PaymentStatus } from "@/data-contracts.ts";
import ClipLoader from "react-spinners/ClipLoader";
import { BackgroundCircle } from "./components/background-circle.tsx";
import { SBPPayment } from "./components/sbp-payment-block.tsx";
import { OtherPaymentMethods } from "./components/other-payment-methods.tsx";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const PaymentPage = () => {
  const [buyerEmail, setBuyerEmail] = useState<string>("");

  const { isDataPending, SBPQrData, quickLink, checkPaymentData, payError } =
    useQuickLinkPayCheck();

  const isPayRejected =
    checkPaymentData?.success === PaymentStatus.PayInError || !!payError;

  return (
    <main className="relative min-h-screen bg-[#0E0E0E] flex items-center justify-center px-[50px] max-sm:pl-[67px] max-sm:pr-8 max-xs:px-0 max-xs:py-[32px] mobile:pt-[68px]">
      <BackgroundCircle className="top-[-255px] left-[845px] max-lg:top-[-255px] max-lg:left-[578px] mobile:top-[-223px] mobile:left-[160px]" />
      <div className="h-full flex items-center gap-[82px] max-lg:gap-[55px] max-sm:gap-[29px] max-xs:flex-col-reverse max-xs:items-center max-xs:gap-6 ">
        <SBPPayment
          data={SBPQrData}
          isPayRejected={isPayRejected}
          isDataPending={isDataPending}
        />
        <OtherPaymentMethods
          data={quickLink}
          isPayRejected={isPayRejected}
          isDataPending={isDataPending}
          buyerEmail={buyerEmail}
          setBuyerEmail={setBuyerEmail}
        />
      </div>
      <BackgroundCircle className="top-[631px] left-[-102px] mobile:top-[581px] mobile:left-[-102px]" />
      {isDataPending && !SBPQrData && !quickLink && (
        <div className="absolute indent-0 flex items-center justify-center">
          <ClipLoader
            cssOverride={override}
            size={150}
            color={"#123abc"}
            loading={true}
            speedMultiplier={1.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </main>
  );
};

export default PaymentPage;
