import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import { useModal } from '@/contexts/ModalProvider/useModal'
import { ModalKey } from '@/core/types/modal-key'
import { ModalUI } from '@components/ui/ModalUI'
import { ButtonUI } from '@components/ui/ButtonUI'
import { usePreventScroll } from '@/hooks/usePreventScroll'
import OldStorageService from "@/core/service/old-storage-service.ts";

export const SbpPaymentModal = () => {

    const {isModalOpen, closeModal, modalParams} = useModal(ModalKey.SBP_PAYMENT)
    const [ timeLeft, setTimeLeft ] = useState(300) //300
    const [ isTimeUp, setIsTimeUp ] = useState(false)


    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isModalOpen) {
            if (timeLeft > 0) {
                timerRef.current = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1)
                }, 1000)
            } else {
                setIsTimeUp(true)
            }

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current)
                }
            }
        }
    }, [ timeLeft, isModalOpen ])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${ minutes }:${ remainingSeconds < 10 ? '0' : '' }${ remainingSeconds }`
    }

    const handleCloseModal = useCallback(() => {
        closeModal()
        OldStorageService.stopPooling() /** Прерываем pooling, когда закрываем модалку*/
        setTimeLeft(300)
        setIsTimeUp(false)
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }, [ closeModal ])


    usePreventScroll(true)
    return (
        <ModalUI isOpen={ isModalOpen } setOpen={ handleCloseModal } maxWidth={ isTimeUp ? 470 : 536 }
                 wrapperClassName='!p-[32px]'>
            <div className="flex flex-col gap-25">
                { isTimeUp ? (
                    <div className="flex flex-col items-center gap-8">
                        <div className="max-w-[271px]">
                            <h2 className="text-[18px] leading-[21.6px] font-bold text-center mb-1">
                                Время вышло
                            </h2>
                            <span className="block text-[14px] leading-[19px] text-center">
                                Попробуйте оплатить заново
                             </span>
                        </div>

                        <ButtonUI
                            onClick={ handleCloseModal }
                            className="!py-[14px]"
                        >
                            Попробовать снова
                        </ButtonUI>

                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-[100px]">
                        <h2 className="text-[20px] leading-[24px] font-bold text-center">
                            Отсканируйте <span className=" inline-block text-[#874AB0]">QR-код</span> в мобильном
                            приложении вашего банка
                        </h2>
                        <div className="flex flex-col gap-[24px] items-center w-full">
                            <div className="w-[256px] h-[244px] p-4 rounded-[24px] bg-white">
                                <QRCode value={ modalParams?.url } id="qr-code-sbp" className="custom-qr-code"/>
                            </div>
                            <span
                                className="inline-block max-w-[256px] text-[14px] leading-[16.8px] text-center text-[#5F5F5F]">
                                    Срок действия QR-кода истекает через { formatTime(timeLeft) }
                                </span>
                        </div>

                        <div className="text-[14px] leading-[16.8px] text-center max-w-[256px]">
                            Для оплаты отсканируйте QR-код в приложении вашего банка
                        </div>
                    </div>
                ) }
            </div>
        </ModalUI>
    )
}
