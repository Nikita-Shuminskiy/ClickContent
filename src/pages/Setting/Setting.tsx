import copyIcon from "@/assets/images/icons/copy.svg"
import qrIcon from "@/assets/images/icons/qr-code.svg"
import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx"
import FreezeWrapper from "@/components/FreezeWrapper/FreezeWrapper"
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper"
import {ButtonUI} from "@/components/ui/ButtonUI"
import {DropDownUI} from "@/components/ui/DropDownUI"
import {ErrorApiUI} from "@/components/ui/ErrorApiUI"
import {FormInputUI} from "@/components/ui/InputUI"
import {SuccessModalUI} from "@/components/ui/SuccessModalUI"
import {TabButtonUI} from "@/components/ui/TabButtonUI"
import {TabListUI} from "@/components/ui/TabListUI"
import {useUserInfoContext} from "@/contexts/UserProvider"
import {getCorrectPrice} from "@/helpers/NumberFormatter"
import {createCopyDonateLink} from "@/helpers/CreateCopyLinks.ts"
import {convertDate} from "@/helpers/Datetimeutils.ts"
import {useWindowWidth} from "@/hooks/useWindowWidth"
import {useEditDonate} from "@/OLD_rest/useSetting"
import {SettingSkeleton} from "@/pages/Setting/components/SettingSkeleton.tsx"
import {Tab} from "@headlessui/react"
import {yupResolver} from "@hookform/resolvers/yup"
import QRCode from "qrcode.react"
import {useState} from "react"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import * as yup from "yup"
import StorageService from "@/core/service/storage-service.ts"
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts"
import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'

const Setting = () => {
    const user = useGetUser().data
    // const { userInfoData, isLoading } = useGetByNickname(user?.nickName)

    return (
        <LoadingWrapper
            // isLoading={isLoading}
            isLoading={false}
            skeleton={<SettingSkeleton/>}>
            <>
                <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
                    <div className="container">
                        <h2 className="text-[32px] font-bold mb-8 max-md:text-2xl max-sm:text-lg">
                            Настройка ссылки для получения кликсов
                        </h2>
                        {/*{userInfoData?.amount ? (*/}
                        {/*    <HasDonate data={userInfoData}/>*/}
                        {/*) : (*/}
                        {/*    <NotHasDonate/>*/}
                        {/*)}*/}
                    </div>
                </section>
            </>
        </LoadingWrapper>
    )
}

const TableSetting = ({data}) => {
    const navigate = useNavigate()
    const {showAlert} = useAlert()
    const timeCreateDonate = StorageService.getCreateDonateLink()
    const {isMobile} = useWindowWidth()


    const {openModal: openCardModal} = useModal(ModalKey.ADD_CARD)

    const {
        isNotPassport,
        isNotCardsAndPassport,
    } = useUserInfoContext()

    const user = useGetUser().data

    const onClickLinkHover = (e, aim) => {
        if (isNotPassport || isNotCardsAndPassport) {
            e.preventDefault()
            navigate("/passport?warningModal=false")
            return
        }

        openCardModal("addCard")
    }

    const downloadQRCode = (element) => {
        const qrCodeCanvas =
            element instanceof HTMLCanvasElement
                ? element
                : document.querySelector(element)
        const qrCodeURL = qrCodeCanvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        const aEl = document.createElement("a")
        aEl.href = qrCodeURL
        aEl.download = "QR_Code.png"
        document.body.appendChild(aEl)
        aEl.click()
        document.body.removeChild(aEl)
    }

    const copyLink = () => {
        navigator.clipboard.writeText(createCopyDonateLink(user?.nickName))
        showAlert("Ссылка скопирована", "success")
    }

    return (
        <>
            {isMobile ? (
                <FreezeWrapper>
                    <div className="flex items-center gap-4 justify-between">
                        <div className="max-w-[300px] items-start flex flex-col gap-2">
                            <time
                                className="text-[10px]"
                                dateTime={convertDate(timeCreateDonate)}
                            >
                                {convertDate(timeCreateDonate)}
                            </time>
                            <p className="font-firstNeue text-xs w-full line-clamp-2 break-all text-left">
                                {data?.thanksText}
                            </p>
                            <div
                                className="max-w-[80%] w-full overflow-hidden line-clamp-1 text-left text-ellipsis break-all">
                <span className="inline-block w-full text-[10px] text-white/70">
                  {createCopyDonateLink(user?.nickName)}
                </span>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                                <button className="w-6 h-6 shrink-0" onClick={() => copyLink()}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={copyIcon}
                                        alt="copy"
                                    />
                                </button>
                                <hr className="w-[2px] h-4 bg-white/10 border-none"/>
                                <button
                                    className="w-7 h-7 flex-shrink-0"
                                    aria-label="QR-code"
                                    onClick={() => downloadQRCode("#qr-code-setting")}
                                >
                                    <QRCode
                                        className="custom-qr-code hidden"
                                        width={"100%"}
                                        height={"100%"}
                                        value={createCopyDonateLink(user?.nickName)}
                                        id="qr-code-setting"
                                    />
                                    <img
                                        className="w-full h-full object-cover"
                                        src={qrIcon}
                                        alt="qr"
                                    />
                                </button>
                                <hr className="w-[2px] h-4 bg-white/10 border-none"/>
                                <DropDownUI
                                    buttonRender={
                                        <FreezeWrapper>
                      <span className="block text-2xl rotate-90 text-center">
                        ...
                      </span>
                                        </FreezeWrapper>
                                    }
                                    rows={[
                                        {
                                            text: "  Скопировать ссылку",
                                            onClickHandle: () => {
                                                copyLink()
                                            },
                                        },
                                        {
                                            text: "Посмотреть платежи",
                                            onClickHandle: () => navigate("/payouts"),
                                        },
                                    ]}
                                />
                            </div>
                            <span className="text-base font-bold">{data?.amount} ₽</span>
                        </div>
                    </div>
                </FreezeWrapper>
            ) : (
                <div
                    className="w-full bg-color-vmire p-10 rounded-[32px] max-sm:bg-transparent max-sm:p-0 max-sm:rounded-none">
                    <h3 className="text-2xl font-bold mb-6 max-sm:text-base">
                        Установлено кликсов
                    </h3>
                    <div className="flex flex-col gap-6 pb-6 border-b border-b-white/20 mb-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-white/60">Количество</span>
                            <span>{data?.amount} ₽</span>
                        </div>
                        <div className="flex flex-col gap-1">
              <span className="text-sm text-white/60">
                Благодарственный текст
              </span>
                            <span className="font-firstNeue">{data?.thanksText}</span>
                        </div>
                    </div>
                    <div className="max-w-[920px]">
                        <div
                            className="grid grid-cols-[0.45fr,_1fr,_0.45fr,_0.2fr] items-center gap-4 mb-4 max-sm:hidden">
                            <span className="text-[12px] text-white/70">Дата</span>
                            <span className="text-[12px] text-white/70">URL</span>
                            <span className="text-[12px] text-white/70">QR-code</span>
                            <span className="text-[12px] text-white/70"></span>
                        </div>
                        <ul className="grid gap-4 max-sm:gap-6">
                            <FreezeWrapper>
                                <li>
                                    <div
                                        className="grid grid-cols-[0.45fr,_1fr,_0.45fr,_0.2fr] items-center gap-4 max-sm:grid-cols-1">
                                        <div className="flex items-center justify-between gap-4">
                      <span className="hidden text-[12px] text-white/70 max-sm:block">
                        Дата
                      </span>
                                            <p className="text-base line-clamp-2 max-sm:text-right">
                                                {convertDate(timeCreateDonate)}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 w-full overflow-hidden">
                      <span className="hidden text-[12px] text-white/70 max-sm:block">
                        URL
                      </span>
                                            <div
                                                className="flex items-center gap-2 overflow-hidden"
                                                onClick={copyLink}
                                            >
                                                <button className="w-6 h-6 shrink-0">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={copyIcon}
                                                        alt="copy"
                                                    />
                                                </button>
                                                <span
                                                    className="max-w-[370px] w-full overflow-hidden break-all line-clamp-1 max-sm:w-[auto] max-sm:text-right">
                          {createCopyDonateLink(user?.nickName)}
                        </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                      <span className="hidden text-[12px] text-white/70 max-sm:block">
                        QR-код
                      </span>
                                            <button
                                                className="w-7 h-7 flex-shrink-0"
                                                aria-label="QR-code"
                                                onClick={() => downloadQRCode("#qr-code-setting")}
                                            >
                                                <QRCode
                                                    className="custom-qr-code hidden"
                                                    width={"100%"}
                                                    height={"100%"}
                                                    value={createCopyDonateLink(user?.nickName)}
                                                    id="qr-code-setting"
                                                />
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={qrIcon}
                                                    alt="qr"
                                                />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap justify-end items-center gap-[10px]">
                                            <DropDownUI
                                                buttonRender={
                                                    <FreezeWrapper>
                            <span className="block text-2xl rotate-90 text-center">
                              ...
                            </span>
                                                    </FreezeWrapper>
                                                }
                                                rows={[
                                                    {
                                                        text: "  Скопировать ссылку",
                                                        onClickHandle: () => {
                                                            copyLink()
                                                        },
                                                    },
                                                    {
                                                        text: "Посмотреть платежи",
                                                        onClickHandle: () => navigate("/payouts"),
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </li>
                            </FreezeWrapper>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

const FormEditDonate = () => {
    const {data: user, refetch} = useGetUser()
    //    const {mutate} = useGetByNickname(user?.nickName);

    const settings = StorageService.getSettings()
    const [isOpenModal, setToggleModal] = useState(false)

    const {editDonate, error: errorEditDonate, isMutating} = useEditDonate()


    const onSubmitForm = async (data) => {
        const response = await editDonate(data)
        if (response) {
            setToggleModal(true)
            await refetch()
            StorageService.setCreateDonateLink(new Date())
        }
    }

    const {
        control,
        handleSubmit,
        formState: {isValid},
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup
                .object({
                    amount: yup
                        .number()
                        .required("Укажите стоимость")
                        .min(
                            settings.minDonate,
                            `Минимальная сумма ${getCorrectPrice(settings.minDonate)}`,
                        )
                        .max(
                            settings.maxDonate,
                            `Максимальная сумма ${getCorrectPrice(settings.maxDonate)}`,
                        )
                        .typeError("Допустимо только цифры"),
                    thanksText: yup
                        .string()
                        .required("Укажите благодарственный текст")
                        .max(100, "Максимально 100 символов"),
                })
                .required(),
        ),
    })

    return (
        <div
            className="w-full bg-color-vmire p-10 rounded-[32px] mb-4 relative max-sm:bg-transparent max-sm:p-0 max-sm:rounded-none">
            <SuccessModalUI
                hasCloseBtn={false}
                copyLink={createCopyDonateLink(user?.nickName)}
                isOpen={isOpenModal}
                setOpen={setToggleModal}
            />
            <h3 className="text-2xl font-bold mb-8 max-sm:text-base max-sm:mb-6 max-xs:mb-4">
                Установка количества кликсов
            </h3>
 {/*           <ErrorApiUI error={errorApiEditDonate}/>*/}
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="w-full flex flex-col gap-4 flex-grow mb-8 max-sm:mb-4 max-sm:gap-2">
                    <FormInputUI
                        control={control}
                        name="amount"
                        label="Рекомендуемое количество кликсов"
                        placeholder={`Рекомендуемое количество кликсов (${settings.minDonate} - ${settings.maxDonate})`}
                    />
                    <FormInputUI
                        control={control}
                        name="thanksText"
                        label="Благодарственное сообщение"
                        placeholder="Благодарственное сообщение"
                    />
                </div>
                <div className="max-w-[180px] w-full max-sm:max-w-full">
                    <ButtonUI
                        type="submit"
                        disabled={!isValid}
                        // disabled={isSubmitted && !isDirty && !isValid}
                        isLoading={isMutating}
                    >
                        Установить
                    </ButtonUI>
                </div>
            </form>
        </div>
    )
}

const NotHasDonate = () => {
    return (
        <div className="flex items-center gap-4 max-md:flex-col">
            <div className="max-w-[50%] w-full max-lg:max-w-[60%] max-md:max-w-full">
                <FormEditDonate/>
            </div>
            <div className="w-[50%] grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-lg:w-[40%] max-md:w-full">
                <div className="p-10 w-full grow bg-[#121212] rounded-[32px] relative max-sm:p-6 max-sm:rounded-3xl">
                    <div
                        className="flex items-center justify-center absolute -right-5 -top-5 w-24 h-24 rounded-[50%] bg-[#0e0e0e] max-sm:w-16 max-sm:h-16 max-sm:-right-2 max-sm:-top-2">
            <span
                className="flex items-center justify-center w-14 h-14 rounded-[50%] border border-solid border-white/30 text-white/30 text-2xl font-bold max-sm:w-9 max-sm:h-9 max-xs:text-xl">
              1
            </span>
                    </div>
                    <h4 className="text-lg w-[75%] mb-4 font-normal relative z-[3] max-sm:text-base">
                        Настройка ссылки для получения кликсов
                    </h4>
                    <p className="text-white/70">
                        Установите рекомендуемое количество кликсов и благодарственное
                        сообщение
                    </p>
                </div>
                <div className="p-10 w-full grow bg-[#121212] rounded-[32px] relative max-sm:p-6 max-sm:rounded-3xl">
                    <div
                        className="flex items-center justify-center absolute -bottom-7 -right-2 w-24 h-24 rounded-[50%] bg-[#0e0e0e] max-sm:w-16 max-sm:h-16 max-sm:-bottom-4">
            <span
                className="flex items-center justify-center w-14 h-14 rounded-[50%] border border-solid border-white/30 text-white/30 text-2xl font-bold max-sm:w-9 max-sm:h-9 max-xs:text-xl">
              2
            </span>
                    </div>
                    <h4 className="text-lg mb-4 font-normal max-sm:text-base">
                        Использование ссылки для приема кликсов
                    </h4>
                    <p className="text-white/70 w-[90%] relative z-[3]">
                        Разместите ссылку на любой платформе и получайте кликсы
                    </p>
                </div>
            </div>
        </div>
    )
}

const HasDonate = ({data}) => {
    const {isMobile} = useWindowWidth()

    return (
        <>
            {isMobile ? (
                <Tab.Group>
                    <TabListUI>
                        {["Добавить кликсы", "Мои кликсы"].map((title, i) => (
                            <TabButtonUI key={i} text={title}/>
                        ))}
                    </TabListUI>
                    <Tab.Panels>
                        <Tab.Panel>
                            <FormEditDonate/>
                        </Tab.Panel>
                        <Tab.Panel>
                            <TableSetting data={data}/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            ) : (
                <div className="grid grid-cols-[1fr,_0.75fr] gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                    <div className="w-full">
                        <TableSetting data={data}/>
                    </div>
                    <div className="w-full">
                        <FormEditDonate/>
                    </div>
                </div>
            )}
        </>
    )
}


export default Setting
