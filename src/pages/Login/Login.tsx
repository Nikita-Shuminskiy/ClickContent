import {useState} from "react";
import ConfirmMobileModal from "@/pages/Login/components/ConfirmMobileModal.tsx";
import {ModalUI} from "@components/ui/ModalUI";
import Phone from "@/pages/Login/Phone.tsx";
import {useUpdateSearchParams} from '@/hooks/useUpdateSearchParams.ts';
import {useAuthTimer} from "@/hooks/useAuthTimer.ts";
import Welcome from "@/pages/Login/Welcome.tsx";

const LoginModal = ({isOpen, setIsOpenLogin, isFromPayment}) => {
    const {clearParams} = useUpdateSearchParams()
    const [isOpenPhone, setIsOpenPhone] = useState(false);
    const [isOpenConfirmPhone, setIsOpenConfirmPhone] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);

    const onOpenPhone = () => {
        setIsOpenPhone(true);
    };
    const {setIsStartedTimer, tick, setTick} = useAuthTimer({isOpenConfirmPhone})

    return (
        <>
            <ModalUI
                isOpen={isOpen}
                hasCloseBtn={false}
                setOpen={() => {
                    setIsOpenLogin(false);
                    clearParams(['market', 'open'])
                    setTimeout(() => {
                        setPhoneNumber("");
                        setIsOpenPhone(false);
                    }, 500);
                }}
                wrapperClassName={"!p-[32px]"}
                maxWidth={539}
            >
                <h2 className="sr-only">Страница Логина</h2>
                 {isOpenPhone ? (
                     <Phone
                         setStateConfirmMobileIDModall={setIsOpenConfirmPhone}
                         setIsOpenPhone={setIsOpenPhone}
                         setIsStartedTimer={setIsStartedTimer}
                         setIsOpenLogin={setIsOpenLogin}
                         setPhoneNumber={setPhoneNumber}
                         phoneNumber={phoneNumber}
                     />
                ) : (
                    <Welcome onOpenPhone={onOpenPhone}/>
                )}
            </ModalUI>

            <ConfirmMobileModal
                isFromPayment={isFromPayment}
                setStateConfirmMobileIDModall={setIsOpenConfirmPhone}
                tick={tick}
                setIsOpenPhone={setIsOpenPhone}
                setTick={setTick}
                setIsOpenLogin={setIsOpenLogin}
                isOpen={isOpenConfirmPhone}
                phoneNumber={phoneNumber}
                onClose={() => {
                    setPhoneNumber("");
                    setIsOpenConfirmPhone(false);
                }}
            />
        </>
    );
};

export default LoginModal;
