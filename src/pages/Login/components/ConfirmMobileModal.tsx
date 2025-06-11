import {useForm} from 'react-hook-form';
import {ButtonUI} from "@components/ui/ButtonUI";
import {ModalUI} from "@components/ui/ModalUI";
import {FormInputUI} from '@components/ui/InputUI';
import {Dispatch, SetStateAction, useState} from 'react';
import {OTPInput} from 'input-otp'
import {SpinerUI} from '@components/ui/SpinerUI';
import {useAuthBySms} from "@/core/api/api-hooks/auth/use-auth-by-sms.ts";
import {useUpdateSearchParams} from "@/hooks/useUpdateSearchParams.ts";
import {useAuthBySmsVerify} from "@/core/api/api-hooks/auth/use-auth-by-sms-verify.ts";

type ConfirmMobileIdModalType = {
    isOpen?: boolean,
    tick?: number,
    onClose?: () => void,
    phoneNumber?: string,
    setStateConfirmMobileIDModall?: Dispatch<SetStateAction<boolean>>,
    setTick?: Dispatch<SetStateAction<number>>,
    setIsOpenPhone?: Dispatch<SetStateAction<boolean>>,
    setIsOpenLogin?: Dispatch<SetStateAction<boolean>>,
    isFromPayment?: boolean,
}
const ConfirmMobileModal = ({
                                isOpen,
                                tick,
                                onClose,
                                phoneNumber,
                                setStateConfirmMobileIDModall,
                                setTick,
                                setIsOpenPhone,
                                setIsOpenLogin,
                                isFromPayment
                            }: ConfirmMobileIdModalType) => {
    const {params} = useUpdateSearchParams()
    const isFromMarket = !!params.get('market')

    const onError = () => {
        setError(true)
    }

    const {mutate: sendSms} = useAuthBySms({onError})

    const {
        mutate: smsVerification,
        isPending,
    } = useAuthBySmsVerify({
        onError,
        isFromPayment,
        isFromMarket,
        setStateConfirmMobileIDModall,
        setIsOpenLogin
    })

    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);

    const {control} = useForm()

    phoneNumber = phoneNumber?.replace(/[\+\ \-\(\)]/gi, "").trim();

    const handleSms = () => {
        sendSms({phone: parseInt(phoneNumber)})
        setOtp('')
        setError(false)
        if (tick == 0) {
            setTick(60)
        }
    }
    const handleChangeNumber = () => {
        setIsOpenLogin(true)
        setIsOpenPhone(true)
        setOtp('')
        setStateConfirmMobileIDModall(false)
        setError(null)
    }
    const sendVerifyCode = () => {
        smsVerification({
            phone: parseInt(phoneNumber),
            code: otp
        });
    }


    return (
        <ModalUI
            wrapperClassName='!p-[32px]'
            isOpen={isOpen}
            hasCloseBtn={false}
            maxWidth={539}
            setOpen={onClose}
            preventCloseOnOverlayClick
        >
            <div className="mb-6 flex flex-col">
                <h3 className="text-[20px] text-center font-bold mb-3 max-sm:text-[20px]">
                    Пожалуйста, введите код
                </h3>
                <p className="text-center text-[14px]">
                    На ваш номер телефона отправлено SMS-сообщение с четырёхзначным кодом
                </p>
                <button className='text-[#874AB0] self-center text-sm' onClick={handleChangeNumber}>Изменить номер
                </button>
            </div>
            {isPending && <div
                className='absolute top-1/2 left-1/2 z-10 bg-white/5 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-[32px]'>
                <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <SpinerUI/>
                </div>
            </div>}
            <OTPInput
                onComplete={sendVerifyCode}
                maxLength={4}
                autoFocus
                containerClassName={`${error ? 'mb-2' : 'mb-6'} flex justify-center gap-3 cursor-pointer`}
                className={`!max-w-[51%] w-full mx-auto !bg-clip-border ![clip-path:inset(0px)]`}
                value={otp}
                onChange={(code) => {
                    setOtp(code);
                    setError(null);
                }}
                render={({slots}) => (
                    <>
                        {slots.map((slot, i) => (
                            <FormInputUI
                                key={i}
                                control={control}
                                label=''
                                name=''
                                className={`w-full max-w-[52px] max-h-[52px] !caret-white !pr-0 !pt-[24px] font-firstNeue mx-auto self-center ${error ? 'border-[#DE3452] border' : ''}`}
                                inputWrapperClassName='w-auto'
                                {...slot}
                                value={slot.char}
                                hasFakeCaret={slot.hasFakeCaret}
                            />
                        ))}
                    </>
                )}>
            </OTPInput>
            {error &&
                <p className='text-center text-[#DE3452] mb-6 font-manrope text-xs max-w-[350px] max-xs:max-w-full mx-auto'>{error?.info?.Message}</p>}
            <div className="flex justify-between items-center max-sm:flex-col gap-4">
                <ButtonUI
                    className={'max-sm:text-[16px] max-w-[229px] max-sm:max-w-full max-sm:!py-[16px] font-firstNeue'}
                    variant="border"
                    type="button"
                    onClick={() => {
                        onClose()
                        setOtp('')
                    }}
                >
                    Отмена
                </ButtonUI>
                {
                    tick != 0 ?
                        <p className='font-firstNeue text-white/30 text-center text-sm'>Отправить код повторно
                            через <br/> {tick} сек</p> :
                        <ButtonUI
                            className='max-sm:text-[16px] max-w-[229px] max-sm:max-w-full max-sm:!py-[16px] font-firstNeue'
                            variant='paint'
                            type='button'
                            onClick={handleSms}
                        >
                            Запросить код заново
                        </ButtonUI>
                }
            </div>
        </ModalUI>
    );
};

export default ConfirmMobileModal;
