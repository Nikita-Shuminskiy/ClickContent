import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useCallback, useRef } from "react";
import { Icon } from "@components/ui/icon/icon.tsx";

interface ModalUIProps {
  isOpen: boolean;
  classNameContainer?: string;
  hasCloseBtn?: boolean;
  isFullScreen?: boolean;
  isBottomScreen?: boolean;
  isTextLeft?: boolean;
  subtitle?: string;
  setOpen: (open: boolean) => void;
  maxWidth?: number;
  children: React.ReactNode;
  title?: string;
  modalBottom?: React.ReactNode;
  modalTop?: React.ReactNode;
  wrapperClassName?: string;
  modalBottomClassName?: string;
  dialogPanelClassname?: string;
  preventCloseOnOverlayClick?: boolean;
}

const ModalUI = ({
  isOpen,
  isTextLeft = false,
  subtitle,
  setOpen,
  children,
  maxWidth,
  isFullScreen = false,
  wrapperClassName,
  title,
  modalTop,
  modalBottom,
  isBottomScreen,
  classNameContainer,
  hasCloseBtn = true,
  modalBottomClassName,
  dialogPanelClassname,
  preventCloseOnOverlayClick = false,
}: ModalUIProps) => {
  const cancelButtonRef = useRef(null);

  const handleClose = useCallback(
    (open: boolean) => {
      !preventCloseOnOverlayClick && setOpen(open);
    },
    [preventCloseOnOverlayClick, setOpen],
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="block relative z-[999] min-h-screen"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        {!isFullScreen && (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-md bg-opacity-75 transition-opacity" />
          </Transition.Child>
        )}

        <div
          id="modal-container"
          className={`fixed inset-0 z-[999] w-screen overflow-y-auto ${
            isFullScreen && "bg-[#0E0E0E]"
          }`}
        >
          <div
            className={classNames("flex", "min-h-full", "justify-center", {
              "!items-start": isFullScreen,
              "items-end": isBottomScreen,
              "items-center": !isBottomScreen && !isFullScreen,
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform transition-all w-full ${
                  isFullScreen ? "max-sm:min-h-[100vh]" : ""
                } ${dialogPanelClassname ?? ""}`}
                style={{ maxWidth: maxWidth ? maxWidth : 711 }}
              >
                {isFullScreen ? (
                  <div className={"px-[20px] pt-[31px]"}>
                    <button
                      className="w-[24px] h-[24px] z-10 outline-none"
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      <Icon
                        name={"arrowBack"}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                ) : (
                  hasCloseBtn && (
                    <button
                      type="button"
                      className={`flex w-9 h-9 ml-auto mb-[10px] outline-none`}
                      onClick={() => setOpen(false)}
                      aria-label="Закрыть модальное окно"
                    >
                      <Icon
                        name={"closeIcon"}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                )}
                <div
                  className={`w-full flex flex-col gap-3 rounded-[32px] max-sm:rounded-[35px] ${
                    classNameContainer ? classNameContainer : ""
                  } `}
                >
                  <div
                    className={`w-full p-[60px] bg-[#141414] max-sm:p-[20px] rounded-[32px] max-xs:p-[20px] max-sm:rounded-[35px] ${
                      isFullScreen ? "bg-transparent" : ""
                    } ${wrapperClassName ?? ""}`}
                  >
                    {modalTop && <div className="mb-8">{modalTop}</div>}
                    {title && (
                      <h3
                        className={`text-[32px] ${
                          isTextLeft ? "text-left" : "text-center"
                        } font-bold mb-4 max-sm:text-[24px]`}
                      >
                        {title}
                      </h3>
                    )}
                    {subtitle && <p className="text-sm mb-6">{subtitle}</p>}
                    {children}
                  </div>
                  {modalBottom && (
                    <div
                      className={
                        modalBottomClassName ? modalBottomClassName : ""
                      }
                    >
                      {modalBottom}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalUI;
