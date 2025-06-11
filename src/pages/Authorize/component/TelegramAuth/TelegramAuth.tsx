import React, { useEffect } from "react";
import { useAuthByTelegramVerify } from "@/core/api/api-hooks/auth/use-auth-by-telegram-verify.ts";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import WarningError from "@/pages/Authorize/component/WarningError.tsx";

const TelegramAuth = ({ setIsInitLoading, setIsError }) => {
  const { showAlert } = useAlert();
  const { params } = useUpdateSearchParams();

  const { mutateAsync: verifyAuthTelegram, isPending: isLoading } =
    useAuthByTelegramVerify();

  const paramCode = params.get("code"); // TODO для телеги параметр codeVerifier
  const telegramValue = params.get("token"); // TODO для телеги параметр code
  const paramReason = params.get("reason"); // TODO для телеги (есть register and code)

  const isLogin = paramReason === "code";
  const isRegister = paramReason === "register";

  const telegramAuthVerify = async () => {
    /*        debugger
                if(!telegramValue || !paramCode) return*/
    try {
      await verifyAuthTelegram({
        code: telegramValue,
        codeVerifier: paramCode,
      });
    } catch (err) {
      showAlert("Произошла ошибка", "error");
      setIsError(true);
    } finally {
      setIsInitLoading(false);
    }
  };

  const renderComponent = () => {
    /*   if (isLogin) {
               return <Login telegramAuthVerify={telegramAuthVerify} isLoading={isLoading}/>
           }
           if (isRegister) {
               return <Register telegramAuthVerify={telegramAuthVerify}/>
           }*/
    return <WarningError />;
  };

  useEffect(() => {
    telegramAuthVerify();
  }, []);

  return <div>{renderComponent()}</div>;
};

export default TelegramAuth;
