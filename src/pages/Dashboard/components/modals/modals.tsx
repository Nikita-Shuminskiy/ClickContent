import { ModalKey } from '@/core/types/modal-key.ts'

import { ActionNotificationModal } from './components/ActionNotificationModal'
import { FunctionComponent, memo } from 'react'
import { IAimsInfo } from '@/OLD_models/responses/IAimsInfo.ts'
import { AdvertisingMarkingModal } from './components/AdvertisingMarkingModal'
import {IQuickLinkDto} from "@/data-contracts.ts";

interface IProps {
    createLink: "aim" | "quicklink" | null
    selectedAim?: IAimsInfo
    selectedQuicklink?: IQuickLinkDto
}

export const Modals: FunctionComponent<IProps> = memo(({ createLink, selectedAim, selectedQuicklink }) => {
    return (
        <>
            <ActionNotificationModal modalKey={ModalKey.WITHDRAW}/>
            <ActionNotificationModal modalKey={ModalKey.AIM_REMOVE}/>
            <ActionNotificationModal modalKey={ModalKey.QUICK_LINK_REMOVE}/>
            <AdvertisingMarkingModal
                createLink={createLink}
                selectedAim={selectedAim}
                selectedQuicklink={selectedQuicklink}
            />
        </>
    )
})
