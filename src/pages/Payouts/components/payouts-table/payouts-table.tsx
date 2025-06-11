import { FunctionComponent, memo } from "react";
import { IPayoutsDto } from "@/data-contracts.ts";
import { formatDate, formatTime } from "@/helpers/Datetimeutils.ts";
import { formatCardByPan } from "@/helpers/cardFormatters.ts";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";

interface IProps {
  payouts: IPayoutsDto[];
}

export const PayoutsTable: FunctionComponent<IProps> = memo(({ payouts }) => {
  return (
    <>
      <div className="grid grid-cols-[0.6fr,_1.2fr,_0.4fr] gap-4 mb-4 pb-3 max-sm:hidden">
        <span className="text-xs text-white/70">Дата</span>
        <span className="text-xs text-white/70">Сообщение</span>
        <span className="text-xs text-white/70 text-right">Сумма</span>
      </div>
      <ul className="grid gap-4">
        {payouts.map((payout, i) => {
          const { payload } = payout;
          const payloadToObj = JSON.parse(payload);
          return (
            <li key={i}>
              <div className="grid grid-cols-[0.6fr,_1.2fr,_0.4fr] gap-4 items-start pb-3 border-b border-solid border-b-white/10 max-sm:grid-cols-[1fr,_0.4fr] max-sm:gap-2 max-sm:items-center">
                <div className="flex items-center gap-3 flex-wrap max-sm:order-1">
                  <span className="text-xs max-xs:text-[10px]">
                    {formatDate(payout.date)}
                  </span>
                  <span className="text-xs max-xs:text-[10px]">
                    {formatTime(payout.date)}
                  </span>
                </div>
                <div className="max-sm:order-5 max-sm:col-span-full">
                  <p className="text-base text-white/70 max-xs:text-[10px] max-xs:leading-[1.4]">
                    {!payloadToObj?.pan
                      ? "Нет данных по карте"
                      : `Выплата ${formatCardByPan(
                          payloadToObj?.pan,
                        ).toLocaleLowerCase()}`}
                  </p>
                </div>
                <div className="text-right max-sm:order-3">
                  <span className="w-full text-base text-right max-xs:font-bold">
                    {getCorrectPrice(payout.payOut)}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
});
