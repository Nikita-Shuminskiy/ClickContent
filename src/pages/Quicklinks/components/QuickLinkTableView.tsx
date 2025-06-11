import {useUserInfoContext} from "@/contexts/UserProvider.tsx";
import {createCopyQuickLink} from "@/helpers/CreateCopyLinks.ts";
import {getCorrectPrice} from "@/helpers/NumberFormatter.ts";
import {useWindowWidth} from "@/hooks/useWindowWidth.ts";
import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx";
import {useNavigate} from "react-router-dom";
import FreezeWrapper from "@components/FreezeWrapper/FreezeWrapper.tsx";
import {DropDownUI} from "@components/ui/DropDownUI";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from "@/core/types/modal-key.ts";
import {IQuickLinkDto} from "@/data-contracts.ts";
import {useQuickLinkDelete} from "@/core/api/api-hooks/ui/quick-link/use-quick-link-delete.ts";
import {Icon} from "@components/ui/icon/icon.tsx";
import React from "react";

type QuickLinkViewProps = {
    ql: IQuickLinkDto;
    setSelectedQuicklink: any;
    setStateQuickLinksModal: any;
    setStateAlertModal: any;
    setAlertProps: any;
};
const QuickLinkTableView = ({
                                ql,
                                setSelectedQuicklink,
                                setStateQuickLinksModal,
                                setStateAlertModal,
                                setAlertProps,
                            }: QuickLinkViewProps) => {
    const {mutateAsync: deleteQuickLink} = useQuickLinkDelete()
    const {openModal: openCardModal} = useModal(ModalKey.ADD_CARD)

    const {isMobile} = useWindowWidth();
    const {
        isNotPassport,
        isNotCardsAndPassport,
        isFrozenUser,
    } = useUserInfoContext();
    const user = useGetUser().data

    const navigate = useNavigate();
    const {showAlert} = useAlert();
    const handleButtonInsideClick = (event) => {
        event.stopPropagation();
    };

    const onClickLinkHover = (e, ql) => {
        handleButtonInsideClick(e);
        setSelectedQuicklink(ql);

        if (isNotPassport || isNotCardsAndPassport) {
            e.preventDefault();
            navigate("/passport?warningModal=false");
            return;
        }

        openCardModal("addCard");
    };

    const onCopyUrlHandler = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(createCopyQuickLink(ql?.id));
        showAlert("Ссылка скопирована", "success");
    };

    const menuLayout = (
        <DropDownUI
            buttonRender={
                <FreezeWrapper>
                    <span className='block text-2xl rotate-[90deg]'>...</span>
                </FreezeWrapper>
            }
            rows={[
                {
                    text: "Редактировать",
                    onClickHandle: () => {
                        setSelectedQuicklink(ql);
                        setStateQuickLinksModal(true);
                    },
                },
                {
                    text: "Копировать",
                    onClickHandle: (e) => {
                        onCopyUrlHandler(e);
                    },
                },
                {
                    text: "Удалить",
                    onClickHandle: () => {
                        setAlertProps({
                            title: ql.allowResell ? 'Внимание!' : "Удаление быстрой ссылки",
                            text: ql.allowResell ? 'После удаления ссылки пользователи не смогут перепродавать ваш контент, а вы лишитесь дополнительной прибыли. Удалить ссылку?' : "Вы уверены, что хотите удалить быструю ссылку?",
                            okButtonText: ql.allowResell ? "Да" : "Удалить",
                            onOkButtonClick: async () => {
                                await deleteQuickLink(ql.id);
                            },
                        });
                        setStateAlertModal(true);
                    },
                },
            ]}
        />
    );

    return (
        <>
            {/*   todo   _1.3fr когда вернеться тип для столбца url*/}
            <div
                className='grid grid-cols-[1fr,_1.3fr,_0.8fr,_1.5fr,1fr,_0.2fr] items-center gap-4 pb-3 border-b border-b-white/10 max-sm:grid-cols-1'>
                {isMobile ? (
                    <div className={"flex justify-between gap-3"}>
                        <div className={"flex flex-col gap-[12px] max-w-full line-clamp-2"}>
                            <div className={"flex flex-col gap-[4px]"}>
                                <span className='text-sm'>{ql.title}</span>
                                <span className='text-[10px] text-[#FFFFFFB2] line-clamp-2'>
                  {ql.description}
                </span>
                            </div>
                            <span className={"text-sm"}>{getCorrectPrice(ql.amount)}</span>
                        </div>

                        <div className={"flex flex-col gap-[15px] items-end"}>
                            <div className={"flex flex-row gap-[18px] items-center"}>
                                <FreezeWrapper>
                                    <button
                                        onClick={!isFrozenUser && onCopyUrlHandler}
                                        className='w-[18px] h-[18px] shrink-0'
                                    >
                                        <Icon name={'copyIcon'} className='w-full h-full object-cover'/>
                                    </button>
                                </FreezeWrapper>

                                <div className={"h-[16px] w-[1px] bg-white/10 "}/>
                                <div>{menuLayout}</div>
                            </div>

                            {!ql?.content?.length && (
                                <div
                                    className={"bg-[#FFFFFF0D] py-[4px] px-[6px] rounded-[100px]"}
                                >
                                    <span className={"break-all text-[10px]"}>Перепродажа</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='flex items-center justify-between gap-4 overflow-hidden'>
              <span className='text-base line-clamp-1 max-sm:text-right break-all'>
                {ql.title}
              </span>
                        </div>
                        <div className='flex items-center justify-between gap-4 overflow-hidden'>
              <span className='text-base line-clamp-1 max-sm:text-right break-all'>
                {ql.description}
              </span>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <span>{getCorrectPrice(ql.amount)}</span>
                        </div>
                        <div className='flex items-center justify-between gap-4'>
              <span className={`break-all  ${!ql?.salesAvailable ? 'text-[red]' : ''}`}>
                {!ql?.salesAvailable ? ql?.errorText : "в продаже"}
              </span>
                        </div>
                        <div className='flex items-center justify-between gap-4 w-full break-all'>
                            <FreezeWrapper>
                                <div
                                    className='flex items-center gap-2 overflow-hidden'
                                    onClick={!isFrozenUser && onCopyUrlHandler}
                                >
                                    <button className='w-6 h-6 shrink-0'>
                                        <Icon name={'copyIcon'} className='w-full h-full object-cover opacity-70'/>
                                    </button>
                                    <span
                                        className='max-w-[400px] w-full overflow-hidden line-clamp-1 text-ellipsis max-sm:w-[auto] max-sm:text-right opacity-70'>
                    {`${user?.nickName?.toLowerCase()}/${ql.id}`}
                  </span>
                                </div>
                            </FreezeWrapper>
                        </div>
                        <div className='flex flex-wrap justify-end items-center gap-[10px]'>
                            {menuLayout}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default QuickLinkTableView;
