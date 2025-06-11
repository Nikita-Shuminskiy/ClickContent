import copyFileIcon from "@/assets/images/icons/copy-file.svg";
import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {ModalUI} from "../ModalUI";
import {QrCodeUI} from "../QrCodeUI";
import {useUserInfoContext} from '@/contexts/UserProvider';
import FreezeWrapper from '@/components/FreezeWrapper/FreezeWrapper';
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import {Icon} from "@components/ui/icon/icon.tsx";

interface SuccessModalUIProps {
    isOpen: boolean;
    setOpen: (boolean) => void;
    copyLink: string;
    copyLinkCreative?: { text: string; value: string };
    handleCloseModal?: () => void;
    hasCloseBtn?: boolean;
    isFullScreen?: boolean;
    errorText?: string;
}

const SuccessModalUI = ({
                            copyLink,
                            hasCloseBtn,
                            errorText,
                            isFullScreen,
                            copyLinkCreative,
                            isOpen,
                            setOpen,
                            handleCloseModal,
                        }: SuccessModalUIProps) => {
    const {showAlert} = useAlert();
    const user = useGetUser().data
    const navigate = useNavigate();
    const location = useLocation();
    const {isFrozenUser} = useUserInfoContext()

    return (
        <ModalUI
            hasCloseBtn={false}
            classNameContainer={'relative'}
            isFullScreen={isFullScreen}
            isOpen={isOpen}
            setOpen={(boolean) => {
                setOpen(boolean);
                handleCloseModal?.();
            }}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <div
                    className="max-w-[240px] -mt-[180px] max-md:-mt-[120px] w-full max-md:max-w-[180px] max-sm:max-w-[152px] max-xs:-mt-[100px] max-sm:-mt-[90px]">
                    <QrCodeUI link={copyLink}/>
                </div>
                <div className="flex flex-col justify-center relative w-full">
                    <div className="pt-11 max-sm:pt-6">
                        <h3 className="text-[44px] text-center font-bold mb-3 max-sm:text-[32px]">
                            Поздравляем!
                        </h3>
                        <p className="text-2xl text-center max-sm:text-[16px] mb-[70px] max-xs:mb-[30px]">
                            {copyLinkCreative
                                ? "Вы сделали уверенный шаг к легальному заработку вместе с ClickContent!\nТеперь разместите ссылку и/или QR-код на ваш контент на нужных вам площадках, чтобы стартовать продажи!"
                                : location.pathname === "/settings"
                                    ? "Скопируйте ссылку и поделитесь ею в соцсетях, на стриме или в профиле, чтобы начать получать кликсы"
                                    : "Используйте ваш персональный QR-код"}
                        </p>
                        {
                            errorText &&
                            <p className="text-[16px] text-[red] text-center max-sm:text-sm mt-5 mb-[10px] px-4 max-xs:px-[5px]">
                                {errorText}
                            </p>
                        }

                    </div>
                    {copyLinkCreative && (
                        <p className="text-base text-left max-sm:text-sm px-8">
                            Ссылка на оплату вашего контента:
                        </p>
                    )}
                    <div
                        className="flex w-full items-center justify-center gap-[16px] pr-[12px] pl-[32px] py-[8px] rounded-[60px] border border-solid border-white/30 max-xs:border-none mb-3 max-xs:p-0 max-xs:flex-wrap">
                        <div
                            className="flex items-center flex-grow justify-center gap-[8px] py-[14px] overflow-hidden max-xs:border border-solid border-[#FFFFFF1A] max-xs:pb-[10px] max-xs:pt-[14px] max-xs:px-[32px] rounded-[60px]">
              <span className="w-[24px] h-[24px] shrink-0">
                <Icon
                    name={'copyFileIcon'}

                    className={"text-[#FFFFFFB2]"}

                />
              </span>
                            <span
                                className={`${isFrozenUser ? 'select-none' : 'select-auto'} overflow-hidden line-clamp-1 text-ellipsis max-xs:text-base text-[#FFFFFFB2]`}>
                {copyLink}
              </span>
                        </div>
                        <FreezeWrapper>
                            <button
                                className={`p-6 max-xs:py-[16px] ${isFrozenUser ? 'min-w-[224px]' : 'max-w-[224px]'} w-full bg-[#874AB0] text-white text-base leading-none rounded-[60px] max-xs:max-w-full`}
                                onClick={() => {
                                    navigator.clipboard.writeText(copyLink);
                                    showAlert("Ссылка скопирована", "success");
                                }}
                            >
                                Скопировать
                            </button>
                        </FreezeWrapper>
                    </div>
                    {copyLinkCreative && (
                        <p className="text-base text-left max-sm:text-sm mt-5 mb-[10px] px-4 max-xs:px-[5px]">
                            Текст креатива с рекламным маркером:
                        </p>
                    )}
                    {copyLinkCreative && (
                        <div
                            className=" flex w-full items-center justify-center gap-[16px] pr-[12px] pl-[32px] py-[8px] rounded-[60px] border border-solid border-white/30 max-xs:border-none mb-3 max-xs:p-0 max-xs:flex-wrap">
                            <div
                                className="flex items-center flex-grow justify-center gap-[8px] py-[14px] overflow-hidden max-xs:border border-solid border-[#FFFFFF1A] max-xs:pb-[10px] max-xs:pt-[14px] max-xs:px-[32px] rounded-[60px]">
              <span className="w-[24px] h-[24px] shrink-0">
                <img
                    src={copyFileIcon}
                    aria-hidden="true"
                    className={"text-[#FFFFFFB2]"}
                    alt="file"
                />
              </span>
                                <span
                                    className={`${isFrozenUser ? 'select-none' : 'select-auto'} overflow-hidden line-clamp-1 text-ellipsis max-xs:text-base text-[#FFFFFFB2]`}>
                  {copyLinkCreative.text}
              </span>
                            </div>
                            <button
                                className="p-6 max-xs:py-[16px] max-w-[224px] w-[100%] bg-[#874AB0] text-white text-base leading-none rounded-[60px] max-xs:max-w-full"
                                onClick={() => {
                                    if (
                                        user?.accountType != "PassportVerified"
                                    ) {
                                        navigate("/passport");
                                    } else {
                                        navigator.clipboard.writeText(copyLinkCreative.value);
                                        showAlert("Ссылка скопирована", "success");
                                    }
                                }}
                            >
                                Скопировать
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ModalUI>
    );
};

export default SuccessModalUI;
