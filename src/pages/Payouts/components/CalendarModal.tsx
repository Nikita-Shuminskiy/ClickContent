import { ModalUI } from '@components/ui/ModalUI'
import { useModal } from '@/contexts/ModalProvider/useModal.ts'
import { ModalKey } from '@/core/types/modal-key.ts'
import { FunctionComponent, memo } from 'react'
import { PayoutCalendarContent } from '@/pages/Payouts/components/PayoutCalendarContent.tsx'


interface IProps {
    totalMoney: number
    startDate: Date
    endDate: Date
    selected: { value: string, text: string }
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
}

export const CalendarModal: FunctionComponent<IProps> = memo(({
                                                                  totalMoney,
                                                                  startDate,
                                                                  endDate,
                                                                  selected,
                                                                  setEndDate,
                                                                  setStartDate
                                                              }) => {

    const { isModalOpen, closeModal } = useModal(ModalKey.PAYOUTS_CALENDAR)

    return (
        <ModalUI
            classNameContainer="bg-[#0E0E0E]"
            isOpen={isModalOpen}
            setOpen={closeModal}
        >
            <PayoutCalendarContent
                totalMoney={totalMoney}
                startDate={startDate}
                endDate={endDate}
                selected={selected}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </ModalUI>
    )
})