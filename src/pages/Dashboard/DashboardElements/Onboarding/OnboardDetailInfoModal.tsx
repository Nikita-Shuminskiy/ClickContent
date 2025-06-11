import React, { Fragment, memo, useState } from "react";
import arrowDefault from "@assets/images/icons/arrow-default.svg";
import { Dialog, Transition } from "@headlessui/react";
import closeIcon from "@assets/images/icons/close-white.svg";
import applyIcon from "@assets/images/icons/apply-land.svg";
import { OnboardingModalInfo } from "@/constants/onboarding.ts";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import { ButtonUI } from '@/components/ui/ButtonUI';
import {
  FooterPanelProps,
  OnboardDetailInfoModalProps,
  StepViewProps
} from "@/pages/Dashboard/DashboardElements/Onboarding/types.ts";

const OnboardDetailInfoModal = ({
  isOpen,
  onClose,
  from,
  onOpenQuickLinksModal,
}: OnboardDetailInfoModalProps) => {
  const [step, setStep] = useState(1);
  const stepData = OnboardingModalInfo[from][step];

  const {isMobile} = useWindowWidth();
  const stepsLength = Object.keys(OnboardingModalInfo[from]).length - 1;
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="block relative z-[999]"
        aria-label={"модальное окно онбординг"}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-md bg-black/50 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className={`fixed inset-0 z-[999] w-screen overflow-y-auto `}>
          {!isMobile && (
            <div className="flex min-h-full items-center justify-center p-4 max-md:p-6 max-md:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden transition-all">
                  <button
                    type="button"
                    className="flex w-9 h-9 ml-auto mb-[10px] outline-none"
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={closeIcon}
                      alt="Закрыть"
                    />
                  </button>
                  <div className="grid grid-cols-[auto_auto] gap-2 h-full min-h-[434px]">
                    <div
                      style={{ backgroundImage: `url(${stepData.img})` }}
                      className="bg-cover bg-center flex items-end rounded-[32px] max-w-[360px] w-full min-h-[434px]"
                    >
                      <p className="text-[28px] text-start font-bold max-md:text-[18px] text-white p-[22px]">
                        {stepData.imgText}
                      </p>
                    </div>
                    <div className="p-[32px] bg-[#141414] rounded-[32px] max-xs:p-8 flex flex-col justify-between w-[600px] max-md:w-[450px] max-md:p-[20px]">
                      <div>
                        <h3 className="text-[24px] text-start font-bold mb-4 max-md:text-sm">
                          {stepData.title}
                        </h3>
                        <ListRender step={step} stepData={stepData} />
                      </div>
                      <FooterPanel
                        onClose={onClose}
                        stepsLength={stepsLength}
                        onOpenQuickLinksModal={onOpenQuickLinksModal}
                        currStep={step}
                        setStep={setStep}
                        stepData={stepData}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          )}
          {isMobile && (
            <div
              className={`flex w-[100%] h-[100%] overflow-y-auto min-h-[500px]`}
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden transition-all bg-[#141414] w-full flex flex-col`}
              >
                <div
                  style={{
                    backgroundImage: `url(${stepData.mobileImgPatch})`,
                  }}
                  className={`h-full bg-cover bg-center items-center justify-between flex flex-col p-[22px]  min-h-[200px] rounded-[32px]`}
                >
                  <button
                    type="button"
                    className="flex w-9 h-9 ml-auto mb-[10px] bg-[#0000004D] rounded-[16px] outline-none"
                    onClick={onClose}
                    aria-label="Закрыть модальное окно"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={closeIcon}
                      alt="Закрыть"
                    />
                  </button>

                  <div className={"flex flex-col w-[100%]"}>
                    <h3 className="text-[24px] text-start font-bold mb-4 ">
                      {stepData.title}
                    </h3>
                    <ListRender step={step} stepData={stepData} />
                  </div>
                </div>
                <div className={`flex flex-col w-[100%]  bg-[#141414] z-[10]`}>
                  <div className="w-full !p-[20px] max-xs:p-8 flex flex-col justify-between">
                    <FooterPanel
                      isMobile={true}
                      onClose={onClose}
                      onOpenQuickLinksModal={onOpenQuickLinksModal}
                      stepsLength={stepsLength}
                      currStep={step}
                      setStep={setStep}
                      stepData={stepData}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
};
const ListRender = ({ stepData, step }) => {
  return (
    <>
      {Array.isArray(stepData?.body) ? (
        <>
          {stepData.body.map((text, i) => {
            return (
              <div key={i} className={"flex flex-row gap-2 items-center mb-2"}>
                <img
                  className="w-[24px] h-[24px]"
                  src={applyIcon}
                  aria-hidden="true"
                  alt="onboard img"
                />
                <p className={'text-[16px] font-["TTFirsNeue"]'}>{text}</p>
              </div>
            );
          })}
            {
                step !== 3 &&  <div className={"mt-[15px]"}>
                    <p className={'text-[16px] font-["TTFirsNeue"]'}>И многое другое!</p>
                </div>
            }
        </>
      ) : (
        stepData?.body && <p className={'text-[16px] font-["TTFirsNeue"]'}>{stepData?.body}</p>
      )}
    </>
  );
};
const StepView = ({ currStep, stepsLength }: StepViewProps) => {
  const steps = Array.from({ length: stepsLength }, (_, index) => index + 1);
  return (
    <>
      <div className={"flex flex-wrap gap-y-1.5 gap-1"}>
        {steps.map((el, index) => {
          return (
            <div
              key={index}
              className={`${
                currStep >= el ? "bg-[#874AB0]" : "bg-[#1A1A1A]"
              } h-[4px] w-[32px] rounded-[100px]`}
            />
          );
        })}
      </div>
    </>
  );
};
const FooterPanel = ({
  currStep,
  setStep,
  className,
  isMobile,
  onOpenQuickLinksModal,
  stepsLength,
  onClose
}: FooterPanelProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 justify-between h-[60px] ${
        className ? className : ""
      }`}
    >
      {currStep === stepsLength && isMobile ? (
        <ButtonUI
          type="button"
          className="flex w-full h-[51px] outline-none bg-[#874AB0] rounded-[60px] items-center justify-center "
          onClick={onOpenQuickLinksModal}
        >
          <p className={"text-[16px] font-['TTFirsNeue']"}>Создать</p>
        </ButtonUI>
      ) : (
        <>
          <div className={"flex flex-row gap-1 items-center justify-between"}>
            <StepView stepsLength={stepsLength} currStep={currStep} />
          </div>
          <div className={"flex flex-row gap-2 items-end justify-center"}>
            <button
              type="button"
              className="flex w-[52px] h-[52px] outline-none bg-[#FFFFFF0D] rounded-[50%] items-center justify-center"
              onClick={() => {
                if (currStep === 1) return onClose()
                setStep(currStep - 1);
              }}
              aria-label="Prev step"
            >
              <img
                className="w-[24px] h-[24px] rotate-180 object-cover"
                src={arrowDefault}
                aria-label="Prev step"
                alt={"Prev step"}
              />
            </button>
            {currStep === stepsLength && !isMobile ? (
              <button
                type="button"
                className="flex w-[175px] h-[52px] outline-none bg-[#874AB0] rounded-[60px] items-center justify-center max-xs:w-[152px] max-xs:h-[32px]"
                onClick={onOpenQuickLinksModal}
              >
                <p className={"text-[16px] font-['TTFirsNeue']"}>Создать</p>
              </button>
            ) : (
              <button
                type="button"
                className="flex w-[52px] h-[52px] outline-none bg-[#874AB0] rounded-[50%] items-center justify-center "
                onClick={() => {
                  if (currStep === stepsLength) return;
                  setStep(currStep + 1);
                }}
              >
                <img
                  className="w-[24px] h-[24px] object-cover"
                  src={arrowDefault}
                  aria-label="Next step"
                  alt={"Next step"}
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default memo(OnboardDetailInfoModal)


