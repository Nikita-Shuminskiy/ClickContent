import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import { ModalUI } from "@components/ui/ModalUI";
import { QrCodeUI } from "@components/ui/QrCodeUI";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import { createCopyQuickLink } from "@/helpers/CreateCopyLinks.ts";
import ModalBottom from "../ModalBottom.tsx";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { useGetQuickLink } from "@/core/api/api-hooks/ui/quick-link/use-get-quick-link.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

const QuickLinksInfoModal = () => {
  const {
    isModalOpen,
    closeModal,
    modalParams: quickLinkInfo,
  } = useModal(ModalKey.QUICK_LINK_DETAILS);

  const { isMobile } = useWindowWidth();
  const navigate = useNavigate();
  const user = useGetUser().data;

  const { data: quickLink } = useGetQuickLink(quickLinkInfo?.id as string);

  const { showAlert } = useAlert();
  /*  const { adsToken } = useGetAdsToken();*/
  //TODO нужно ли будет это ?

  const [stateAlertModal, setStateAlertModal] = useState(false);

  /*    const {creativeLinks} = useGetCreativeLink(edit?.id); todo коммент рекламы */

  /*    useEffect(() => {
     if (edit != null) {
     UserService.getPaymentIncomingById("quicklink", edit.id)
     .then((json) => setLastTransactions(json.data))
     .catch((e) => console.log(e));
     }
     }, [edit]);*/

  // const handleReadMore = () => {
  //     navigate("/payouts")
  // }

  // const handleCreateAds = () => {
  //     /*  navigate(
  //      `/ads?step=${
  //      adsToken?.authorizationToken ? "3" : "2"
  //      }&isPrev=true&linkType=quicklink&linkId=${edit?.id}`,
  //      );*/
  // }

  // const handleCopyCreative = (creative) => {
  //     // navigator.clipboard.writeText(
  //     //     `${creative.description}  \r\n\r\nРеклама. ${creative?.organizationName}. ИНН
  //     // ${creative?.organizationInn}, erid: ${creative.erid} \r\n\r\nhttps://clickcontent.ru/p/${edit.id}`, )
  //     showAlert("Креатив скопирован в буфер обмена", "success")
  // }
  const handleReadMore = () => {
    navigate("/payouts");
  };
  let roubles = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumSignificantDigits: 3,
  });

  return (
    <>
      {quickLink && (
        <ModalUI
          wrapperClassName="!p-8 max-sm:!p-5"
          isFullScreen={isMobile}
          hasCloseBtn={false}
          isOpen={isModalOpen}
          setOpen={closeModal}
          maxWidth={1000}
          modalBottomClassName={
            "py-8 px-[60px] max-sm:px-5 max-sm:py-0 bg-[#141414] max-sm:bg-transparent rounded-[32px]"
          }
          modalBottom={
            quickLink?.payInTransactions.length > 0 && (
              <ModalBottom
                lastTransactions={quickLink?.payInTransactions}
                wrapperClassName="max-sm:mb-8"
              />
            )
          }
        >
          <div className="flex items-center break-all gap-8 mb-8 max-sm:flex-col">
            <div className="max-w-[250px] w-full max-md:max-w-[200px] max-xs:max-w-[160px]">
              <QrCodeUI link={createCopyQuickLink(quickLink.id)} />
            </div>
            <div className="flex-grow w-full">
              <div className="flex items-center justify-between gap-5 mb-8">
                <h3 className="text-[32px] font-bold max-md:text-2xl max-sm:text-[14px] ">
                  {quickLink.title}
                </h3>
                {/* <span className='text-sm bg-white/10 px-4 py-2 rounded-[100px] max-sm:text-xs'>
                                 Активна
                                 </span> */}
              </div>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white/60 max-sm:text-xs">
                    Описание
                  </span>
                  <span className="max-sm:text-sm break-words">
                    {quickLink.description}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white/60 max-sm:text-xs">
                    Стоимость контента
                  </span>
                  <span className="max-sm:text-sm">
                    {getCorrectPrice(quickLink.amount)}
                  </span>
                </div>
                {quickLink?.contentExt?.length > 0 && (
                  <div className="flex items-center gap-5 flex-wrap">
                    {quickLink.contentExt.map((item) => (
                      <a
                        href={item.link}
                        target="_blank"
                        key={item.link}
                        className="flex items-center gap-6 py-2 px-4 bg-white/10 uppercase rounded-full max-w-[300px]"
                      >
                        <span className="w-full line-clamp-1 overflow-hidden text-ellipsis text-xs">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className='p-8 rounded-[32px] bg-[#202020] max-xs:p-5 max-xs:rounded-2xl mb-8'>
                     <span className='block text-2xl font-bold text-white mb-2 max-sm:text-lg max-xs:text-base'>
                     Благотворительность
                     </span>
                     <p className='text-sm mb-5 max-xs:text-xs'>Описание цели</p>
                     <div className='w-full h-3 rounded-[100px] border border-solid border-white/20 mb-4 relative'>
                     <span
                     className='absolute flex items-center justify-end left-0 top-0 bottom-0 bg-[#874AB0] rounded-[100px]'
                     style={{ width: currentProcent + "%" }}
                     >
                     <span className='text-[10px] py-[5px] px-[10px] rounded-2xl bg-[#874AB0] -mr-4'>
                     {currentProcent}%
                     </span>
                     </span>
                     </div>
                     <div className='flex items-center gap-5  justify-between'>
                     <span className='text-center'>0 ₽</span>
                     <span className='text-center'>40000 ₽</span>
                     </div>${lastTransactions.length > 0 ? 'mb-16' : ''}
                     </div> */}
          <div className={"flex justify-center text-center w-full pb-[10px]"}>
            <p className={"text-center text-[red]"}>{quickLink.errorText}</p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-center gap-4 p-3 rounded-[60px] border border-solid border-[#FFFFFF1A] max-xs:border-none max-xs:p-0 max-xs:flex-wrap">
                <div className="flex items-center flex-grow justify-center gap-4 px-5 overflow-hidden max-xs:border border-solid border-[#FFFFFF1A] max-xs:pb-[10px] max-xs:pt-[14px] max-xs:px-[32px] rounded-[60px] ">
                  <span className="w-6 h-6 shrink-0 ">
                    <Icon name={"copyIcon"} className={"text-[#FFFFFFB2]"} />
                  </span>
                  <span className="overflow-hidden line-clamp-1 text-ellipsis max-xs:text-[12px] font-firstNeue">
                    {`https://clickcontent.eu/p/${quickLink.id}`}
                  </span>
                </div>

                <button
                  className="py-[20px] px-[30px] max-w-[280px] w-[100%] bg-[#874AB0] text-white text-base leading-none rounded-[60px]  max-xs:py-[17px] max-xs:max-w-full"
                  onClick={() => {
                    if (user?.accountType != "PassportVerified") {
                      navigate("/passport");
                    } else {
                      navigator.clipboard.writeText(
                        `https://clickcontent.eu/p/${quickLink.id}`,
                      );
                      showAlert("Ссылка скопирована", "success");
                    }
                  }}
                >
                  Скопировать
                </button>
              </div>
              {/*        {creativeLinks?.length > 0 && todo коммент рекламы
                             creativeLinks?.map((creative, i) => (
                             <div
                             key={`${creative?.organizationName}-${i}`}
                             className="flex items-center justify-between gap-4 py-4 px-8 rounded-[100px] bg-white/5"
                             >
                             <span>
                             Реклама. {creative?.organizationName}, ИНН{" "}
                             {creative?.organizationInn}, ERID {creative?.erid}
                             </span>
                             <button
                             className="flex flex-shrink-0 items-center gap-2 bg-white/10 py-1 px-4 rounded-[32px]"
                             onClick={() => handleCopyCreative(creative)}
                             >
                             <img
                             className="flex-shrink-0 w-5 h-5 object-cover"
                             src={copyIcon}
                             alt="copy"
                             />
                             Креатив
                             </button>
                             </div>
                             ))}*/}
              {/*  <button //todo реклама в БЛОК
                             className='w-full py-[10px] px-5 flex items-center justify-center max-xs:text-[16px] gap-2 font-["TTFirsNeue"] rounded-[100px] bg-white/5 max-sm:mb-5'
                             onClick={handleCreateAds}
                             >
                             Добавить креатив (реклама)
                             <img
                             className="w-5 h-5 object-cover"
                             src={questIcon}
                             alt="Вопрос"
                             onClick={(e) => {
                             e.stopPropagation();
                             setStateAlertModal(true);
                             }}
                             />
                             </button>*/}
            </div>
            {/* {edit?.content?.length > 0 && (
                         <div className='flex items-center gap-5 flex-wrap mb-8'>
                         {edit.content.map((ui, i) => (
                         <a
                         href={`https://qi1w212sse.a.trbcdn.net/vmire/media/${ui.id}`}
                         target='_blank'
                         key={i}
                         className='flex items-center gap-6 py-2 px-4 bg-[#874AB0]/50 rounded-full max-w-[300px]'
                         >
                         <span className='w-full line-clamp-1 overflow-hidden text-ellipsis text-xl'>
                         {ui.extension}
                         </span>
                         </a>
                         ))}
                         </div>
                         )} */}
          </div>
          {/*   <AlertModal
                     maxWidth={700}
                     isOpen={stateAlertModal}
                     setOpen={setStateAlertModal}
                     title="О создании креативов"
                     onCloseButtonText="Ок"
                     text="Креативы создаются для рекламных кампаний. Наш сервис предоставляет возможность маркировать рекламу и передавать информацию о рекламных кампаниях в ЕРИР, учитывая требования законодательства и стандарты безопасности"
                     />*/}
        </ModalUI>
      )}
    </>
  );
};

export default QuickLinksInfoModal;
