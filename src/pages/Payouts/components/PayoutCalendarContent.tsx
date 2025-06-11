import { FunctionComponent, memo } from 'react'

import PayoutsCircle from './PayoutsCircle'
import PayoutsDatePicker from './PayoutsDatePicker'


interface IProps {
    totalMoney: number
    startDate: Date
    endDate: Date
    selected: { value: string, text: string }
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
    classname?: string
}

export const PayoutCalendarContent: FunctionComponent<IProps> = memo(({
                                                                          totalMoney,
                                                                          startDate,
                                                                          endDate,
                                                                          selected,
                                                                          setEndDate,
                                                                          setStartDate,
                                                                          classname
                                                                      }) => {
    return (
        <div
            className={`${classname ? classname : 'flex flex-col items-center gap-8 rounded-[30px] max-md:-order-1 max-md:flex-row max-sm:flex-col'}`}>
            <PayoutsCircle
                totalMoney={totalMoney}
                endDate={endDate}
                selected={selected}
                startDate={startDate}
            />
            <PayoutsDatePicker
                endDate={endDate}
                selected={selected}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                startDate={startDate}
            />
        </div>
    )
})
