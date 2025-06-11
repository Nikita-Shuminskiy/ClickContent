import { useNavigate } from "react-router-dom";
import { useLoginModalContext } from "@/contexts/LoginModalContext.tsx";
import { MouseEvent } from "react";
import { useAuthByTinkoff } from "@/core/api/api-hooks/auth/use-auth-by-tinkoff.ts";
import { useAuthByTelegram } from "@/core/api/api-hooks/auth/use-auth-by-telegram.ts";

import { useGetAvailableBySms } from "@/core/api/api-hooks/auth/use-get-available-by-sms.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

const Welcome = ({ onOpenPhone }) => {
  const nav = useNavigate();
  const { closeLoginModal } = useLoginModalContext();

  const {
    data: dataAvailableBySms,
    error: errorAvailableBySms,
    isLoading: isLoadingAvailableBySms,
  } = useGetAvailableBySms();

  const { mutate } = useAuthByTinkoff();
  const { mutate: addTelegram, data } = useAuthByTelegram();

  const referralUserId = localStorage.getItem("referralUserId");

  const onLinkTermsClick = () => {
    nav("/terms");
    closeLoginModal();
  };
  const onLinkPolicyClick = () => {
    nav("/policy");
    closeLoginModal();
  };
  const handleTinkoffId = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ referralUserId });
  };

  const handleTelegram = (e: MouseEvent<HTMLButtonElement>) => {
    addTelegram({ referralId: referralUserId });
    //window.location.href = `https://id.clickcontent.eu/auth/telegram/get${referralUserId ? `?${referralUserId}` : ''}` //todo  referralUserId может быть
    window.location.href = `https://t.me/clickcontenteu_bot?start=login`;
  };

  return (
    <div className={"flex justify-center items-center flex-col gap-[24px]"}>
      <div className={"flex flex-col gap-[4px] "}>
        <h3 className="text-xl font-bold  max-sm:text-[20px] text-center">
          Добро пожаловать!
        </h3>
        <p className='text-sm font-["TTFirsNeue"] text-center'>
          Выберите способ входа
        </p>
      </div>

      <div className={"flex flex-row items-center gap-[10px]"}>
        {/*  <button
                    className='w-[56px] h-[56px] !outline-none'
                    // disabled={isProcessing}
                    type='button'
                    onClick={handleTinkoffId}
                >
                    <img
                        src={logoTinkof}
                        alt='Тинькофф ID'
                    />
                </button>*/}

        <button
          className="w-[56px] h-[56px] flex justify-center items-center !outline-none bg-blue-500 rounded-[50%]"
          type="button"
          onClick={handleTelegram}
        >
          <Icon name={"telegramIco"} />
        </button>
      </div>

      {!errorAvailableBySms && !isLoadingAvailableBySms && (
        <div className={"flex flex-col items-center gap-[6px]"}>
          <p className='text-sm font-["TTFirsNeue"]'>или</p>
          <button
            className={"text-sm  bg-[#141414] text-purple-500"}
            type="button"
            onClick={onOpenPhone}
          >
            по номеру телефона
          </button>
        </div>
      )}

      <p className='text-xs font-["TTFirsNeue"] text-center text-[#5F5F5F]'>
        Регистрируясь, вы соглашаетесь с{" "}
        <span
          onClick={onLinkTermsClick}
          className='text-xs font-["TTFirsNeue"] text-center text-[#5F5F5F] underline cursor-pointer'
        >
          Условиями использования сервиса
        </span>{" "}
        и{" "}
        <span
          onClick={onLinkPolicyClick}
          className='text-xs font-["TTFirsNeue"] text-center text-[#5F5F5F] underline cursor-pointer'
        >
          Политикой конфиденциальности
        </span>
      </p>
    </div>
  );
};
export default Welcome;
