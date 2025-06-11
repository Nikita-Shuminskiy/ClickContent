import React, { useState } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import TelegramAuth from "@/pages/Authorize/component/TelegramAuth/TelegramAuth.tsx";
import PassportVerify from "@/pages/Authorize/component/PassportVerify.tsx";
import TinkoffAuthVerify from "@/pages/Authorize/component/TinkoffAuthVerify.tsx";
import Loading from "@/pages/Authorize/component/Loading.tsx";
import WarningError from "@/pages/Authorize/component/WarningError.tsx";
// import { useTinkoffPayCheck } from "@/hooks/use-tinkoff-pay-check.ts";
import { useOldTinkoffPayCheck } from "@/hooks/old-use-tinkoff-pay-check.ts";
import { BackgroundCircle } from "@/pages/payment-page/components/background-circle.tsx";
import { Icon } from "@components/ui/icon/icon.tsx";

const AuthorizePage = () => {
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { params } = useUpdateSearchParams();
  const paramStatus = params?.get("status"); // TODO telegram || rim ||
  const paramCode = params?.get("code"); //TODO тут он для тиньков ( у тиньков нет paramStatus)
  const paramSessionState = params?.get("session_state"); //TODO приходит ток при авторизации через тинькоф

  /** хук для проверки статуса оплаты после обратного редиректа из страницы оплаты Т-банка*/
  // TODO логика с новой платежкой
  // const paymentStatus = useTinkoffPayCheck(setIsInitLoading)
  //TODO старая платежка до редизайна
  useOldTinkoffPayCheck(setIsInitLoading);

  const renderComponent = () => {
    switch (paramStatus) {
      case "telegram": {
        return (
          <TelegramAuth
            setIsError={setIsError}
            setIsInitLoading={setIsInitLoading}
          />
        );
      }
      case "rim": {
        return (
          <PassportVerify
            error={isError}
            setIsError={setIsError}
            setIsInitLoading={setIsInitLoading}
          />
        );
      }
      case "fail": {
        return <WarningError />; //todo нужно понять когда статус может быть fail
      }

      default: {
        if (paramCode && paramSessionState)
          return (
            <TinkoffAuthVerify
              error={isError}
              setIsError={setIsError}
              setIsInitLoading={setIsInitLoading}
            />
          );
      }
    }
  };

  return (
    <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px] h-screen">
      {/*TODO логика с новой платежкой*/}
      {/*{ isInitLoading && paramStatus !== 'fail' || paymentStatus === PaymentStatus.Pending && <Loading/> }*/}
      {isInitLoading && paramStatus !== "fail" && <Loading />}
      <div className="container">
        <h2 className="sr-only">-</h2>
        <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full min-h-screen bg-[#0E0E0E]">
          {/*  <img
                        className="w-full h-full object-cover"
                        src={bgLand}
                        alt="Фон"
                        aria-hidden="true"
                    />*/}
        </div>
        <BackgroundCircle className="top-[-255px] left-[845px] max-lg:top-[-255px] max-lg:left-[578px] mobile:top-[-223px] mobile:left-[160px]" />
        <BackgroundCircle className="top-[631px] left-[-102px] mobile:top-[581px] mobile:left-[-102px]" />
        <div className="flex flex-col justify-center items-center">
          <div className="w-14 h-14 mb-8 mx-auto">
            <Icon
              name={isError ? "closeIcon" : "successCardIcon"}
              className="w-full h-full object-contain"
            />
          </div>
          {renderComponent()}
        </div>
      </div>
    </section>
  );
};

export default AuthorizePage;
