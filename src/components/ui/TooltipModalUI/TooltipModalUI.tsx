import questIcon from "@/assets/images/icons/quest.svg";
import AlertModal, { AlertModalProps } from "@/components/AlertModal";
import { useState } from "react";

interface TooltipModalUIProps
  extends Omit<AlertModalProps, "isOpen" | "setOpen"> {
  children: React.ReactNode;
  hasImage?: boolean;
}

const TooltipModalUI = ({
  children,
  hasImage = true,
  ...rest
}: TooltipModalUIProps) => {
  const [stateAlertModal, setStateAlertModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {hasImage && children}
        <button
          className={`cursor-pointer ${
            hasImage ? "flex-shrink-0 w-5 h-5" : ""
          }`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setStateAlertModal(true);
          }}
        >
          {hasImage ? (
            <img className="w-full h-full" src={questIcon} alt="Вопрос" />
          ) : (
            children
          )}
        </button>
      </div>
      <AlertModal
        isOpen={stateAlertModal}
        setOpen={setStateAlertModal}
        {...rest}
      />
    </>
  );
};

export default TooltipModalUI;
