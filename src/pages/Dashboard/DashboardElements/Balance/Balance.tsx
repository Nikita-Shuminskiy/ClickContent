import { PaymentActionButton } from "./components/PaymentActionButton";
import { CommissionInfo } from "./components/CommissionInfo";
import { BalanceInfo } from "./components/BalanceInfo";
import { BalanceDetails } from "./components/BalanceDetails";
import { PassportButton } from "./components/PassportButton";

const Balance = () => {
  return (
    <div className="w-full overflow-hidden p-10 rounded-[32px] bg-[#141414] max-sm:p-8 max-xs:p-6">
      <BalanceInfo />
      {/*           <CommissionInfo/>*/}
      <div className="flex items-center justify-between gap-5 max-xs:flex-col max-xs:items-start">
        <BalanceDetails />
        <div className="max-w-[260px] max-xs:max-w-full w-full">
          <PassportButton />
          <PaymentActionButton />
        </div>
      </div>
    </div>
  );
};

export default Balance;
