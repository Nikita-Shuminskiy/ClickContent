import { FunctionComponent } from 'react'
import { ModalKey } from '@/core/types/modal-key'
import { useModal } from '@/contexts/ModalProvider/useModal'
import AlertModal from '@components/AlertModal'

interface IProps {
    modalKey: ModalKey
}

export const ActionNotificationModal: FunctionComponent<IProps> = ({ modalKey }) => {

    const { isModalOpen, modalParams, closeModal } = useModal(modalKey)

    return (
        <AlertModal
            classNameModalContainer={"p-[37px]"}
            title={modalParams?.title}
            text={modalParams?.text}
            okButtonText={modalParams?.okButtonText}
            onOkButtonClick={modalParams?.onOkButtonClick}
            onCloseButtonText={modalParams?.onCloseButtonText}
            isOpen={isModalOpen}
            onCloseModal={closeModal}
        />
    )
}