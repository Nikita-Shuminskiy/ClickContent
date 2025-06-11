import { useGetAim } from '@/OLD_rest/useUserService'
import { percentageCollected } from '@/helpers/PercentageCollected'
import { useLoginModalContext } from '@/contexts/LoginModalContext'
import LoadingWrapper from '@components/LoadingWrapper/LoadingWrapper'
import bgLand from '@assets/images/all-img/bg-land.jpg'
import applyIcon from '@assets/images/icons/apply.svg'
import { getCorrectPrice } from '@/helpers/NumberFormatter'
import { formatDate, formatTime } from '@/helpers/Datetimeutils'
import { ReceiptSkeleton } from './receipt-skeleton'
import { IPaymentInfo } from '@/data-contracts'
import {useAuth} from "@/core/api/api-hooks/auth/use-auth.ts";

export const ReceiptDonate = ({ payment }: { payment: IPaymentInfo }) => {
    const { aim, isLoading: isLoadingAim } = useGetAim(payment.aimId)

    const currentProcent = percentageCollected(aim?.currentAmount, aim?.amount)
    const isAuthorized = useAuth()

    const { openLoginModal } = useLoginModalContext()


    const handleLogin = () => {
        openLoginModal(true)
    }
    const isShowProgress = aim?.showProgress

    return (
        <LoadingWrapper
            isLoading={isLoadingAim}
            skeleton={<ReceiptSkeleton/>}
        >
            <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
                <div className="container">
                    <h2 className="sr-only">Покупка</h2>
                    <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full">
                        <img
                            className="w-full h-full object-cover"
                            src={bgLand}
                            aria-hidden="true"
                            alt="Фон"
                        />
                    </div>
                    <div className="mb-9">
                        <div className="w-14 h-14 mb-8 mx-auto">
                            <img
                                className="w-full h-full object-contain"
                                src={applyIcon}
                                aria-hidden="true"
                                alt="Готово"
                            />
                        </div>
                        <span className="block text-6xl font-bold text-center mb-4 max-md:text-5xl max-sm:text-4xl">
                            Поздравляем!
                        </span>
                        <span className="block text-2xl text-center max-sm:text-xl">
                            Оплата прошла успешно
                        </span>
                    </div>
                    <div
                        className="max-w-[1150px] w-full flex items-start gap-8 justify-between mx-auto max-md:flex-col-reverse">
                        <div className="max-w-[800px] w-full m-auto max-md:max-w-full">
                            <div
                                className="flex flex-col gap-7 w-full bg-[#141414] py-[60px] px-14 text-white rounded-[35px] max-sm:p-6">
                                <div>
                                    <h3 className="text-lg">
                                        Отправка кликсов пользователю{" "}
                                        <span className="text-[#A354D9]">
                                        </span>
                                    </h3>
                                </div>
                                {aim && (
                                    <div
                                        className={`${
                                            !isShowProgress ? "" : "p-8 bg-[#202020] max-xs:p-5"
                                        } rounded-[32px]  max-xs:rounded-2xl`}
                                    >
                                        {!isShowProgress && (
                                            <span className="block text-sm text-white/60">
                        Название
                      </span>
                                        )}
                                        <span
                                            className="block text-2xl font-bold text-white mb-2 max-sm:text-lg max-xs:text-base">
                      {aim?.title}
                    </span>
                                        {!isShowProgress && (
                                            <span className="block text-sm text-white/60">
                        Описание
                      </span>
                                        )}
                                        <p
                                            className={`${
                                                isShowProgress ? "mb-5" : ""
                                            } text-sm max-xs:text-xs`}
                                        >
                                            {aim?.description}
                                        </p>
                                        {isShowProgress && (
                                            <>
                                                <div
                                                    className="w-full h-3 rounded-[100px] border border-solid border-white/20 mb-4 relative">
                          <span
                              className="absolute flex items-center justify-end left-0 top-0 bottom-0 bg-[#874AB0] rounded-[100px]"
                              style={{
                                  width: currentProcent + "%",
                              }}
                          >
                            <span className="text-[10px] py-[5px] px-[10px] rounded-2xl bg-[#874AB0] -mr-4">
                              {currentProcent}%
                            </span>
                          </span>
                                                </div>
                                                <div className="flex items-center gap-5  justify-between">
                          <span className="text-center">
                            {getCorrectPrice(aim?.currentAmount)}
                          </span>
                                                    <span className="text-center">
                            {getCorrectPrice(aim?.amount)}
                          </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div>
                                    <span className="block text-sm text-white/60">Владелец</span>
                                    <span className="block text-base">
                    {/*{data?.beneficiary?.firstName}*/}
                                        {"\u00A0"}
                                        {/*{data?.beneficiary?.surname}*/}
                  </span>
                                </div>
                                {/*            {data?.thanksText && (*/}
                                {/*                <div>*/}
                                {/*<span className="block text-sm text-white/60">*/}
                                {/*  Сообщение*/}
                                {/*</span>*/}
                                {/*                    <span className="block text-base">{(aim ? aim : data)?.thanksText}</span>*/}
                                {/*                </div>*/}
                                {/*            )}*/}
                                <div>
                                    <span className="block text-sm text-white/60">Дата</span>
                                    <span className="block text-base">
                    {formatDate(payment?.date.toString())}{" "}
                                        {formatTime(payment?.date.toString(), false)}
                  </span>
                                </div>
                                <div className="pt-6 border-t border-solid border-white/10">
                                    <span className="block text-sm text-white/60">Сумма </span>
                                    <span className="block text-2xl font-bold">
                    {getCorrectPrice(payment?.amount)}
                  </span>
                                </div>
                                {!isAuthorized && (
                                    <div>
                                        <div className="flex flex-wrap items-center gap-1 max-xs:justify-center">
                      <span className="text-center">
                        Станьте частью ClickContent и получите доступ к
                        легальной продаже контента!
                      </span>
                                            <button
                                                className="text-[18px] font-bold"
                                                onClick={handleLogin}
                                            >
                                                Вход
                                            </button>
                                            {/*    или
                                             <Link
                                             className='text-[18px] font-bold text-[#874AB0]'
                                             to='/register'
                                             >
                                             Зарегистрироваться
                                             </Link>*/}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LoadingWrapper>
    )
}
