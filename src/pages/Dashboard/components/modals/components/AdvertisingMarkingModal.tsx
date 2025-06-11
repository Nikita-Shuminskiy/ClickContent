import { IAimsInfo } from "@/OLD_models/responses/IAimsInfo.ts";
import { FunctionComponent, memo, useCallback } from "react";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { useNavigate } from "react-router-dom";
import AlertModal from "@components/AlertModal.tsx";
import { IQuickLinkDto } from "@/data-contracts.ts";

interface IProps1 {
  createLink: "aim" | "quicklink" | null;
  selectedAim?: IAimsInfo;
  selectedQuicklink?: IQuickLinkDto;
}

export const AdvertisingMarkingModal: FunctionComponent<IProps1> = memo(
  ({ createLink, selectedAim, selectedQuicklink }) => {
    const { isModalOpen, closeModal } = useModal(ModalKey.ADVERTISING_MARKING);
    const navigate = useNavigate();

    const linkId =
      createLink === "aim" ? selectedAim?.id : selectedQuicklink?.id;

    const onHandleClick = () =>
      navigate(`/ads?step=2&linkType=${createLink}&linkId=${linkId}`);

    const handleCloseModal = useCallback(() => {
      //TODO посмотреть зачем делается
      //setIsNotEditForm(false)
      closeModal();
    }, [closeModal]);

    return (
      <AlertModal
        title="Маркировка рекламы"
        text="Далее вы можете установить рекламный маркер для вашего объявления"
        okButtonText="Подробнее"
        isOpen={isModalOpen}
        // setOpen={setStateAdsModal}
        // onCloseModal={() => setIsNotEditForm(false)}
        onCloseModal={handleCloseModal}
        onOkButtonClick={onHandleClick}
      />
    );
  },
);
