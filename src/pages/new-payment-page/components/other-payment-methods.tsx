import { Extra, IQuickLinkDto } from "@/data-contracts.ts";
import { ChangeEvent, FunctionComponent, memo, useCallback, useState } from "react";
import { usePayForQuickLink } from "@/core/api/api-hooks/finance/use-pay-for-quicklink.ts";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import logo from "@assets/images/icons/click-logo-without-letters.svg";
import { ButtonUI } from "@components/ui/ButtonUI";
import card from "@assets/images/icons/card.svg";
import arrow from "@assets/images/icons/arrow-back.svg";
import { CheckboxUI } from '@/components/ui/CheckboxUI'
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";


interface IProps {
    data?: IQuickLinkDto
    isPayRejected: boolean
    isDataPending: boolean
    buyerEmail: string
    setBuyerEmail: ( email: string ) => void
}

export const OtherPaymentMethods: FunctionComponent<IProps> = memo(( {
                                                                         data,
                                                                         isPayRejected,
                                                                         isDataPending,
                                                                         buyerEmail,
                                                                         setBuyerEmail
                                                                     } ) => {

    const [ isConsentReceived, setIsConsentReceived ] = useState<boolean>(false)
    const { showAlert } = useAlert()

    const { mutateAsync: pay, isPending } = usePayForQuickLink()

    const amount = data ? getCorrectPrice(data.amount, true) : ''

    const handlePay = useCallback(async () => {
        if (!isConsentReceived) {
            showAlert('Примите условия сервиса!', "error")
            return
        }
        await pay({
            quicklinkId: data.id,
            extra: { email: buyerEmail } as Extra
        })
    }, [ pay ])


    const onHandleChangeConsentReceived = ( e: ChangeEvent<HTMLInputElement> ) => {
        setIsConsentReceived(e.target.checked)
    }

    const payBySBP = useCallback(async () => {
        const response = await pay({
            quicklinkId: data.id,
            byQr: true,
            extra: { email: buyerEmail } as Extra
        })
    }, [ pay, data ])


    if (isDataPending) return null

    return (
        <div className='max-w-[676px] w-full  max-xs:px-[32px] mobile:px-[20px] mobile:pb-[20px]'>
            <div
                className='mb-[32px] flex items-center gap-1.5 font-firstNeue leading-[30px] max-sm:leading-[23px] max-sm:mb-6 max-xs:mb-[28px] mobile:mb-[136px]'>
                <img src={ logo } alt=""/>
                ClickContent
            </div>

            <div
                className='mb-[62px] max-lg:max-w-[496px] max-lg:mb-[24px] max-sm:mb-[24px] max-xs:max-w-[354px] max-xs:mb-[28px] mobile:mb-[42px]'>
                <h2 className='pb-[11px] font-steppe font-bold text-[44px] leading-[50px] text-white max-lg:text-[24px] max-lg:leading-[29px]'>
                    Вы покупаете { data?.title } за <span className='text-[#874AB0]'>{ amount } руб.</span>
                </h2>
                <p className='font-firstNeue font-normal text-[14px] leading-[16px] text-white max-w-[400px]'>
                    { data?.description }
                </p>
            </div>


            {/*<TabComponent*/}
            {/*    buyerEmail={ buyerEmail }*/}
            {/*    setBuyerEmail={ setBuyerEmail }*/}
            {/*/>*/}
            <div className='mb-6 max-sm:mb-2 mobile:mb-[165px]'>
                <CheckboxUI onChange={ onHandleChangeConsentReceived }>
                    <p className='font-normal text-[12px] leading-[15.5px] text-[#5F5F5F] max-w-[356px]'>
                        Я согласен с <a href="/terms" className='underline'>Условиями использования</a> и { ' ' }
                        <a href="/policy" className='underline'>Политикой конфиденциальности сервиса</a>
                    </p>
                </CheckboxUI>
            </div>


            <div className='font-firstNeue max-w-[400px] max-sm:max-w-[295px] mobile:max-w-full'>
                <ButtonUI
                    onClick={ handlePay }
                    disabled={ isPending || isPayRejected }
                    variant='border'
                    className='mb-[24px] flex gap-[10px] items-center !justify-between text-white !p-[5px_12px_5px_6px] rounded-[60px] max-xs:mb-0'>
                    <div className='flex items-center gap-[10px] prefix_button'>
                         <span
                             className='inline-flex items-center justify-center w-[48px] h-[48px] rounded-full bg-[#874AB0]'>
                                <img src={ card } alt='' className='w-6 h-6'/>
                         </span>
                        <div className='flex flex-col gap-[2px] items-start'>
                            <p className='text-[12px] leading-[14px]'>Оплатить: { amount } руб.</p>
                            <p className='text-[16px] leading-[19px] max-sm:text-[14px] max-sm:leading-[16px]'>
                                Банковская карта
                            </p>
                        </div>
                    </div>
                    <img src={ arrow } alt='arrow'
                         className='inline-flex items-center justify-center w-6 h-6 rotate-180'/>
                </ButtonUI>
            </div>
            <div
                className='hidden mobile:block fixed mobile:bottom-0 mobile:z-10 mobile:right-0 mobile:w-full mobile:p-5 mobile:rounded-[38px_38px_0px_0px] mobile:bg-gradient-to-br from-[#F0826C] via-[#874AB0] to-[#863AFF] '
                onClick={ payBySBP }
            >
                <div className='flex items-center gap-[10px] justify-between '>
                    <span className=' w-[42px] h-[42px] bg-white flex items-center justify-center rounded-full'>
                           {/*<img src={ sbp } alt=""/>*/}
                    </span>
                    <div className='text-[12px] leading-[14px] font-firstNeue font-normal flex-1 text-center'>
                        <span className='block'>{ amount } руб.</span>
                        <span className='block'>Оплатить с СБП</span>
                    </div>
                    <img src={ arrow } alt='arrow'
                         className='inline-flex items-center justify-center w-6 h-6 rotate-180'/>
                </div>
            </div>
        </div>
    )
})

