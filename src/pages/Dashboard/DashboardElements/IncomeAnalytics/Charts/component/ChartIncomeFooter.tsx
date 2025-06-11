import React from 'react';
import {getCorrectPrice} from "@/helpers/NumberFormatter.ts";

const ChartIncomeFooter = ({data}) => {
    return (
        <div>
            <span
                className='block max-xs:text-base max-sm:text-2xl text-center max-xs:text-left text-[44px] font-bold mb-4 max-xs:mb-2 max-lg:text-4xl'>
                   {data && getCorrectPrice(+(data?.quicklinks + data?.payouts).toFixed(2))}
            </span>

            <div
                className='inline-flex flex-col gap-3 py-3 px-6 max-xs:p-2 max-xs:gap-2 bg-white/10 rounded-2xl max-xs:text-[10px] max-sm:text-sm text-base'>
                <div className='inline-flex items-center gap-2'>
                    <span className='w-3 h-3 flex-shrink-0 rounded-[50%] bg-[#EEADFF]'></span>
                    Мои выплаты
                </div>

                <div className='inline-flex items-center gap-2'>
                    <span className='w-3 h-3 flex-shrink-0 rounded-[50%] bg-[#93ABFB]'></span>
                    Платный контент
                </div>
            </div>
        </div>
    );
};

export default ChartIncomeFooter;
