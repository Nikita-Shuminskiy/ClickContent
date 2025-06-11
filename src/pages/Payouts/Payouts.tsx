import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper"
import {classNames} from "@/helpers/CssClasses.ts"
import {Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition} from "@headlessui/react"
import React, {Fragment, useCallback, useEffect, useState} from "react"
import {formatDateQuery,} from "../../helpers/Datetimeutils.ts"
import {useGetUser} from '@/core/api/api-hooks/ui/user/use-get-user.ts'
import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'

import {PayoutCalendarContent} from './components/PayoutCalendarContent'
import {CardSkeleton} from "./components/CardSkeleton"
import {CardsSlider} from './components/CardsSlider'
import {Modals} from './components/Modals'
import {getCurrentMonth} from './utils'
import {useGetPayouts} from '@/core/api/api-hooks/ui/analytics/use-get-payouts.ts'
import {useGetIncomingPayments} from '@/core/api/api-hooks/ui/analytics/use-get-incoming-payments.ts'
import {IncomingPaymentsTable} from '@/pages/Payouts/components/incoming-payments-table/incoming-payments-table.tsx'
import {PayoutsTable} from '@/pages/Payouts/components/payouts-table/payouts-table.tsx'
import {IIncomingPaymentDto, IPayoutsDto} from '@/data-contracts.ts'
import {useGetIncomingSearchPayments} from "@/core/api/api-hooks/ui/analytics/use-get-search-incoming.ts";
import {useUpdateSearchParams} from "@/hooks/useUpdateSearchParams.ts";
import {InputUI} from "@components/ui/InputUI";
import {ButtonUI} from "@components/ui/ButtonUI";
import {Icon} from "@components/ui/icon/icon.tsx";

type Report = 'incoming' | 'payouts'

const selectValue: { value: Report, text: string }[] = [
    {value: "incoming", text: "Входящие"},
    {value: "payouts", text: "Выплаты"},
]

type Finances = {
    type: Report,
    data: (IPayoutsDto | IIncomingPaymentDto)[]
}

const Payouts = () => {
    const {params, updateParams, clearParams} = useUpdateSearchParams()

    const {openModal: openAddCardModal} = useModal(ModalKey.ADD_CARD)
    const {openModal: openCalendarModal} = useModal(ModalKey.PAYOUTS_CALENDAR)

    const [startDate, setStartDate] = useState(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    )
    const [endDate, setEndDate] = useState(new Date())

    const [selected, setSelected] = useState(selectValue[0])

    const [finances, setFinances] = useState<Finances>({
        type: selectValue[0].value,
        data: [],
    })

    const [totalMoney, setTotalMoney] = useState(0)
    const {isLoading} = useGetUser()

    const {data, isLoading: isIncomingPaymentsLoading} = useGetIncomingPayments(
        startDate && formatDateQuery(startDate),
        endDate && formatDateQuery(endDate),
        selected.value
    )

    const getIdPayment = params.get('idPayment')

    const {data: dataSearch} = useGetIncomingSearchPayments(getIdPayment)

    const {data: payoutsData, isLoading: isPayoutsDataLoading} = useGetPayouts(
        startDate && formatDateQuery(startDate),
        endDate && formatDateQuery(endDate),
        selected.value
    )

    const currentMonthString = getCurrentMonth()

    const handleOpenAddCard = useCallback(() => openAddCardModal("addCard"), [openAddCardModal])

    const isDataLoading = isLoading || isPayoutsDataLoading || isIncomingPaymentsLoading

    useEffect(() => {
        if (selected.value === 'incoming') {
            setFinances({
                type: selected.value,
                data
            })
            const total = data?.reduce((acc, i) => acc + i.price, 0) ?? 0
            setTotalMoney(total)
        } else {
            setFinances({
                type: selected.value,
                data: payoutsData
            })
            const total = payoutsData?.reduce((acc, i) => acc + i.payOut, 0)
            setTotalMoney(total)
        }
    }, [data, payoutsData, selected.value])

    // const allUtms = { value: "", text: "UTM-метки" }
    // const [selectedUtm, setSelectedUtm] = useState(allUtms)
    // const [utms, setUtms] = useState([allUtms])


    // useEffect(() => {
    //     UserService.getUtms().then((json) => {
    //         let u = [allUtms]
    //         json.data.forEach((i) => {
    //             u.push({ value: i, text: i })
    //         })
    //         setUtms(u)
    //     })
    // }, [])

    // const [stateTargetLinksInfoModal, setStateTargetLinksInfoModal] =
    //     useState(false)
    // const [selectedAim, setSelectedAim] = useState(null)
    // const [selectedQuicklink, setSelectedQuicklink] = useState(null)

    const [search, setSearch] = useState('')


    const onSearchPayment = () => {
        if (!search.trim()) return clearParams(['idPayment'])
        updateParams({idPayment: search.trim()})
    }
    useEffect(() => {
        if (getIdPayment) {
            setSearch(getIdPayment)
        }
    }, [])

    return (
        <section className=" pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
            <div className="container">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-8 gap-3">
                        <h2 className="text-[32px] font-bold max-md:text-2xl">Мои карты</h2>
                        <button
                            className="max-xs:flex items-center hidden text-xs"
                            onClick={handleOpenAddCard}
                        >
                            <Icon name={'plus'} aria-hidden="true"/>
                            <span>Добавить карту</span>
                        </button>
                    </div>
                    <LoadingWrapper
                        isLoading={isLoading}
                        skeleton={<CardSkeleton/>}
                    >
                        <CardsSlider/>
                    </LoadingWrapper>
                </div>
                <h2 className="text-[32px] mb-8 font-bold max-md:text-2xl ">
                    История платежей
                </h2>

                <div className="flex gap-4 flex-row my-[10px] max-w-[700px] items-center">
                    <InputUI
                        label='Поиск по индификатору платежа'
                        placeholder='Поиск по индификатору платежа'
                        value={search}
                        onInput={(e) => setSearch(e.target.value)}
                    />

                    <ButtonUI onClick={onSearchPayment} className={'max-w-[200px] h-[49px]'}>
                        искать
                    </ButtonUI>
                </div>

                <div className="grid grid-cols-[1fr,_0.4fr] gap-3 max-md:grid-cols-1 max-sm:gap-5">
                    <div className="rounded-[30px] bg-color-vmire p-10 pt-5 max-sm:p-0 max-sm:bg-transparent">
                        <div className="flex items-center gap-4 justify-between mt-1 mb-8 max-sm:-ml-0 -ml-5">
                            <Listbox value={selected} onChange={setSelected}>
                                {({open}) => (
                                    <div
                                        className={`${
                                            open
                                                ? "max-sm:bg-inherit bg-[#202020]"
                                                : `bg-inherit duration-200`
                                        } relative rounded-t-2xl`}
                                    >
                                        <ListboxButton className="w-full text-left font-bold">
                                            <div className="flex items-center gap-3 max-sm:p-0 p-5 pb-0">
                        <span className="text-2xl max-sm:text-base  text-white">
                          {selected.text}
                        </span>
                                                <span
                                                    className={`${
                                                        open ? "rotate-180" : "rotate-0"
                                                    } duration-300 block w-0 h-0 border-solid border-[5px] border-r-transparent border-l-transparent border-b-0 boder-t-white`}
                                                ></span>
                                            </div>
                                        </ListboxButton>
                                        <Transition
                                            as={Fragment}
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <ListboxOptions
                                                className="absolute max-h-60 max-sm:max-h-[94px] w-full max-sm:w-[127px] flex flex-col justify-center font-firstNeue max-sm:py-1.5 px-5 pt-1 pb-2 origin-top-right max-sm:rounded-2xl rounded-b-2xl right-auto left-0 overflow-hidden bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {selectValue.map((value, index) => (
                                                    <ListboxOption
                                                        className={`${
                                                            selectValue.length !== index + 1
                                                                ? "border-b border-white/10"
                                                                : ""
                                                        }`}
                                                        value={value}
                                                    >
                                                        <button
                                                            className={classNames(
                                                                "flex items-center gap-2 text-white w-full py-3 text-left text-base leading-[19px] font-firstNeue border-b border-white",
                                                            )}
                                                        >
                                                            {value.text}
                                                        </button>
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                )}
                            </Listbox>


                            <button onClick={() => openCalendarModal()}
                                    className="hidden items-center gap-2 max-sm:flex"
                                    type="button"
                            >
                                <span className="text-sm font-bold">{currentMonthString}</span>
                                <Icon name={'calendarIcon'} aria-hidden="true"
                                      className="w-6 h-6 object-contain flex-shrink-0"/>
                            </button>
                        </div>

                        {/* пусто */}
                        {finances === null ||
                            finances?.data === null ||
                            (finances?.data?.length === 0 && (
                                <div
                                    className="flex justify-center items-center py-60 max-xs:py-12 max-md:py-20 max-lg:py-48">
                                    {selected.value === "incoming" ? (
                                        <div>
                                            <p className="text-base text-center">
                                                У вас пока нет входящих платежей
                                            </p>
                                            <p className="text-sm text-center max-w-[284px] text-[#898989]">
                                                Создайте ссылку, чтобы начать зарабатывать
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-base text-center">
                                                Вы пока не выводили средства
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}

                        {/* входящие */}
                        {finances &&
                            finances?.data?.length > 0 &&
                            finances?.type == "incoming" && (
                                <IncomingPaymentsTable
                                    finances={getIdPayment && dataSearch || finances.data as IIncomingPaymentDto[]}/>
                            )}

                        {/* выплаты */}
                        {finances &&
                            finances?.data?.length > 0 &&
                            finances?.type == "payouts" && (
                                <PayoutsTable payouts={finances.data as IPayoutsDto[]}/>
                            )}
                    </div>
                    <PayoutCalendarContent
                        totalMoney={totalMoney}
                        startDate={startDate}
                        endDate={endDate}
                        selected={selected}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        classname="max-sm:hidden flex flex-col items-center gap-8 p-5 rounded-[30px] bg-color-vmire max-md:-order-1 max-md:flex-row max-sm:flex-col"
                    />
                </div>
            </div>
            <Modals
                // selectedAim={selectedAim}
                // setStateTargetLinksInfoModal={setStateTargetLinksInfoModal}
                // stateTargetLinksInfoModal={stateTargetLinksInfoModal}
                totalMoney={totalMoney}
                startDate={startDate}
                endDate={endDate}
                selected={selected}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </section>
    )
}

export default Payouts


