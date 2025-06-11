import { FunctionComponent, memo } from "react";
import { ButtonUI } from "@components/ui/ButtonUI";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user";
import { ModalKey } from "@/core/types/modal-key";
import { useModal } from "@/contexts/ModalProvider/useModal";
import { useGetCanWithdraw } from "@/core/api/api-hooks/finance/use-get-can-withdraw.ts";
import { CardsSheetModal } from "@/pages/CardSheetModal/CardsSheetModal.tsx";

export const PaymentActionButton: FunctionComponent = memo(() => {
  const { openModal: openCardSheet } = useModal(ModalKey.CARDS_SHEET);
  const { openModal: openAddCardModal } = useModal(ModalKey.ADD_CARD);

  const { data: user } = useGetUser();
  const { data: canWithdrawData, isFetching, error } = useGetCanWithdraw();

  const showByAccountType =
    user?.accountType == "Influencer" ||
    user?.accountType == "PassportVerified";
  const actionButtonDisabled =
    user?.cards?.length > 0 && user?.balance?.total / 100 < 1000;

  if (!showByAccountType) {
    return null;
  }

  const isNotCard = user?.cards?.length === 0;

  const btn = (
    <ButtonUI
      className={
        'font-["TTFirsNeue"] max-xs:!py-[12px] !text-[16px] max-xs:!text-xs'
      }
      disabled={actionButtonDisabled}
      onClick={() => {
        if (isNotCard) return openAddCardModal("addCard");
        openCardSheet({
          title: "Выбор карты для вывода средств",
          description:
            "Вы можете вывести денежные средства поочередно на несколько карт",
        });
      }}
    >
      {showByAccountType && isNotCard ? "Привязать карту" : "Вывести средства"}
    </ButtonUI>
  );

  return (
    <>
      {btn}
      {/*   {
                ?  : <PopUpUI buttonRender={btn}>
                    <PopUpFreezeView text={`Вывод денежных средств будет доступен в ближайшее время`}/>
                </PopUpUI>
            }*/}

      <CardsSheetModal />
    </>
  );
});
