import {useModal} from '@/contexts/ModalProvider/useModal.ts'
import {ModalKey} from '@/core/types/modal-key.ts'
import {ModalUI} from '@components/ui/ModalUI'
import {ButtonUI} from "@components/ui/ButtonUI";
import {Icon} from "@components/ui/icon/icon.tsx";

export const AddCardNotificationModal = () => {
    const {isModalOpen, closeModal, modalParams} = useModal(ModalKey.ADD_CARD_NOTIFICATION)

    return (
        <ModalUI isOpen={isModalOpen} setOpen={closeModal}>
            <h2 className="sr-only">-</h2>
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 mb-8 mx-auto">
                    <Icon name={modalParams?.icon} className="w-full h-full object-contain"/>
                </div>
                <span
                    className="block text-5xl font-bold text-center mb-4 max-sm:mb-2 max-md:text-4xl max-sm:text-3xl max-xs:text-2xl">
            Добавление карты
          </span>
                <span className="block text-xl text-center mb-7 max-sm:mb-4 max-xs:text-base max-sm:text-lg">
            {modalParams?.text}
          </span>
                <ButtonUI
                    className={'font-["TTFirsNeue"] max-w-[240px] max-xs:max-w-full'}
                    onClick={closeModal}
                >
                    ОК
                </ButtonUI>
            </div>
        </ModalUI>
    )
}
