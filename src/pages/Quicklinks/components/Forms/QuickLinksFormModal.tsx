import {Tab} from "@headlessui/react";
import {Dispatch, SetStateAction} from "react";
import {ModalUI} from "@components/ui/ModalUI";
import QuickLinksForm from "./QuickLinksForm.tsx";
import QuickLinksResellForm from "./QuickLinksResellForm.tsx";
import {useWindowWidth} from "@/hooks/useWindowWidth.ts";
import {IQuickLinkDto} from "@/data-contracts.ts";

interface QuickLinksFormModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess?: (...param: any) => void;
    onSuccessResell?: (...param: any) => void;
    hasResell?: boolean;
    edit?: IQuickLinkDto;
    step?: boolean;
    hasCanselBtn?: boolean;
    currentStep?: number,
    setStateStepsModal?: any,
    setCurrentStep?: any
}

const QuickLinksFormModal = ({
                                 isOpen,
                                 setOpen,
                                 onSuccess,
                                 onSuccessResell,
                                 edit,
                                 step,
                                 hasCanselBtn,
                                 hasResell = false,
                                 currentStep,
                                 setStateStepsModal,
                                 setCurrentStep
                             }: QuickLinksFormModalProps) => {
    const {isMobile} = useWindowWidth()

    return (
        <ModalUI
            isFullScreen={isMobile}
            hasCloseBtn={false}
            classNameContainer={"bg-[#0E0E0E]"}
            isOpen={isOpen}
            setOpen={setOpen}
            maxWidth={800}
        >
            <h3 className="text-[32px] text-left font-bold mb-8 max-sm:text-[24px]">
                {step && "Шаг 2"}
                {edit == null && !step && <>Создание быстрой ссылки</>}
                {edit && <>Редактирование быстрой ссылки</>}
            </h3>
            {hasResell ? (
                <Tab.Group>
                    <Tab.Panels className="!outline-none">
                        <Tab.Panel className="!outline-none">
                            <QuickLinksForm
                                currentStep={currentStep}
                                setStateStepsModal={setStateStepsModal}
                                setCurrentStep={setCurrentStep}
                                setStateQuickLinksModal={setOpen}
                                hasCanselBtn={true}
                                edit={edit}
                                onSuccess={(edited, created) => {
                                    setOpen(false);
                                    onSuccess(edited, created);
                                }}
                            />
                        </Tab.Panel>
                        <Tab.Panel className="!outline-none">
                            <QuickLinksResellForm
                                onSuccess={(edited, created) => {
                                    setOpen(false);
                                    onSuccessResell(edited, created);
                                }}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            ) : (
                <QuickLinksForm
                    onCloseStep={() => setOpen(false)}
                    currentStep={currentStep}
                    setStateStepsModal={setStateStepsModal}
                    setCurrentStep={setCurrentStep}
                    setStateQuickLinksModal={setOpen}
                    edit={edit}
                    hasCanselBtn={true}
                    onSuccess={(edited, created) => {
                        setOpen(false);
                        onSuccess(edited, created);
                    }}
                />
            )}
        </ModalUI>
    );
};

export default QuickLinksFormModal;
