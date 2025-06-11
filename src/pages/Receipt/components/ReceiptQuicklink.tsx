import { useGetQuickLink } from "@/core/api/api-hooks/ui/quick-link/use-get-quick-link.ts";
import { useLoginModalContext } from "@/contexts/LoginModalContext.tsx";
import LoadingWrapper from "@components/LoadingWrapper/LoadingWrapper.tsx";
import applyIcon from "@assets/images/icons/apply.svg";
import { ReceiptSkeleton } from "./ReceiptSkeleton";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import { useAuth } from "@/core/api/api-hooks/auth/use-auth.ts";
import { CheckboxUI } from "@/components/ui/CheckboxUI";
import React, { FunctionComponent, memo, useState } from "react";
import registerBg from "@/assets/images/all-img/register-bg.png";
import { ButtonUI } from "@/components/ui/ButtonUI";
import { IExtendedContentItemDto } from "@/data-contracts.ts";
import StorageService from "@/core/service/storage-service.ts";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Icon } from "@components/ui/icon/icon.tsx";

interface IProps {}

export const ReceiptQuickLink: FunctionComponent<IProps> = memo(() => {
  const { params } = useUpdateSearchParams();

  const quickLinkId = params.get("id");

  const payments = StorageService.getPayments();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const { openLoginModal } = useLoginModalContext();
  const isAuth = useAuth();

  const quickLinkPaid = payments?.find((p) => p.id === quickLinkId);

  const { data: quickLink, isLoading } = useGetQuickLink(
    quickLinkPaid?.id,
    quickLinkPaid?.paymentId,
  );

  const searchParams = new URLSearchParams(location.search);
  const isHasQuicklink = searchParams.has("hasQuicklink");

  const handleLogin = () => openLoginModal(true);

  const downloadFile = (file: IExtendedContentItemDto) => {
    const a = document.createElement("a");
    a.href = file.link;
    a.download = file.name || "download";
    a.rel = "noopener noreferrer";
    a.target = "_blank";
    a.type = "application/octet-stream";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSelectedFiles = () => {
    selectedFiles.forEach((file) => {
      const currentFile = quickLink?.contentExt.find(
        (content) => content.id === file.id,
      );
      if (currentFile) {
        downloadFile(currentFile);
      }
    });
  };

  const handleCheckboxChange = (content) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.some((file) => file?.id === content.id)
        ? prevSelectedFiles.filter((file) => file?.id !== content?.id)
        : [...prevSelectedFiles, content],
    );
  };
  const downloadAllFiles = (allContet) => {
    setSelectedFiles(allContet.map((file) => file));
  };

  const formattedDate = new Date(quickLinkPaid?.date).toLocaleDateString(
    "ru-RU",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  return (
    <LoadingWrapper isLoading={isLoading} skeleton={<ReceiptSkeleton />}>
      <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
        <div className="container">
          <h2 className="sr-only">Покупка</h2>
          <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full bg-[#0e0e0e]" />
          {!isHasQuicklink && (
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
                {quickLinkPaid?.isGift
                  ? "Ваш подарок отправлен"
                  : "Оплата прошла успешно"}
              </span>
            </div>
          )}
          <div className="max-w-[816px] w-full mx-auto flex flex-col-reverse gap-8 justify-between max-md:max-w-full ">
            <div className="max-w-[816px] w-full m-auto max-md:max-w-full">
              <div className="flex flex-col gap-6 w-full bg-[#141414] py-[60px] px-14 text-white rounded-[35px] max-sm:p-6 mb-2">
                <div>
                  <h3 className="text-lg">
                    {quickLinkPaid?.isGift
                      ? "Оплата прошла успешно"
                      : `Покупка контента: ${quickLink?.title}`}
                  </h3>
                </div>

                <div className="border-custom-dashed" />

                <div className="flex flex-col gap-4">
                  <div className="font-firstNeue">
                    <h3 className="text-sm text-[#FFFFFF99] mb-1">Владелец</h3>
                    <h3>{quickLink?.user?.nickName}</h3>
                  </div>
                  <div className="font-firstNeue">
                    <h3 className="text-sm text-[#FFFFFF99] mb-1">Описание</h3>
                    <h3>{quickLink?.description}</h3>
                  </div>
                  <div className="font-firstNeue">
                    <h3 className="text-sm text-[#FFFFFF99] mb-1">Почта</h3>
                    <h3>{quickLinkPaid?.email}</h3>
                  </div>
                  {quickLinkPaid?.date && (
                    <div className="font-firstNeue">
                      <h3 className="text-sm text-[#FFFFFF99] mb-1">Дата</h3>
                      <h3>{formattedDate}</h3>
                    </div>
                  )}
                </div>

                <div className="border-custom-dashed" />

                <div className="font-firstNeue">
                  <h3 className="text-sm text-[#FFFFFF99] mb-1">Сумма</h3>
                  <h3 className="text-2xl">
                    {getCorrectPrice(quickLink?.amount)}
                  </h3>
                </div>
              </div>

              {quickLink && quickLink?.contentExt && (
                <>
                  <div className="flex flex-col gap-3 p-[34px] max-sm:p-6 bg-[#141414] rounded-[35px] max-xs:mb-5">
                    {quickLink.contentExt?.map((content, i) => (
                      <div
                        key={`${content.name}__${i}`}
                        className="w-full flex flex-col gap-3"
                      >
                        <div className="flex w-full items-center text-xs justify-between gap-4  p-3 bg-[#1a1a1a] rounded-2xl">
                          <label className="flex items-center font-manrope overflow-hidden">
                            <CheckboxUI
                              onChange={() => {
                                handleCheckboxChange(content);
                              }}
                              checked={selectedFiles.some(
                                (file) => file?.id === content.id,
                              )}
                            />
                            <div className="flex basis-full text-white">
                              <span className="line-clamp-1 max-w-[250px] w-full text-inherit">
                                {content.name ? content.name : content.id}
                              </span>
                            </div>
                          </label>
                          <input className="sr-only" type="file" />

                          <button
                            className="w-5 h-5 flex-shrink-0 hover:opacity-50 transition-opacity"
                            type="button"
                            onClick={() => downloadFile(content)}
                          >
                            <Icon
                              name={"downloadIcon"}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center">
                      {selectedFiles?.length != 0 && (
                        <span className="text-sm font-firstNeue text-[#5F5F5F]">
                          Выбрано: {selectedFiles?.length}
                        </span>
                      )}
                      <div className="flex justify-end flex-grow gap-4">
                        <button
                          className="text-[#874AB0] text-sm font-firstNeue flex-shrink-0"
                          type="button"
                          onClick={() => downloadAllFiles(quickLink?.content)}
                        >
                          Выбрать все
                        </button>
                        {selectedFiles?.length != 0 && (
                          <div className="max-w-[300px]">
                            <ButtonUI
                              onClick={downloadSelectedFiles}
                              type="button"
                              className="font-firstNeue max-xs:hidden bg-[#874AB0] rounded-full"
                            >
                              Скачать выбранные
                            </ButtonUI>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectedFiles?.length != 0 && (
                    <div className="hidden max-xs:block">
                      <ButtonUI
                        onClick={downloadSelectedFiles}
                        type="button"
                        className="bg-[#874AB0] rounded-full"
                      >
                        Скачать выбранные
                      </ButtonUI>
                    </div>
                  )}
                </>
              )}
            </div>
            {!isAuth && (
              <div
                className="px-[34px] max-w-[816px] w-full h-[130px] bg-cover bg-center"
                style={{ backgroundImage: `url(${registerBg})` }}
              >
                <div className="h-full flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Сохрани контент</h3>
                    <p className="max-w-[313px] text-sm font-normal leading-[16.8px]">
                      Зарегистрируйся и лови контент в личном кабинете!
                    </p>
                  </div>

                  <ButtonUI
                    onClick={handleLogin}
                    className="!bg-white max-w-[200px] !text-[#874AB0] !font-normal"
                  >
                    Регистрация
                  </ButtonUI>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TODO Перепродажа убрана*/}
        {/*<QuickLinksResellFormModal*/}
        {/*    // edit={{*/}
        {/*    //     ...data?.quicklink,*/}
        {/*    //     resellId: createCopyQuickLink(payment?.id),*/}
        {/*    // }}*/}
        {/*    isOpen={openResellModal}*/}
        {/*    setOpen={setOpenResellModal}*/}
        {/*/>*/}
      </section>
    </LoadingWrapper>
  );
});
