import { FunctionComponent, memo } from "react";
import { UnlinkPaymentCardModal } from "./UnlinkPaymentCardModal.tsx";
import QuickLinksInfoModal from "@/pages/Quicklinks/components/Forms/QuickLinksInfoModal.tsx";
import TargetLinksInfoModal from "@/pages/Targetlinks/components/TargetInfoModal.tsx";
import { CalendarModal } from "@/pages/Payouts/components/CalendarModal.tsx";

interface IProps {
  // selectedAim: any
  // stateTargetLinksInfoModal: boolean
  // setStateTargetLinksInfoModal: any
  totalMoney: number;
  startDate: Date;
  endDate: Date;
  selected: { value: string; text: string };
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  classname?: string;
}

export const Modals: FunctionComponent<IProps> = memo(
  ({
    // selectedAim,
    // stateTargetLinksInfoModal,
    // setStateTargetLinksInfoModal,
    totalMoney,
    startDate,
    endDate,
    selected,
    setEndDate,
    setStartDate,
  }) => {
    return (
      <>
        <UnlinkPaymentCardModal />
        <QuickLinksInfoModal />

        {/*<TargetLinksInfoModal*/}
        {/*    edit={selectedAim}*/}
        {/*    isOpen={stateTargetLinksInfoModal}*/}
        {/*    setOpen={setStateTargetLinksInfoModal}*/}
        {/*/>*/}
        <CalendarModal
          totalMoney={totalMoney}
          startDate={startDate}
          endDate={endDate}
          selected={selected}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </>
    );
  },
);
