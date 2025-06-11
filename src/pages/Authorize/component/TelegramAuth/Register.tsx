import React, { useEffect } from "react";
import { ButtonUI } from "@components/ui/ButtonUI";

const Register = ({ telegramAuthVerify }) => {
  const openTelegram = () => {
    const telegramLink = "tg://resolve?domain=clickcontentapp_bot";
    window.location.href = telegramLink;
  };

  useEffect(() => {
    telegramAuthVerify();
  }, []);
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <span
        className={
          "block items-center max-sm:text-2xl text-3xl font-bold text-center mb-4 max-md:text-5xl"
        }
      >
        Мы отправили вам код подтверждения в телеграм
      </span>
      <ButtonUI className={"max-w-[240px]"} onClick={openTelegram}>
        Открыть телеграм
      </ButtonUI>
    </div>
  );
};

export default Register;
