import FreezeWrapper from "@/components/FreezeWrapper/FreezeWrapper"
import {useUserInfoContext} from "@/contexts/UserProvider.tsx"
import {useWindowWidth} from "@/hooks/useWindowWidth"
import {IAimsInfo} from "@/OLD_models/responses/IAimsInfo.ts"
// import { useQuickLinks } from "@/OLD_rest/useQuickLinks.ts"
// import { useGetAims } from "@/OLD_rest/useTargetLinks.ts"
// import AimsView from "@common/DashboardElements/AimsView.tsx"
import LoadingWrapper from "@components/LoadingWrapper/LoadingWrapper.tsx"
import QuickLinksFormModal from "@/pages/Quicklinks/components/Forms/QuickLinksFormModal"
import QuickLinksInfoModal from "@/pages/Quicklinks/components/Forms/QuickLinksInfoModal"
import QuickLinksSuccesModal from "@/pages/Quicklinks/components/Forms/QuickLinksSuccesModal"
import {DashboardSkeleton} from "@/pages/Dashboard/components/DashboardSkeleton.tsx"
import IncomeAnalytics from "@/pages/Dashboard/DashboardElements/IncomeAnalytics/SalesAnalytics.tsx"

import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js"
import React, {useCallback, useMemo, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import "swiper/css/navigation"
import {Navigation} from "swiper/modules"
import {Swiper, SwiperSlide} from "swiper/react"
// import AlertModal from "../../common/AlertModal"
// import TargetLinksFormModal from "../../common/TargetLinksForm/TargetLinksFormModal"
// import StorageService from "../../OLD_services/StorageService"
import {Modals} from './components/modals/modals.tsx'
import {useScrollToTop} from '@/hooks/useScrollTop.ts'
import {useGetOwnerQuickLinks} from '@/core/api/api-hooks/ui/quick-link/use-get-owner-quick-links.ts'
import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'
import {IQuickLinkDto} from "@/data-contracts.ts";
import Balance from "@/pages/Dashboard/DashboardElements/Balance/Balance.tsx";
import QuickLinkView from "@/pages/Dashboard/DashboardElements/QuickLinkView.tsx";
import {useCreateRimPassport} from "@/core/api/api-hooks/passport/use-add-passport-rim.ts";
import {Icon} from "@components/ui/icon/icon.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
)
export type AlertType = {
    title: string;
    text: string | React.ReactNode;
    okButtonText?: React.ReactNode | string;
    onOkButtonClick?: (...params: any) => void;
    onCloseButtonText?: string;
};

const Dashboard = () => {
    const {
        user,
        isNotPassport,
        isNotCardsAndPassport,
        isFrozenUser,
    } = useUserInfoContext()

    const navigate = useNavigate()

    const {isMobile} = useWindowWidth()
    const scrollToTop = useScrollToTop()

    const {openModal} = useModal(ModalKey.ADD_CARD)
    const {openModal: openQuickLinkDetailsModal} = useModal(ModalKey.QUICK_LINK_DETAILS)

    const {data: quickLinks, isLoading: isLoadingQuickLinks} = useGetOwnerQuickLinks()
    const {mutate} = useCreateRimPassport()

    const [selectedQuicklink, setSelectedQuicklink] =
        useState<IQuickLinkDto>()
    const [selectedAim, setSelectedAim] = useState<IAimsInfo>(null)

    /* быстрые ссылки */
    const [stateQuickLinksModal, setStateQuickLinksModal] = useState(false) // создание и редактирование быстрой ссылки
    const [stateQuickLinksSuccessModal, setStateQuickLinksSuccessModal] =
        useState(false) // успешное создание быстрой ссылки
    /* цели */

    //const [stateTargetLinksModal, setStateTargetLinksModal] = useState(false) // создание и редактирование цели

    const [stateTargetLinksSuccessModal, setStateTargetLinksSuccessModal] =
        useState(false) // успешное создание цели
    const [stateTargetLinksInfoModal, setStateTargetLinksInfoModal] =
        useState(false)

    /* алерты */
    // const [alertProps, setAlertProps] = useState<AlertType | null>(null);
    // const [stateAlertModal, setStateAlertModal] = useState(false);

    const [stateAdsModal, setStateAdsModal] = useState(false)
    const [isNotEditForm, setIsNotEditForm] = useState(false)
    const [createLink, setCreateLink] = useState<"aim" | "quicklink" | null>(
        null,
    )

    //Todo пока не удаляем блоки, связанные с целями
    // const {
    //     aims,
    //     isLoading: isLoadingAims,
    //     mutate: mutateAims,
    // } = useGetAims(user?.id)


    const handleButtonInsideClick = useCallback((event) => {
        event.stopPropagation()
    }, [])

    const onAddPassportRim = () => {
        mutate({phone: user?.phoneNumber})
    }

    const onClickLinkHover = useCallback(
        (e, ui, from?: "Aim" | "Content") => {
            handleButtonInsideClick(e)
            if (from === "Aim") {
                setSelectedAim(ui)
            } else {
                setSelectedQuicklink(ui)
            }

            if (isNotPassport || isNotCardsAndPassport) {
                e.preventDefault()
                onAddPassportRim()
                return
            }

            //TODO проверить
            // openCardModal("addCard")
            openModal('addCard')
        },
        [isNotPassport, isNotCardsAndPassport],
    )
    const onSlideChange = useCallback((swiper) => {
        if (!swiper?.isBeginning) {
            swiper.el.classList.add("dim-swiper")
        } else {
            swiper.el.classList.remove("dim-swiper")
        }
        if (swiper?.isEnd) {
            swiper.el.classList.add("swiper-last-slide")
        } else {
            swiper.el.classList.remove("swiper-last-slide")
        }
    }, [])
    const onClickSwiperSlide = useCallback(
        (ui, from: "Aim" | "Content") => {
            if (isFrozenUser) return
            if (from === "Content") {
                openQuickLinkDetailsModal(ui)
                return
            }
            setSelectedAim(ui)
            setStateTargetLinksInfoModal(true)
        },
        [isFrozenUser],
    )
    const onOpenQuickLinksInfoModal = useCallback(() => {
        openQuickLinkDetailsModal()

    }, [])

    const onOpenQuickLinksModal = useCallback(() => {
        setStateQuickLinksModal(true)
    }, [])
    const onSetSelectedQuicklinkHandler = useCallback((link: IQuickLinkDto) => {
        setSelectedQuicklink(link)
    }, [])

    const memoizedLinks = useMemo(() => {

        return quickLinks?.slice(0, 50).map((ui, i) => {
            const qlJsx = <QuickLinkView
                ui={ui}
                onOpenQuickLinksInfoModal={onOpenQuickLinksInfoModal}
                onSetSelectedQuicklinkHandler={onSetSelectedQuicklinkHandler}
                onOpenQuickLinksModal={onOpenQuickLinksModal}
                onClickLinkHover={onClickLinkHover}
            />
            return <SwiperSlide
                className={`max-w-[435px] w-full max-sm:max-w-[85%] ${i === 0 ? 'pl-[30px] max-sm:pl-[20px]' : ''}`}
                key={`${i}-${ui?.id}`}
                onClick={() => onClickSwiperSlide(ui, "Content")}
            >
                <FreezeWrapper>
                    {qlJsx}
                </FreezeWrapper>
            </SwiperSlide>
        })
    }, [quickLinks?.length, user?.accountType, quickLinks, isFrozenUser])

    return (
        <>
            <LoadingWrapper
                isLoading={isLoadingQuickLinks}
                skeleton={<DashboardSkeleton/>}
            >
                <section className="pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
                    <div className="container">
                        {/* <Onboarding
                            onOpenQuickLinksModal={onOpenQuickLinksModal}
                            setSelectedQuicklink={setSelectedQuicklink}
                            onSlideChange={onSlideChange}
                        />*/}
                        <h2 className="sr-only">Дашбоард</h2>
                        <div className="flex items-start gap-4 max-md:flex-col">
                            <div className="w-[60%] grid gap-4 max-md:w-full">
                                <Balance
                                />
                                {/*  <LinksClicks
                                    onClickLinkHover={onClickLinkHover}
                                    scrollToTop={scrollToTop}
                                /> // todo реффералка */}
                                <div
                                    className="w-full py-10 overflow-hidden rounded-[32px] flex flex-col gap-7 bg-[#141414] max-sm:py-8 max-xs:py-6">
                                    {/* быстрые ссылки */}
                                    <div>
                                        <div
                                            className="flex items-center justify-between gap-5 px-10 mb-5 max-sm:px-8 max-xs:px-6 max-xs:gap-3">
                                            <Link
                                                onClick={scrollToTop}
                                                to="/quicklinks"
                                                className="text-2xl font-bold max-sm:text-lg"
                                            >
                                                Ваш контент
                                            </Link>
                                            <button
                                                className="flex items-center gap-1 max-xs:text-xs max-xs:self-end"
                                                onClick={(event) => {
                                                    setSelectedQuicklink(null)
                                                    setStateQuickLinksModal(true)
                                                }}
                                            >
                                                <Icon name={'plus'} className="w-6 h-6 object-cover"/>
                                                Создать ссылку
                                            </button>
                                        </div>
                                        <div className="relative ">
                                            <Swiper
                                                centeredSlides
                                                centeredSlidesBounds
                                                navigation={!isMobile}
                                                modules={[Navigation]}
                                                spaceBetween={isMobile ? 6 : 16}
                                                slidesPerView="auto"
                                                className={"!overflow-visible"}
                                                onSlideChange={onSlideChange}
                                            >
                                                {memoizedLinks?.length ? (
                                                    memoizedLinks
                                                ) : !isNotPassport ? (
                                                    <Link
                                                        to={""}
                                                        onClick={(event) => {
                                                            setSelectedQuicklink(null)
                                                            setStateQuickLinksModal(true)
                                                        }}
                                                        className="text-white/70 text-center block content-center h-[90px] bg-white/10 rounded-lg p-[10px]"
                                                    >
                            <span className={"text-purple-500"}>
                              Создайте&nbsp;
                            </span>
                                                        свою первую ссылку и начните зарабатывать!
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to="/passport?warningModal=false"
                                                        className="text-white/70 text-center block content-center h-[90px] bg-white/10 rounded-lg"
                                                    >
                            <span className={"text-purple-500"}>
                              Заполните профиль
                            </span>
                                                        , чтобы создать свою первую ссылку!
                                                    </Link>
                                                )}
                                            </Swiper>
                                        </div>
                                    </div>

                                    {/* цели */}
                                    <div>
                                        <div
                                            className="flex items-center justify-between gap-5 px-10 max-sm:px-8 max-xs:px-6 mb-5 max-xs:gap-3">
                                        </div>
                                    </div>
                                    {/* /цели */}
                                </div>
                            </div>

                            <IncomeAnalytics/>
                        </div>
                    </div>
                </section>


                {/* быстрые ссылки */}
                <QuickLinksFormModal
                    edit={selectedQuicklink}
                    isOpen={stateQuickLinksModal}
                    setOpen={setStateQuickLinksModal}
                    hasResell
                    onSuccess={(edited, created) => {
                        // TODO перезапрос за списком быстрымых ссылок
                        // mutate()
                        if (created) {
                            setSelectedQuicklink(edited)
                            setStateQuickLinksSuccessModal(true)
                            setIsNotEditForm(edited?.isCreateAds)
                            setCreateLink("quicklink")
                        }
                    }}
                    onSuccessResell={(edited, created) => {
                        // TODO перезапрос за списком быстрымых ссылок
                        // mutate()
                        if (created) {
                            setSelectedQuicklink(edited)
                            setStateQuickLinksSuccessModal(true)
                        }
                    }}
                />
                <QuickLinksSuccesModal
                    edit={selectedQuicklink}
                    isOpen={stateQuickLinksSuccessModal}
                    setOpen={setStateQuickLinksSuccessModal}
                    handleCloseModal={() => {
                        setStateAdsModal(isNotEditForm)
                    }}
                />
                <QuickLinksInfoModal
                />


                <Modals
                    createLink={createLink}
                    selectedAim={selectedAim}
                    selectedQuicklink={selectedQuicklink}
                />
            </LoadingWrapper>
        </>
    )
}

export default Dashboard
