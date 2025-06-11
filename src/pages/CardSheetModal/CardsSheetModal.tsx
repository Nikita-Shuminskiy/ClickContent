import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'
import {ModalUI} from '@components/ui/ModalUI'
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import CardView from "@/pages/CardSheetModal/components/CardView.tsx";
import {ButtonUI} from "@components/ui/ButtonUI";
import plusIcon from "@assets/images/icons/plus.svg";
import React, {useCallback, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ICardDto} from "@/data-contracts.ts";
import {usePaymentRequest} from "@/core/api/api-hooks/finance/use-payment-request.ts";
import {useGetLimitsByCards} from "@/core/api/api-hooks/finance/use-get-limits-by-cards.ts";
import {useWindowWidth} from "@/hooks/useWindowWidth.ts";
import {Icon} from "@components/ui/icon/icon.tsx";

export const CardsSheetModal = () => {
    const navigate = useNavigate()
    const {isMobile} = useWindowWidth()

    const {isModalOpen, closeModal, modalParams} = useModal(ModalKey.CARDS_SHEET)
    const {openModal: openAddCardModal} = useModal(ModalKey.ADD_CARD)

    const {data: dataLimits} = useGetLimitsByCards();
    const {data: user} = useGetUser()
    const {mutateAsync: withdraw, isPending} = usePaymentRequest()

    const [selectedCard, setSelectedCard] = useState<ICardDto | null>(null)

    const onGoPayouts = () => {
        navigate('/payouts')
    }

    const onChoseCard = useCallback((card: ICardDto | null) => {
        setSelectedCard(card)
    }, [])

    const onWithdraw = async () => {
        const userBalance = user?.balance?.total
        if (!selectedCard) return alert("Выберете карту")

        if (!userBalance || userBalance <= 0) return alert("Баланс 0")

        const remainingAmount = dataLimits?.maxWithdrawAmountPerCard - selectedCard.payout

        const remainingOperations = dataLimits?.maxWithdrawOperationsPerCard - selectedCard.operations;

        if (remainingAmount <= 0 || remainingOperations <= 0) return alert("Вывод по этой карте недоступен: превышен лимит.");

        //todo берем максимально доступное значение (к примеру у юзера 100balance, лимит 120 на 1 карту) - итог вывод 100.. 1 операция, остаток лимита 20

        //todo к user пришло +20 к балансу
        //todo остаток у юзера 20balance - остаток лимита 20 - итог вывод 20...  Мы вывели за 2 операции 120 - ( карта в блок на сутки )
        const maxAvailableAmount = Math.min(remainingAmount, userBalance);


        try {
            await withdraw({cardId: selectedCard.id, amount: maxAvailableAmount})
            onChoseCard(null)
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    const sortedCards = useMemo(() => {
        //todo Сортировка по убыванию оставшегося лимита
        return user?.cards.sort((a, b) => {
            const remainingA = dataLimits?.maxWithdrawAmountPerCard - a.payout;
            const remainingB = dataLimits?.maxWithdrawAmountPerCard - b.payout;
            return remainingB - remainingA;
        })
    }, [user?.cards, dataLimits])


    return (
        <ModalUI isFullScreen={isMobile} maxWidth={539} wrapperClassName={'!p-[32px]'} isOpen={isModalOpen}
                 setOpen={closeModal}>
            <h2 className="sr-only">-</h2>
            <div className="flex flex-col items-center">
                 <span
                     className="block text-[18px] font-bold text-center mb-[4px]">
                     {modalParams?.title}
                 </span>

                <span className="block text-[14px] text-center mb-[24px] font-firstNeue">
                        {modalParams?.description}
                </span>

                <div className="w-full flex flex-col gap-[12px]">
                    {
                        sortedCards.map((card) => {
                            return <CardView isChosen={selectedCard?.id === card.id}
                                             onChoseCard={onChoseCard} card={card} key={card.id}/>
                        })
                    }
                </div>

                <div className={'mt-[12px] w-full'}>
                    <ButtonUI
                        variant='border'
                        className={' !py-[32px] max-xs:!py-[12px] max-xs:!text-xs text-[16px] '}
                        onClick={() => openAddCardModal("addCard")}
                    >

                        <div className="flex items-center justify-center w-full gap-[40px]">
                            <span className="block text-[16px] text-center">Добавить карту</span>

                            <Icon name={'plus'}  aria-hidden="true"/>
                        </div>
                    </ButtonUI>
                </div>

                <div className={'flex flex-row items-center gap-[10px] w-full mt-[32px]'}>
                    <ButtonUI
                        variant='border'
                        className={'font-["TTFirsNeue"] max-xs:!py-[12px] !text-[16px] max-xs:!text-xs'}
                        onClick={onGoPayouts}
                    >
                        Все карты
                    </ButtonUI>

                    <ButtonUI
                        className={'font-["TTFirsNeue"] max-xs:!py-[12px] !text-[16px] max-xs:!text-xs'}
                        onClick={onWithdraw}
                        disabled={isPending}
                        isLoading={isPending}
                    >
                        Выбрать
                    </ButtonUI>
                </div>
            </div>
        </ModalUI>
    )
}

