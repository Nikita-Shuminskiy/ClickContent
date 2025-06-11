import AlertModal from '@components/AlertModal.tsx'
import { useModal } from '@/contexts/ModalProvider/useModal.ts'
import { ModalKey } from '@/core/types/modal-key.ts'

export const EmailAlertModal = () => {
    const { isModalOpen, closeModal, modalParams } = useModal(ModalKey.EMAIL_CHECK)
    return (
        <AlertModal
            title={ modalParams?.title }
            text={ modalParams?.text }
            okButtonText={ modalParams?.okButtonText }
            onOkButtonClick={ modalParams?.onOkButtonClick }
            onCloseButtonText={ modalParams?.onCloseButtonText }
            onCancelButtonClick={ () => modalParams?.onCancelButtonClick(modalParams?.payload) }
            isOpen={ isModalOpen }
            onCloseModal={ closeModal }
        />
    )
}
