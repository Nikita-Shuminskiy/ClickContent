import {formatDateTime} from '@/helpers/Datetimeutils.ts'
import {getCorrectPrice} from '@/helpers/NumberFormatter.ts'
import {IIncomingPaymentDto} from '@/data-contracts.ts'
import {FunctionComponent, memo, MouseEvent} from 'react'
import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'
import {useSendToBuyersEmail} from '@/core/api/api-hooks/ui/common/use-send-to-buyers-email.ts'
import {paymentMethodsDictionary} from "@/pages/Payouts/components/incoming-payments-table/constants.ts";

interface IProps {
    finances: IIncomingPaymentDto[]
}


export const IncomingPaymentsTable: FunctionComponent<IProps> = memo(({finances}) => {
    const {openModal} = useModal(ModalKey.QUICK_LINK_DETAILS)

    const {mutateAsync: sendEmail, isPending} = useSendToBuyersEmail()

    const openPaymentInfo = (e: MouseEvent<HTMLLIElement>, payment: IIncomingPaymentDto) => {
        if (!(e.target instanceof HTMLAnchorElement)) {
            e.preventDefault();
            openModal(payment.quicklinkId)
        }
    }

    const handleResendMail = async (e: MouseEvent<HTMLButtonElement>, payment: IIncomingPaymentDto) => {
        e.stopPropagation()
        await sendEmail({
            paymentId: payment.paymentId,
            email: payment.extra.email
        })
    }
    ///payment/purchase/finances/incoming/id?
    return (
        <>
            <div
                className="grid grid-cols-[0.6fr,0.5fr,_0.5fr,_0.4fr,0.5fr,0.2fr] gap-4 mb-4 pb-3 max-sm:hidden">
                <span className="text-xs text-white/70">Дата и время</span>
                <span className="text-xs text-white/70">Название</span>
                {/*TODO Убрано из покупки контента - может вернем*/}
                {/*<span className="text-xs text-white/70">Сообщение</span>*/}
                <span className="text-xs text-white/70">Сумма</span>
                <span className="text-xs text-white/70">Индентификатор платежа</span>
                <span className="text-xs text-white/70">Тип покупки</span>
                <span className="text-xs text-white/70">Тип оплаты</span>
                <span className="text-xs text-white/70">Отправить контент</span>
            </div>
            <ul className="grid gap-4">
                {finances.map((payment, i) => {
                    return (
                        <li key={`${payment.quicklinkId}__${i}`}
                            onClick={(event) => openPaymentInfo(event, payment)}
                            className="cursor-pointer"
                        >
                            <div
                                className="grid grid-cols-[0.6fr,0.5fr,_0.5fr,_0.4fr,0.5fr,0.2fr] gap-4 items-start pb-3 border-b border-solid border-b-white/10 max-sm:grid-cols-1 max-sm:gap-2 max-sm:items-center">
                                <div className="flex items-center justify-between gap-4 h-full">
                                    <span className="hidden text-[12px] text-white/70 max-sm:block">
                                         Дата
                                    </span>
                                    <div className="flex items-center gap-3 flex-wrap ">
                                         <span className="text-xs max-xs:text-[10px]">
                                             {formatDateTime(payment.created)}
                                         </span>
                                        {/*<span className="text-xs max-xs:text-[10px]">*/}
                                        {/*     { newFormatTime(payment.created) }*/}
                                        {/* </span>*/}
                                    </div>
                                </div>
                                {/*TODO Убрано из покупки контента - может вернем*/}
                                {/*                          <div*/}
                                {/*                              className="flex items-center justify-between gap-4 line-clamp-1">*/}
                                {/*<span className="hidden text-[12px] text-white/70 max-sm:block">*/}
                                {/*  Сообщение*/}
                                {/*</span>*/}
                                {/*                              <p className="text-base text-white/70 max-sm:text-right max-xs:text-[10px] max-xs:leading-[1.4] truncate">*/}
                                {/*                                  {fi.donatorComment}*/}
                                {/*                              </p>*/}
                                {/*                          </div>*/}
                                <div className="flex items-center justify-between gap-4">
                                    <span className="hidden text-[12px] text-white/70 max-sm:block">Название</span>
                                    <span className="text-base max-sm:text-right max-xs:font-bold">
                                        {payment.title}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="hidden text-[12px] text-white/70 max-sm:block">Сумма</span>
                                    <span className="text-base max-sm:text-right max-xs:font-bold">
                                        {getCorrectPrice(payment.price)}
                                    </span>
                                </div>
                                {/*  <div className="flex items-center justify-between gap-4">
                                    <span className="hidden text-[12px] text-white/70 max-sm:block">
                                        Чек
                                    </span>
                                    <div className="text-right">
                                        { payment.paycheckUrl && (
                                            <a
                                                className="w-full text-base text-right underline max-xs:font-bold"
                                                href={ payment.paycheckUrl }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Чек
                                            </a>
                                        ) }
                                    </div>
                                </div>*/}
                                <div className="flex items-center justify-between gap-4">
                                       <span className="hidden text-[12px] text-white/70 max-sm:block">
                                         Индидентификатор платежа
                                     </span>
                                    <p className="text-base text-white/70 max-sm:text-right max-xs:text-[10px] max-xs:leading-[1.4]">
                                        {payment.paymentId}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                     <span className="hidden text-[12px] text-white/70 max-sm:block">
                                        Источник
                                     </span>
                                    <p className="text-base text-white/70 max-sm:text-right max-xs:text-[10px] max-xs:leading-[1.4]">
                                        {/*TODO Убрано все кроме быстрых ссылок*/}
                                        {/*{fi.paymentType == "Donate" && (fi.aimId == undefined || false) && <>Кликсы</>}*/}
                                        {/*{fi.paymentType == "Donate" &&*/}
                                        {/*    fi.aimId != null && <>Цель</>}*/}
                                        {/*{fi.paymentType == "Quicklink" && (*/}
                                        {/*    <>Быстрая ссылка</>*/}
                                        {/*)}*/}
                                        {/*{fi.paymentType == "Post" && <>Публикация</>}*/}
                                        Быстрая ссылка
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                     <span className="hidden text-[12px] text-white/70 max-sm:block">
                                        Тип оплаты
                                     </span>
                                    <p className="text-base text-white/70 max-sm:text-right max-xs:text-[10px] max-xs:leading-[1.4]">
                                        {paymentMethodsDictionary[payment.paymentType]}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="hidden text-[12px] text-white/70 max-sm:block">
                                        Отправить контент
                                    </span>
                                    <div className="text-left font-firstNeue">
                                        {/* TODO все платежи являются Quicklink*/}
                                        {/*{payment?.paymentType == "Quicklink" &&*/}
                                        {/*fi?.hasEmail ? (*/}
                                        {payment.extra?.email ? (
                                            <button
                                                className="w-full text-[#874AB0]"
                                                disabled={isPending}
                                                onClick={(e) => handleResendMail(e, payment)}
                                            >
                                                Повторить
                                            </button>
                                        ) : (
                                            <span className="text-[#5F5F5F]">Недоступно</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
})
