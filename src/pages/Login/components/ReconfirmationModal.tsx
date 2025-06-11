import closeIcon from "@assets/images/icons/close-circle.svg";
import { ButtonUI } from "@components/ui/ButtonUI";
import { ModalUI } from "@components/ui/ModalUI";
type ReconfirmationModal = {
  isOpen: boolean;
  onClose: () => void;
  onRepeatAuth: () => void;
};
const ReconfirmationModal = ({
  isOpen,
  onClose,
  onRepeatAuth,
}: ReconfirmationModal) => {
  return (
    <ModalUI isOpen={isOpen} setOpen={onClose}>
      <div className="max-w-[76px] max-h-[76px] w-full h-full mx-auto mb-8 max-sm:max-w-[60px] max-sm:max-h-[60px] max-sm:mb-5">
        <img src={closeIcon} aria-hidden="true" alt="Крестик" />
      </div>
      <div className="mb-8">
        <h3 className="text-[32px] text-center font-bold mb-3 max-sm:text-base">
          Подтвердите телефон
        </h3>
        <p className="text-2xl text-center max-sm:text-sm">
          Мы не смогли подтвердить ваше устройство. Попробуйте заново
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 max-xs:flex-col-reverse">
        <ButtonUI variant="border" type="button" onClick={onClose}>
          Сменить номер
        </ButtonUI>
        <ButtonUI type="button" onClick={onRepeatAuth}>
          Повторить
        </ButtonUI>
      </div>
    </ModalUI>
  );
};

export default ReconfirmationModal;
