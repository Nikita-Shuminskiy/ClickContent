import { ru } from 'date-fns/locale'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './payouts-calendar.scss'

export default function PayoutsDatePicker({ startDate, setStartDate, endDate, setEndDate, selected }) {

    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }
    registerLocale("ru", ru)
    return (
        <div className="rounded-3xl overflow-hidden flex justify-center items-center">
            <DatePicker
                calendarClassName={selected.value === "payouts" ? "payouts" : ""}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                locale="ru"
                maxDate={new Date()}
            />
        </div>
    )
}
