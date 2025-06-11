import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import AlertModal from "@components/AlertModal.tsx";

export const UnlinkPaymentCardModal = () => {
  const { isModalOpen, closeModal, modalParams } = useModal(
    ModalKey.UNLINK_PAYMENT_CARD,
  );

  return (
    <AlertModal
      title={modalParams?.title}
      text={modalParams?.text}
      okButtonText={modalParams?.okButtonText}
      onOkButtonClick={modalParams?.onOkButtonClick}
      isOpen={isModalOpen}
      setOpen={closeModal}
    />
  );
};
