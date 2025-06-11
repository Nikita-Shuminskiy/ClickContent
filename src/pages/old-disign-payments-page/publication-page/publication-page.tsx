import React, {memo, useEffect, useState} from 'react'
import useFormPersist from 'react-hook-form-persist'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
// import { createCopyQuickLink } from '@/helpers/CreateCopyLinks.ts'
import {Extra, IQuickLinkDto} from '@/data-contracts'
import {ModalKey} from '@/core/types/modal-key'
import {useModal} from '@/contexts/ModalProvider/useModal'

import {publicationPageSchema} from './schemes/publicationPageSchema'
import {CloseModalButton} from './components/close-modal-button'
import {SbpPaymentModal} from './components/sbp-payment-modal'
import {ModalContent} from './components/modal-content'
import {EmailAlertModal} from './components/email-alert-modal'
import {useQuickLinkRedirect} from '@/hooks/use-quick-link-redirect'
import OldStorageService from "@/core/service/old-storage-service.ts";
// import QuickLinksResellFormModal from '@/pages/Quicklinks/common/Forms/QuickLinksResellFormModal'


type IProps = {
    data: IQuickLinkDto,
    id: string
}

const PublicationPage = memo(({data, id}: IProps) => {
    useQuickLinkRedirect(id)
    const {isModalOpen} = useModal(ModalKey.SBP_PAYMENT)
    const {openModal: openEmailCheckModal, closeModal} = useModal(ModalKey.EMAIL_CHECK)

    const [isConditionsChecked, setIsConditionsChecked] = useState(false)

    // TODO новая  платежка
    // const { mutateAsync: pay } = usePayForQuickLink()
    //TODO старая платежка
    //const {mutateAsync: pay} = useOldPayForQuickLink()


    const {openModal: openPayModal} = useModal(ModalKey.PAY_WITH_CARD)
//    const { closeModal: closePayWithCard } = useModal(ModalKey.PAY_WITH_CARD)

    const methods = useForm({
        mode: "onSubmit",
        resolver: yupResolver(publicationPageSchema),
    })
    const {watch, setValue} = methods
    useFormPersist("payPublication", {watch, setValue})

    const isUserHasEmail = watch('email')

    const handlePayMethod = async (data: Extra) => {
        OldStorageService.clearPayment()
        //await pay()
        openPayModal({
            quicklinkId: id,
            extra: data
        })
    }

    const onSubmitForm = async (data: Extra) => {
        if (!isConditionsChecked) {
            alert('Примите условия сервиса!')
            return
        }
        if (!isUserHasEmail) {
            openEmailCheckModal({
                title: 'Внимание!',
                text: 'Укажите почту, на которую необходимо отправить контент',
                onCloseButtonText: 'Пропустить',
                okButtonText: 'Указать',
                onCancelButtonClick: (data) => {
                    handlePayMethod(data)
                },
                onOkButtonClick: closeModal,
                payload: data

            })
            return
        }

        await handlePayMethod(data)
    }

    useEffect(() => {
        if (data?.errorText && !data.salesAvailable) {
            alert('Контент не доступен для продажи!')
        }
    }, [])


    return (
        <div
            className={`${isModalOpen ? 'hidden' : 'block'} max-w-[540px] pb-[200px] overflow-auto w-full m-auto flex flex-row-reverse gap-5 items-start max-md:flex-col max-sm:pb-[200px] max-sm:overflow-auto max-sm:h-screen scrollbar-hide`}>
            <CloseModalButton/>
            <ModalContent
                setIsConditionsChecked={setIsConditionsChecked}
                data={data}
                isUserHasEmail={!!isUserHasEmail}
                onSubmitForm={onSubmitForm}
                isConditionsChecked={isConditionsChecked}
                // setOpenResellModal={setOpenResellModal}
                methods={methods}
            />

            <SbpPaymentModal/>
            <EmailAlertModal/>
            {/*TODO Перепродажа пока убрана*/}
            {/*<QuickLinksResellFormModal*/}
            {/*    edit={{*/}
            {/*        ...data?.quicklink,*/}
            {/*        resellId: createCopyQuickLink(id),*/}
            {/*    }}*/}
            {/*    isOpen={openResellModal}*/}
            {/*    setOpen={setOpenResellModal}*/}
            {/*/>*/}
        </div>
    )
})

export default PublicationPage

