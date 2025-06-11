import { FunctionComponent, memo } from "react";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import { Icon } from "@components/ui/icon/icon.tsx";
import sbp from "@assets/images/all-img/sbp.png";

export interface IProps {
  amount?: string;
  handlePay?: () => Promise<void>;
  isPayRejected?: boolean;
  isPending?: boolean;
  onChangeAgreement: (e: any) => void;
  payBySBP: (e: any) => void;
  togglePanelTelegram: () => void;
}

export const Actions: FunctionComponent<IProps> = memo(
  ({
    amount,
    handlePay,
    isPayRejected,
    isPending,
    onChangeAgreement,
    payBySBP,

    togglePanelTelegram,
  }) => {
    return (
      <div className="pt-6 px-6 border-t border-white/10">
        <div className="mb-3">
          <CheckboxUI onChange={onChangeAgreement}>
            <p className="font-normal text-[12px] leading-[15.5px] text-[#5F5F5F] max-w-[356px]">
              Я согласен с{" "}
              <a href="/terms" className="underline">
                Условиями использования
              </a>{" "}
              и{" "}
              <a href="/policy" className="underline">
                Политикой конфиденциальности
              </a>{" "}
              сервиса
            </p>
          </CheckboxUI>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row max-md:flex-col gap-[10px] justify-between">
            <ButtonUI
              onClick={handlePay}
              disabled={isPayRejected || isPending}
              className="w-full sm:w-auto"
            >
              Оплатить {amount} руб.
            </ButtonUI>

            <ButtonUI
              variant="muted"
              disabled={isPending}
              onClick={payBySBP}
              className="flex items-center !py-[14px] w-full sm:w-auto"
            >
              <img src={sbp} alt="сбп" className="w-[34px] h-[24px] mr-2" />
              Оплатить через СБП
            </ButtonUI>
          </div>

          <ButtonUI
            className="!bg-[#00B6EC] w-full sm:w-auto"
            onClick={togglePanelTelegram}
            disabled={isPayRejected || isPending}
          >
            <div className="flex flex-row gap-[10px] items-center justify-center">
              <Icon name={"telegramOutlined"} />
              Продолжить в телеграм
            </div>
          </ButtonUI>
        </div>
      </div>
    );
  },
);
