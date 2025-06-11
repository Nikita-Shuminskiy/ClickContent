import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import { formatDate } from "@/helpers/Datetimeutils.ts";

export default function PayoutsCircle({
                                          selected,
                                          totalMoney,
                                          startDate,
                                          endDate,
                                      }) {
    return (
        <div
            className={ `bg-gradient-to-r ${
                selected.value === "incoming"
                    ? "from-[#a9bcfc] to-[#856ced]"
                    : "from-[#67B26F] to-[#4CA2CD]"
            } mx-auto rounded-full flex items-center justify-center p-4 w-[20vw] h-[20vw] min-w-[180px] min-h-[180px] max-w-[300px] max-h-[300px] max-md:w-[30vw] max-md:h-[30vw]` }
        >
            <div className='flex flex-col gap-2 justify-center pt-10'>
        <span className='text-white font-bold text-center text-2xl text-[clamp(1.25rem,_1.1rem_+_0.75vw,_24px)]'>
          { totalMoney ? `+ ${ getCorrectPrice(+totalMoney) }` : '' }
        </span>
                <div className='flex flex-col text-white/70 text-base max-xs:text-xs text-center'>
                    <span>Период</span>
                    { startDate != null && endDate != null && (
                        <time data-time='04.08-08.08'>
                            { formatDate(startDate.toString()).slice(0, -5) } -{ " " }
                            { formatDate(endDate.toString()).slice(0, -5) }
                        </time>
                    ) }
                    { startDate == null || (endDate == null && <>Выберите</>) }
                </div>
            </div>
        </div>
    );
}
