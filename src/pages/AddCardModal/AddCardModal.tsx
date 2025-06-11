import { useCallback, useEffect, useState } from "react"
import { useAddCard } from '@/core/api/api-hooks/finance/use-add-card'
import { ModalKey } from '@/core/types/modal-key'
import { useModal } from '@/contexts/ModalProvider/useModal'
import { ButtonUI } from "@/components/ui/ButtonUI"
import { ModalUI } from "@/components/ui/ModalUI"
import AlertModal from "@/components/AlertModal"

import { AddCardNotificationModal } from "./components/AddCardNotificationModal"
import { CurrentTime } from "./components/CurrentTime"
import StorageService from "@/core/service/storage-service.ts";
import { usePreventScroll } from "@/hooks/usePreventScroll.ts";

export const AddCardModal = () => {
    const { isModalOpen, modalParams, closeModal } = useModal(ModalKey.ADD_CARD)
    const [step, setStep] = useState<number>(1)

    const { data: addedCard, mutateAsync: addCard } = useAddCard()

    const handleAddCard = useCallback(async () => {
        StorageService.setPoolingStarting()
        await addCard()
        setStep((prev) => prev + 1)
    }, [addCard, setStep])



    const handleCloseModal = useCallback(() => {
        closeModal()
        StorageService.stopPooling() /** Прерываем pooling, когда закрываем модалку*/
    },[])

    // Todo разобраться с логикой ( может устарела )
    useEffect(() => {
        if (modalParams && modalParams !== "warning") {
            StorageService.setPoolingStarting()
            setStep(2)
            addCard()
        }
    }, [isModalOpen])

   // usePreventScroll(true)

    return (
        <>
            {step === 1 && (
                <AlertModal
                    isOpen={isModalOpen}
                    setOpen={handleCloseModal}
                    title="Внимание"
                    text="Для работы в сервисе необходимо указать банковскую карту для приема платежей"
                    okButtonText={
                        <ButtonUI type="submit" onClick={handleAddCard}>
                            Продолжить
                        </ButtonUI>
                    }
                />
            )}

            {step === 2 && (
                <ModalUI
                    isOpen={isModalOpen}
                    setOpen={handleCloseModal}
                >
                    {/*<div className="mb-8">*/}
                    {/*    <CurrentTime/>*/}
                    {/*</div>*/}

                    <iframe
                        src={addedCard?.url}
                        style={{
                            width: "100%",
                            height: "600px",
                        }}
                    />

                </ModalUI>
            )}
            <AddCardNotificationModal/>
        </>
    )
}
