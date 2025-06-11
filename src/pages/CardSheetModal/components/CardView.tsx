import React, { memo } from "react";
import { ICardDto } from "@/data-contracts.ts";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { getOperationWord } from "@/pages/CardSheetModal/components/utils.ts";
import { useGetLimitsByCards } from "@/core/api/api-hooks/finance/use-get-limits-by-cards.ts";

type IProps = {
  card: ICardDto;
  isChosen: boolean;
  onChoseCard: (card: ICardDto | null) => void;
};

const CardView = ({ card, onChoseCard, isChosen }: IProps) => {
  const { data } = useGetLimitsByCards();

  const remainingAmount = Math.floor(
    (data?.maxWithdrawAmountPerCard - card.payout) / 100,
  );
  const remainingOperations =
    data?.maxWithdrawOperationsPerCard - card.operations;

  const isCanWithdraw = remainingAmount > 0 && remainingOperations > 0;

  const paidToday = `Выведено сегодня: ${card.payout / 100} руб, ${
    card.operations
  } ${getOperationWord(card.operations)}`;

  const canWithdrawn = isCanWithdraw
    ? `Доступно к выводу: ${remainingAmount} руб, ${remainingOperations} ${getOperationWord(
        remainingOperations,
      )}`
    : `Лимит на сегодня израсходован`;

  return (
    <div
      className={`rounded-[32px] max-sm:text-[16px]  flex flex-row items-center justify-start gap-[10px] p-[32px] bg-white/5 ${
        !isCanWithdraw ? "opacity-[0.3]" : ""
      }`}
    >
      <CheckboxUI
        disabled={!isCanWithdraw}
        checked={isChosen}
        onChangeChecked={(check) => onChoseCard(check ? card : null)}
      />
      <div className="flex flex-col items-start justify-start gap-[5px]">
        <h6 className={"text-[16px] font-bold font-steppe max-sm:text-[14px] "}>
          {card?.pan} до{" "}
          {card.expDate.slice(0, 2) + "/" + card.expDate.slice(2)}
        </h6>
        <span className={"text-[16px] font-firstNeue max-sm:text-[14px] "}>
          {paidToday}
        </span>
        <span className={"text-[16px] font-firstNeue max-sm:text-[14px] "}>
          {canWithdrawn}
        </span>
      </div>
    </div>
  );
};

export default memo(CardView);
