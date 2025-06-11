import { Dispatch, memo, MouseEvent, SetStateAction } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { Extra, IQuickLinkDto } from "@/data-contracts";
// import { usePayForQuickLink } from '@/core/api/api-hooks/finance/use-pay-for-quicklink'
import { CheckboxToggleUI } from "@components/ui/CheckboxToggleUI";
import { FormInputUI, InputUI } from "@components/ui/InputUI";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import giftIcon from "@assets/images/icons/gift.svg";
import coins from "@assets/images/all-img/coins.png";
import lock from "@assets/images/all-img/lock.png";
import mail from "@assets/images/all-img/mail.png";
import { useOldPayForQuickLink } from "@/core/api/api-hooks/finance/old-use-pay-for-quicklink.ts";
import OldStorageService from "@/core/service/old-storage-service.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import sbp from "@assets/images/all-img/sbp.png";

type IProps = {
  onSubmitForm: (data: any) => void;
  data?: IQuickLinkDto;
  isMutating?: boolean;
  setIsConditionsChecked?: Dispatch<SetStateAction<boolean>>;
  isConditionsChecked?: boolean;
  isUserHasEmail?: boolean;
};
export const Form = memo(
  ({
    onSubmitForm,
    data,
    setIsConditionsChecked,
    isConditionsChecked,
    isUserHasEmail,
  }: IProps) => {
    const { openModal: openPayModal } = useModal(ModalKey.PAY_WITH_CARD);

    const { handleSubmit, control, getValues } = useFormContext();
    const { openModal: openEmailCheckModal, closeModal } = useModal(
      ModalKey.EMAIL_CHECK,
    );
    // const { shortLinkOrNickname } = useParams()
    const shortLinkOrNickname = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1,
    );

    // TODO старая  платежка
    const { mutateAsync: pay, isPending } = useOldPayForQuickLink();
    // TODO старая  платежка убранор СБП
    const payBySBP = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      OldStorageService.clearPayment();
      if (!isConditionsChecked) {
        alert("Примите условия сервиса!");
        return;
      }
      if (!isUserHasEmail) {
        openEmailCheckModal({
          title: "Внимание!",
          text: "Укажите почту, на которую необходимо отправить контент",
          onCloseButtonText: "Пропустить",
          okButtonText: "Указать",
          onCancelButtonClick: async () => {
            OldStorageService.setPoolingStarting();
            /*await pay({
                        quicklinkId: shortLinkOrNickname,
                        byQr: true,
                        extra: { ...getValues() as Extra }
                    })*/
            openPayModal({
              quicklinkId: shortLinkOrNickname,
              byQr: true,
              extra: { ...(getValues() as Extra) },
            });
          },
          onOkButtonClick: closeModal,
          payload: data,
        });
        return;
      }
      OldStorageService.setPoolingStarting();
      openPayModal({
        quicklinkId: shortLinkOrNickname,
        byQr: true,
        extra: { ...(getValues() as Extra) },
      });
      /* await pay({
             quicklinkId: shortLinkOrNickname,
             byQr: true,
             extra: { ...getValues() as Extra },
         })*/
    };

    const payByTelegram = async (e) => {
      if (!isConditionsChecked) {
        alert("Примите условия сервиса!");
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      OldStorageService.clearPayment();

      window.location.href = `https://t.me/clickcontenteu_bot?start=${data.id}`;
    };
    return (
      <form
        className="w-full flex flex-col gap-[24px]"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="w-full flex flex-col gap-[12px]">
          <span className="text-[14px] font-medium leading-[20px] text-white/30">
            Введите валидную почту, чтобы не потерять оплаченный контент
          </span>
          <FormInputUI
            control={control}
            name="email"
            label="Введите почту для получения"
            placeholder="Введите почту для получения"
            className="h-[52px] py-5"
            startIcon={
              <img className="w-[24px] h-[24px]" src={mail} alt="почта" />
            }
          />
          <div className="flex items-center gap-3">
            <InputUI
              disabled
              placeholder="Покупка"
              label="Покупка"
              value={`${data.contentCount} файл`}
              className="h-[52px] py-5  !opacity-100"
              endIcon={
                <img className="w-[24px] h-[24px]" src={coins} alt="коины" />
              }
            />
            <InputUI
              disabled
              placeholder="Сумма, руб."
              label="Сумма, руб."
              className="h-[52px] py-5 !opacity-100"
              value={data.amount / 100}
              endIcon={
                <img className="w-[24px] h-[24px]" src={lock} alt="замок" />
              }
            />
          </div>
        </div>
        <CheckboxUI onChangeChecked={(e) => setIsConditionsChecked(e)}>
          <span className="text-[12px] leading-[16px] text-[#5F5F5F]">
            Я согласен с{" "}
          </span>
          {/*Todo ссылки на страницы проверить */}
          <Link
            className="underline text-[12px] leading-[16px] text-[#5F5F5F]"
            to="/terms"
          >
            условиями использования
          </Link>{" "}
          <span className="text-[12px] leading-[16px] text-[#5F5F5F]">и </span>
          <Link
            className="underline text-[12px] leading-[16px] text-[#5F5F5F]"
            to="/terms"
          >
            Политикой концеденциальности сервиса
          </Link>
        </CheckboxUI>
        <div className="flex flex-col gap-4">
          {/*              <div className="flex items-center justify-between gap-4 mt-[36px]">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 flex-shrink-0">
                            <img
                                className="w-full h-full"
                                src={giftIcon}
                                alt="Подарок"
                            />
                        </div>
                        <span>Подарок другому человеку</span>
                    </div>
                    <Controller
                        name="isGift"
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <CheckboxToggleUI
                                onChangeChecked={onChange}
                                checked={value}
                                label="Подарок другому человеку"
                            />
                        )}
                    />
                </div>*/}
          <ButtonUI
            variant="muted"
            disabled={isPending || !data.salesAvailable}
            onClick={payBySBP}
            className="flex items-center !py-[14px]"
          >
            <img src={sbp} alt="сбп" className="w-[34px] h-[24px]" />
            Оплатить через СБП
          </ButtonUI>
          <ButtonUI
            variant="muted"
            disabled={isPending || !data.salesAvailable}
            onClick={payByTelegram}
            className="flex items-center !py-[14px]"
          >
            Оплатить через Телеграм
          </ButtonUI>
          <ButtonUI
            isLoading={isPending}
            disabled={!data.salesAvailable}
            type="submit"
            className="!py-[14px]"
          >
            {`Оплатить ${data.amount / 100} руб.`}
          </ButtonUI>
        </div>
      </form>
    );
  },
);
