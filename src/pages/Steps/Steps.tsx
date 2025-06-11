import copyIcon from "@/assets/images/icons/copy-step.svg";
import stepsDecor1 from "@/assets/images/icons/steps-decor1.svg";
import {ButtonUI} from "@/components/ui/ButtonUI";
import {InputUI} from "@/components/ui/InputUI";
import {ModalUI} from "@/components/ui/ModalUI";
import {SuccessModalUI} from "@/components/ui/SuccessModalUI";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import QuickLinksFormModal from "@/pages/Quicklinks/components/Forms/QuickLinksFormModal";
import QuickLinksSuccesModal from "@/pages/Quicklinks/components/Forms/QuickLinksSuccesModal";
import UserService from "@/OLD_services/UserService";
import {useUserInfoContext} from "@/contexts/UserProvider.tsx";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import {IQuickLinkDto} from "@/data-contracts.ts";

const Steps = () => {
    const {
        isNotPassport,
    } = useUserInfoContext();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [stateStepsModal, setStateStepsModal] = useState(false);
    const [stateLinkModal, setStateLinkModal] = useState(false);
    const [stateQuickLinksModal, setStateQuickLinksModal] = useState(false);
    const [stateDonateModal, setStateDonateModal] = useState(false);
    const [stateSuccessModal, setStateSuccessModal] = useState(false);

    /* цели */
    const [stateTargetLinkSuccess, setStateTargetLinkSuccess] = useState(false);
    const [aim, setAim] = useState(null);

    /* быстрые ссылки */
    const [stateQuickLinkSuccess, setStateQuickLinkSuccess] = useState(false);
    const [quickLink, setQuickLink] = useState<IQuickLinkDto>();

    /* алерты */
    const [alertModal, setAlertModal] = useState(false);
    const [linkType, setLinkType] = useState("");
    useEffect(() => {
        if (currentStep === 1) {
            setStateStepsModal(true);
        }
    }, []);

    useEffect(() => {
        if (
            !stateStepsModal &&
            !stateDonateModal &&
            !stateLinkModal &&
            !stateQuickLinksModal &&
            !stateQuickLinkSuccess &&
            !stateTargetLinkSuccess &&
            !stateSuccessModal &&
            currentStep !== 1
        ) {
            setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
            if (currentStep - 1 === 1) {
                setStateStepsModal(true);
            }
        }
    }, [
        stateStepsModal,
        stateDonateModal,
        stateQuickLinksModal,
        stateLinkModal,
        stateQuickLinkSuccess,
        stateTargetLinkSuccess,
        stateSuccessModal,
        currentStep,
    ]);

    useEffect(() => {
        if (
            !stateTargetLinkSuccess &&
            !stateQuickLinkSuccess &&
            !stateSuccessModal &&
            currentStep === 3
        ) {
            navigate(isNotPassport ? "/passport" : "/dashboard");
        }
    }, [stateTargetLinkSuccess, stateQuickLinkSuccess, stateSuccessModal]);

    return (
        <>
            <StepsModal
                isOpen={stateStepsModal}
                stateStepModal={stateStepsModal}
                currentStep={currentStep}
                setOpen={setStateStepsModal}
                setOpenLink={setStateLinkModal}
                setOpenQuicklinks={setStateQuickLinksModal}
                setOpenDonate={setStateDonateModal}
                setCurrentStep={setCurrentStep}
            />

            {/* цели //Todo пока не удаляем блоки, связанные с целями */}

            {/*  <TargetLinksFormModal
        edit={null}
        step
        isOpen={stateLinkModal && currentStep == 2}
        currentStep={currentStep}
        setStateStepsModal={setStateStepsModal}
        setCurrentStep={setCurrentStep}
        setOpen={setStateLinkModal}
        onSuccess={(edited, created) => {
          setAim(edited);
          setStateTargetLinkSuccess(true);
          if (edited?.isCreateAds) {
            setAlertModal(edited?.isCreateAds);
            setLinkType("aim");
          } else {
            setCurrentStep(3);
          }
        }}
      />
      <TargetLinksSuccesModal
        edit={aim}
        isOpen={stateTargetLinkSuccess && currentStep === 3}
        setOpen={setStateTargetLinkSuccess}
      />*/}

            {/* быстрые ссылки */}

            <QuickLinksFormModal
                edit={null}
                step
                hasResell
                currentStep={currentStep}
                setStateStepsModal={setStateStepsModal}
                setCurrentStep={setCurrentStep}
                isOpen={stateQuickLinksModal && currentStep == 2}
                setOpen={setStateQuickLinksModal}
                onSuccess={(edited, created) => {
                    setQuickLink(edited);
                    setStateQuickLinkSuccess(true);
                    if (edited?.isCreateAds) {
                        setAlertModal(edited?.isCreateAds);
                        setLinkType("quicklink");
                    } else {
                        setCurrentStep(3);
                    }
                }}
                onSuccessResell={(edited, created) => {
                    if (created) {
                        setQuickLink(edited);
                        setStateQuickLinkSuccess(true);
                        setCurrentStep(3);
                    }
                }}
            />
            <QuickLinksSuccesModal
                edit={quickLink}
                isOpen={stateQuickLinkSuccess && currentStep === 3}
                setOpen={setStateQuickLinkSuccess}
            />

            {/*<DonateModal
        isOpen={stateDonateModal && currentStep == 2}
        onSuccess={() => {
          setStateSuccessModal(true);
          setCurrentStep(3);
        }}
        setOpen={setStateDonateModal}
      />*/}
            <SuccessModal
                isOpen={stateSuccessModal && currentStep === 3}
                setOpen={setStateSuccessModal}
            />
            {/*   <AlertModal
        onCloseModal={() => setCurrentStep(3)}
        okButtonText='Подробнее'
        isOpen={alertModal}
        setOpen={setAlertModal}
        title='Использование рекламы'
        text='Подвяжите свою ссылку к контрагенту или договору для рекламы'
        onOkButtonClick={() => {
          navigate(
            `/ads?step=2&linkType=${linkType}&linkId=${
              linkType === "quicklink" ? quickLink?.id : aim?.id
            }`,
          );
        }}
      />*/}
        </>
    );
};

const StepsModal = ({
                        isOpen,
                        setOpen,
                        setOpenLink,
                        setOpenDonate,
                        setOpenQuicklinks,
                        setCurrentStep,
                        stateStepModal,
                        currentStep,
                    }) => {
    const navigate = useNavigate();

    const handleOpenLinkModal = () => {
        setOpenLink(true);
        setCurrentStep(2);
        setOpen(false);
    };

    const handleOpenDonateModal = () => {
        setOpenDonate(true);
        setCurrentStep(2);
        setOpen(false);
    };

    const handleOpenQuicklinksModal = () => {
        setOpenQuicklinks(true);
        setCurrentStep(2);
        setOpen(false);
    };

    const handleCloseStepModal = () => {
        if (stateStepModal && currentStep === 1) {
            navigate("/dashboard");
        }
    };

    return (
        <ModalUI isOpen={isOpen} setOpen={handleCloseStepModal} maxWidth={700}>
            <div className='mb-8'>
                <h3 className='text-[32px] text-center font-bold mb-3 max-sm:text-base'>
                    Шаг 1
                </h3>
                {/* <p className='text-2xl mb-8 max-w-md mx-auto text-center max-sm:text-sm'>
          Что вы хотите создать?
        </p>*/}
            </div>
            <ul className='flex justify-center'>
                {/*grid grid-cols-1 gap-4 max-sm:grid-cols-2 max-xs:grid-cols-1 todo targetLinks - donates*/}
                <li className='flex justify-center'>
                    <div
                        className='min-w-[200px] w-full max-w-[60%]  min-h-[400px] p-6 rounded-[32px] flex flex-col gap-5 justify-between bg-[#1B1B1B] relative overflow-hidden hover:opacity-50 transition-opacity cursor-pointer max-sm:min-h-[280px]'>
                        <button
                            className='w-full h-full absolute bg-transparent cursor-pointer top-0 right-0 bottom-0 left-0 z-10'
                            aria-label='Открыть шаг'
                            onClick={handleOpenQuicklinksModal}
                        ></button>
                        <div className='w-full h-full absolute right-0 bottom-0'>
                            <img
                                className='w-full h-full object-cover'
                                src={stepsDecor1}
                                aria-hidden='true'
                                alt='decor'
                            />
                        </div>
                        <div className='w-[52px] h-[52px] flex-shrink-0 bg-white/10 p-[6px] rounded-2xl'>
                            <img
                                className='w-full h-full object-cover'
                                src={copyIcon}
                                aria-hidden='true'
                                alt='Иконка'
                            />
                        </div>
                        <div>
                            <h3 className='text-4xl font-semibold mb-[10px] max-md:text-[28px] max-sm:text-2xl'>
                                Ссылка на покупку контента
                            </h3>
                            <p className='text-xs max-w-[210px]'>
                                Загрузите контент, который хотите продать и разместите ссылку на
                                покупку на вашей платформе
                            </p>
                        </div>
                    </div>
                </li>
                {/* todo comment donates  target links <li>
          <div className='w-full min-h-[400px] p-6 rounded-[32px] flex flex-col gap-5 justify-between bg-[#1B1B1B] relative overflow-hidden hover:opacity-50 transition-opacity cursor-pointer max-sm:min-h-[280px]'>
            <button
              className='w-full h-full absolute bg-transparent cursor-pointer top-0 right-0 bottom-0 left-0 z-10'
              aria-label='Открыть шаг'
              onClick={handleOpenDonateModal}
            ></button>
            <div className='w-full h-full absolute right-0 bottom-0'>
              <img
                className='w-full h-full object-cover'
                src={stepsDecor2}
                aria-hidden='true'
                alt='decor'
              />
            </div>
            <div className='w-[52px] h-[52px] flex-shrink-0 bg-white/10 p-[6px] rounded-2xl'>
              <img
                className='w-full h-full object-cover'
                src={coinsIcon}
                aria-hidden='true'
                alt='Иконка'
              />
            </div>
            <div>
              <h3 className='text-4xl font-semibold mb-[10px] max-md:text-[28px] max-sm:text-2xl'>
                Ссылка для приема кликсов
              </h3>
              <p className='text-xs max-w-[210px]'>
                Настройте ссылку для приема кликсов, разместите её на вашей
                платформе для получения пожертвований
              </p>
            </div>
          </div>
        </li>
        <li className='max-sm:col-span-full'>
          <div className='w-full min-h-[400px] p-6 rounded-[32px] flex flex-col gap-5 justify-between bg-[#1B1B1B] relative overflow-hidden hover:opacity-50 transition-opacity cursor-pointer max-sm:min-h-[280px]'>
            <button
              className='w-full h-full absolute bg-transparent cursor-pointer top-0 right-0 bottom-0 left-0 z-10'
              aria-label='Открыть шаг'
              onClick={handleOpenLinkModal}
            ></button>
            <div className='w-full h-full absolute right-0 bottom-0'>
              <img
                className='w-full h-full object-cover'
                src={stepsDecor3}
                aria-hidden='true'
                alt='decor'
              />
            </div>
            <div className='w-[52px] flex-shrink-0 h-[52px] bg-white/10 p-[6px] rounded-2xl'>
              <img
                className='w-full h-full object-cover'
                src={clockIcon}
                aria-hidden='true'
                alt='Иконка'
              />
            </div>
            <div>
              <h3 className='text-4xl font-semibold mb-[10px] max-md:text-[28px] max-sm:text-2xl'>
                Кликсы на выполнение цели
              </h3>
              <p className='text-xs max-w-[210px]'>
                Настройте ссылку на цель. Укажите, какое количество кликсов вам
                необходимо для достижения цели
              </p>
            </div>
          </div>
        </li>*/}
            </ul>
        </ModalUI>
    );
};

const DonateModal = ({isOpen, setOpen, onSuccess}) => {
    const {data: user} = useGetUser()
    const [donatePrice, setDonatePrice] = useState(null);
    const [thanksText, setThanksText] = useState(null);
    const [priceError, setPriceError] = useState('');


// todo
    /* useEffect(() => {
       InfoService.GetByNickname(user.nickName)
         .then((json) => {
           setDonatePrice(json.data.amount);
           setThanksText(json.data.thanksText);
         })
         .catch((e) => console.error(e));
     }, []);*/

    const saveDonate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const price = parseFloat(donatePrice);
        if (price < 39) {
            setPriceError(
                "Минимальная сумма 39 ₽",
            );
            return;
        }
        if (price > 600000) {
            setPriceError(
                "Максимальная сумма 600 000 ₽",
            );
            return;
        }
        UserService.editDonate(price, thanksText)
            .then((json) => {
                // setOpen(false);
                onSuccess?.();
            })
            .catch((e) => console.error(e));
    };

    const handlePrevStep = () => {
        setOpen(false);
    };

    return (
        <ModalUI isOpen={isOpen} setOpen={setOpen}>
            <div className='mb-8'>
                <h3 className='text-[32px] text-center font-bold mb-3 max-sm:text-base'>
                    Шаг 2
                </h3>
                <p className='text-2xl text-center max-sm:text-sm'>
                    Установить стоимость доната
                </p>
            </div>
            <form onSubmit={saveDonate}>
                <div className='w-full flex flex-col gap-4 mb-8'>
                    <InputUI
                        error={priceError}
                        hasPopover={!!priceError}
                        label='Укажите стоимость доната'
                        placeholder='Укажите стоимость доната'
                        value={donatePrice}
                        onInput={(e) => {
                            setPriceError('')
                            setDonatePrice(e.target.value)
                        }}
                    />
                    <InputUI
                        label='Благодарственный текст'
                        placeholder='Благодарственный текст'
                        value={thanksText}
                        onInput={(e) => setThanksText(e.target.value)}
                    />
                </div>
                <div className='flex items-center justify-between gap-4 max-xs:flex-col-reverse'>
                    <ButtonUI variant='border' type='button' onClick={handlePrevStep}>
                        Назад
                    </ButtonUI>
                    <ButtonUI disabled={!!priceError} type='submit'>Установить</ButtonUI>
                </div>
            </form>
        </ModalUI>
    );
};

const SuccessModal = ({isOpen, setOpen}) => {
    const user = useGetUser().data

    return (
        <SuccessModalUI
            copyLink={`https://clickcontent.eu/d/${user?.nickName?.toLowerCase()}`}
            isOpen={isOpen}
            setOpen={setOpen}
        />
    );
};

export default Steps;
