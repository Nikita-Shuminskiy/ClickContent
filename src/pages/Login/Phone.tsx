import React from "react"
import {ButtonUI} from "@components/ui/ButtonUI"
import {useLoginModalContext} from "@/contexts/LoginModalContext.tsx"
import {Link} from "react-router-dom"
import {useAlert} from '@/contexts/AlertProvider/AlertProvider.tsx'
import {useAuthBySms} from "@/core/api/api-hooks/auth/use-auth-by-sms.ts";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import "react-phone-number-input/style.css";


type PhoneType = {
    setPhoneNumber?: (phoneNumber: string) => void,
    phoneNumber?: string,
    setStateConfirmMobileIDModall?: (stateConfirmMobileIDModal: boolean) => void,
    setIsOpenPhone?: (isOpenPhone: boolean) => void,
    setIsOpenLogin?: (isOpenLogin: boolean) => void,
    setIsStartedTimer?: (isStartedTimer: boolean) => void,
}
const Phone = ({
                   // onClickAuthHandler,
                   setPhoneNumber,
                   phoneNumber,
                   // isProcessing,
                   setStateConfirmMobileIDModall,
                   setIsOpenPhone,
                   setIsOpenLogin,
                   setIsStartedTimer,
               }: PhoneType) => {
    const {closeLoginModal} = useLoginModalContext()
    const {mutate, data, error} = useAuthBySms({})
    const {showAlert} = useAlert()

    const referralUserId = localStorage.getItem("referralUserId");

    //const [phoneValidation, setPhoneValidation] = useState(phoneNumber?.length != 18)


    const handleSms = async () => {
        if (!isValidPhoneNumber(phoneNumber)) {
            return alert('Введите корректный телефон')
        }
        try {
            mutate(
                {
                    phone: (parseInt(phoneNumber?.replace(/[\+\ \-\(\)]/gi, "").trim())),
                    referralUserId
                }
            )
            setIsOpenLogin(false)
            setIsOpenPhone(false)
            setStateConfirmMobileIDModall(true)
            setIsStartedTimer(true)
        } catch (e) {
            showAlert(e?.info?.error.split(';')[0], 'error')
        }
    }

    const toLinks = () => {
        closeLoginModal()
        setIsOpenLogin(false)
        setIsOpenPhone(false)
        setPhoneNumber('')
    }


    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSms()
        }
    }

    const onChangePhone = (value: string) => {

        const inputValue = value
        setPhoneNumber(inputValue)
        /*  const maskCompleted = !/_/.test(inputValue)
          if (!maskCompleted) {
              setPhoneValidation(true)
          } else {
              setPhoneValidation(false)
          }*/
    }

    return (
        <div className={"flex justify-center items-center flex-col gap-[24px]"}>
            <div className={"flex flex-col gap-[4px] "}>
                <h3 className="text-lg font-bold max-sm:text-[20px] text-center">
                    Вход ClickContent
                </h3>
                <p className="text-sm font-firstNeue text-center">
                    Пожалуйста, введите свой номер телефона
                </p>
            </div>
            <div className={"flex items-center justify-center"}>
                <PhoneInput
                    international
                    defaultCountry="RU"
                    style={{
                        color: 'white',
                    }}
                    value={phoneNumber}
                    onChange={onChangePhone}
                    className="w-full h-[86px] text-[32px] max-sm:text-[24px] max-xxs:text-[18px] !bg-transparent text-center outline-none p-[0px] autofill:bg-neutral-800 font-bold"
                />
            </div>

            <ButtonUI
                // disabled={phoneValidation}
                onClick={handleSms}
                type="button"
                className={
                    'font-["TTFirsNeue"] !text-[16px] h-[52px] max-sm:!text-[12px] max-sm:h-[42px]'
                }
            >
                Продолжить
            </ButtonUI>
            <p className="text-xs font-firstNeue text-center text-[#5F5F5F]">
                Регистрируясь, вы соглашаетесь с {' '}
                <Link
                    onClick={toLinks}
                    className="text-xs font-firstNeue text-center text-[#5F5F5F] underline" to={'terms'}>
                    Условиями использования сервиса
                </Link>
                {' '}
                и
                {' '}
                <Link
                    onClick={toLinks}
                    className="text-xs font-firstNeue text-center text-[#5F5F5F] underline" to={'policy'}>
                    Политикой конфиденциальности
                </Link>
            </p>
        </div>
    )
}

export default Phone
