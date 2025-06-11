import React from "react";
import { useLocation } from "react-router-dom";
import { ButtonUI } from "./ui/ButtonUI";
import { FakeProgressBar } from "./ui/FakeProgressBarUI/FakeProgressBarUI";
import { ModalUI } from "./ui/ModalUI";

export interface AlertModalProps {
  title?: string;
  text?: string | React.ReactNode;
  maxWidth?: number;
  okButtonText?: React.ReactNode | string;
  onOkButtonClick?: (...params: any) => void;
  image?: string;
  classNameBtnContainer?: string;
  progress?: boolean;
  onCancelButtonClick?: (...params: any) => void;
  onCloseModal?: () => void;
  isOpen?: boolean;
  hasCanselBtn?: boolean;
  hasCloseBtn?: boolean;
  setOpen?: any;
  onCloseButtonText?: string;
  classNameBtnCancel?: string;
  classNameBtnOk?: string;
  classNameModalContainer?: string;
  variantOkButtonText?: "paint" | "transparent" | "border";
  icon?: string;
  dangerouslySetInnerHTML?: boolean;
}

const AlertModal = ({
  title,
  text,
  okButtonText,
  onOkButtonClick,
  progress,
  hasCanselBtn = true,
  onCancelButtonClick,
  isOpen,
  setOpen,
  onCloseModal,
  classNameBtnContainer,
  classNameBtnCancel,
  classNameBtnOk,
  maxWidth,
  classNameModalContainer,
  variantOkButtonText,
  image,
  onCloseButtonText,
  icon,
  dangerouslySetInnerHTML,
}: AlertModalProps) => {
  const location = useLocation();
  return (
    <ModalUI
      classNameContainer={classNameModalContainer}
      hasCloseBtn={false}
      maxWidth={maxWidth}
      isOpen={isOpen}
      setOpen={(boolean) => {
        setOpen?.(boolean);
        onCloseModal?.();
      }}
    >
      {icon && (
        <div className="max-w-[64px] max-h-16 mx-auto mb-4">
          <img className="w-full h-full object-cover" src={icon} alt="icon" />
        </div>
      )}
      {image && (
        <div className="h-[335px] overflow-hidden relative mb-4">
          <img
            className="w-full object-cover object-top rounded-t-[32px]"
            src={image}
            alt="картинка"
          />
        </div>
      )}
      <div className={"flex flex-col gap-[32px] max-sm:gap-3"}>
        <div className={"gap-[32px] flex flex-col max-sm:gap-2"}>
          <h3 className="text-[32px] text-center font-bold max-sm:text-[18px] font-manrope">
            {title}
          </h3>
          {progress && (
            <div className="mb-4 mt-4">
              <FakeProgressBar />
            </div>
          )}
          {dangerouslySetInnerHTML ? (
            <p
              dangerouslySetInnerHTML={{ __html: text }}
              className={`text-2xl text-center max-sm:text-sm font-steppe self-center`}
            />
          ) : (
            <p
              className={`text-2xl text-center max-sm:text-sm font-steppe self-center`}
            >
              {text}
            </p>
          )}
        </div>
        <div
          className={`flex items-center gap-4 justify-center ${
            classNameBtnContainer ? classNameBtnContainer : ""
          }`}
        >
          {location.pathname !== "/" &&
            location.pathname !== "/passport" &&
            hasCanselBtn && (
              <ButtonUI
                variant="border"
                className={`font-manrope ${
                  !okButtonText ? "max-w-[240px]" : ""
                } ${classNameBtnCancel ? classNameBtnCancel : ""}`}
                onClick={() => {
                  onCancelButtonClick?.();
                  onCloseModal?.();
                  setOpen?.(false);
                }}
              >
                {onCloseButtonText || "Отмена"}
              </ButtonUI>
            )}
          {typeof okButtonText === "string" ? (
            <ButtonUI
              variant={variantOkButtonText}
              className={`font-manrope outline-none ${
                !hasCanselBtn ? "max-w-[240px]" : ""
              } ${classNameBtnOk ? classNameBtnOk : ""}`}
              onClick={() => {
                onOkButtonClick?.();
                setOpen?.(false);
              }}
            >
              {okButtonText}
            </ButtonUI>
          ) : (
            okButtonText
          )}
        </div>
      </div>
    </ModalUI>
  );
};

export default AlertModal;
