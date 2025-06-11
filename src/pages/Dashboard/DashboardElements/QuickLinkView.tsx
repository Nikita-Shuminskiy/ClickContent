import { useUserInfoContext } from "@/contexts/UserProvider.tsx";
import { createCopyQuickLink } from "@/helpers/CreateCopyLinks.ts";
import { formatDate } from "@/helpers/Datetimeutils.ts";

import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import React, { memo, useCallback } from "react";
import "swiper/css";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key";
import { useQuickLinkDelete } from "@/core/api/api-hooks/ui/quick-link/use-quick-link-delete.ts";
import { IQuickLinkDto } from "@/data-contracts.ts";
import { DropDownUI } from "@components/ui/DropDownUI";
import { Icon } from "@components/ui/icon/icon.tsx";

type QuickLinkViewProps = {
  ui: IQuickLinkDto;
  onOpenQuickLinksInfoModal: () => void;
  onSetSelectedQuicklinkHandler: (link: IQuickLinkDto) => void;
  onOpenQuickLinksModal: () => void;
  onClickLinkHover: (e, data, from: "Aim" | "Content") => void;
};
const QuickLinkView = ({
  ui,
  onSetSelectedQuicklinkHandler,
  onOpenQuickLinksModal,
}: QuickLinkViewProps) => {
  const { isFrozenUser } = useUserInfoContext();

  const isResale = !ui?.content?.length;
  const { showAlert } = useAlert();

  const { openModal, closeModal } = useModal(ModalKey.QUICK_LINK_REMOVE);

  const { mutateAsync: deleteQuickLink } = useQuickLinkDelete();

  const handleRemoveQuickLink = useCallback(() => {
    onSetSelectedQuicklinkHandler(ui);
    openModal({
      title: "Удалить ссылку на контент?",
      text: ui.title ?? ui.description,
      okButtonText: "Удалить",
      onOkButtonClick: async () => {
        await deleteQuickLink(ui.id);
        closeModal();
      },
    });
  }, []);

  return (
    <div
      className={`p-6 rounded-[32px] max-xs:rounded-2xl  ${
        ui.errorText ? "border-2 border-[red] rounded-[20px]" : ""
      } ${isFrozenUser ? "custom-border-dashed-links" : "bg-[#1A1A1A]"}`}
    >
      <div className="flex items-center justify-between gap-5 mb-6 pb-5 border-b border-white/10 max-xs:gap-3">
        <div
          className={`flex flex-col gap-1 truncate ${
            isFrozenUser && "!flex-row"
          }`}
        >
          {isFrozenUser && (
            <Icon
              name={"snow"}
              className="w-[24px] h-[24px] object-contain flex-shrink-0"
            />
          )}
          <h3 className="text-lg font-bold max-xs:text-sm truncate">
            {ui.title}
          </h3>
          {ui.errorText && (
            <p className="text-lg  max-xs:text-sm truncate text-[red]">
              {ui.errorText}
            </p>
          )}
        </div>
        <div className="max-xs:ml-auto">
          <div className="flex items-center gap-2">
            {isFrozenUser ||
              (isResale && (
                <span className={"text-sm max-sm:text-[10px] text-white/50"}>
                  {isFrozenUser ? "Заморожена" : isResale ? "Перепродажа" : ""}
                </span>
              ))}
            <DropDownUI
              buttonRender={
                <span className="w-6 h-6 flex items-center justify-center rounded-[50%] p-1 flex-shrink-0 bg-white/10">
                  <Icon
                    name={"dotsIcon"}
                    className="w-full h-full object-cover"
                  />
                </span>
              }
              rows={[
                {
                  text: "Копировать",
                  onClickHandle: () => {
                    navigator.clipboard.writeText(createCopyQuickLink(ui.id));
                    showAlert("Ссылка скопирована", "success");
                  },
                },
                {
                  text: "Редактировать",
                  onClickHandle: () => {
                    onSetSelectedQuicklinkHandler(ui);
                    onOpenQuickLinksModal();
                  },
                },
                {
                  text: "Удалить",
                  onClickHandle: handleRemoveQuickLink,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-white/50">Дата создания</span>
          <time
            className="text-white/50"
            data-time={formatDate(ui.created?.toString())}
          >
            {formatDate(ui.created?.toString())}
          </time>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-white/50">Стоимость</span>
          <span className="text-white/50">{String(ui?.amount / 100)} ₽</span>
        </div>
      </div>
    </div>
  );
};

export default memo(QuickLinkView);
