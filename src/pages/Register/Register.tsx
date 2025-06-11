/*
import phone from "@/assets/images/all-img/app-phone.png";
import bgLand from "@/assets/images/all-img/bg-land.jpg";
import closeIcon from "@/assets/images/icons/close-white.svg";
import tinkoffId from "@/assets/images/icons/tinkoffid.svg";
import { ButtonUI } from "@/common/ui/ButtonUI";
import { CheckboxUI } from "@/common/ui/CheckboxUI";
import InputMaskUi from "@common/ui/InputMaskUI/InputMaskUI";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmMobileModal from "../../common/mobileid/ConfirmMobileModal";
import ReconfirmationModal from "../../common/mobileid/ReconfirmationModal";
import { handleMobileId, handleTinkoffId } from "../../helpers/AuthFunctions";
import {useUserInfoContext} from "@/contexts/UserProvider.tsx";

const RegisterPage = () => {
  const { onSaveUser } = useUserInfoContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isFromPayment = location?.state?.fromPayment;
  const [number, setNumber] = useState("");
  const [checked, setChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stateReconfirmationModal, setStateReconfirmationModal] =
    useState(false);
  const [stateConfirmMobileIDModal, setStateConfirmMobileIDModall] =
    useState(false);
  const [tick, setTick] = useState(60);

  const handlePrevPage = () => {
    navigate(-1);
  };
  const onClickAuthHandler = () => {
    event.preventDefault();
    if (!checked) {
      alert("Примите условия сервиса!");
      return;
    }
/!*    handleMobileId(
      number,
      navigate,
      (isProcessing) => {
        setIsProcessing(isProcessing);
        if (isProcessing) {
          setStateConfirmMobileIDModall(true);
        } else {
          setStateConfirmMobileIDModall(false);
          setStateReconfirmationModal(true);
        }
      },
      (tick) => setTick(tick),
      isFromPayment,
        (user) => onSaveUser(user)
    );*!/
  };
  return (
    <>
      <section>
        <h2 className='sr-only'>Страница Логина</h2>
        <div className='fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={bgLand}
            aria-hidden='true'
            alt='Фон'
          />
        </div>
        <div className='container h-screen flex'>
          <div className='max-w-[1100px] w-full m-auto pt-5 pb-10'>
            <button
              className='block w-8 h-8 ml-auto mb-4 hover:opacity-50 transition-opacity'
              onClick={handlePrevPage}
            >
              <img
                className='w-full h-full object-cover'
                src={closeIcon}
                alt='Закрыть'
              />
            </button>
            <div className='bg-[#141414] py-10 px-20 text-white rounded-[35px] flex items-center gap-5 max-md:p-10 relative'>
              <div className='w-2/4 flex justify-center max-sm:hidden'>
                <div className='h-full absolute top-0 w-[40%] left-[6%] scale-110'>
                  <img
                    className='w-full h-full object-contain'
                    src={phone}
                    alt='Приожение'
                  />
                </div>
              </div>
              <div className='grow max-w-[500px] w-[50%] py-8 max-sm:max-w-full ml-auto max-sm:p-0'>
                <h3 className='text-3xl font-bold mb-8 max-sm:text-2xl max-sm:mb-4 max-xs:text-xl'>
                  Регистрируйтесь на сервисе ClickContent и получите скидку на
                  покупку контента
                </h3>
                <p className='text-sm text-white/60 mb-8'>
                  Для регистрации на сервисе введите номер телефона, или
                  пройдите автоматическую регистрацию через Tinkoff ID
                </p>
                <form action='#'>
                  <div className='mb-8'>
                    <InputMaskUi
                      className='w-full py-[30px] px-5 rounded-2xl text-sm bg-white/10 text-white leading-tight placeholder:text-white/30'
                      mask='+7 (999) 999-99-99'
                      onChange={(e) => setNumber(e.target.value)}
                      value={number}
                      placeholder='Номер телефона'
                      label='Номер телефона'
                      required
                    />
                    <CheckboxUI onChangeChecked={(e) => setChecked(e)}>
                      Я согласен с{" "}
                      <Link className='underline' to='/terms'>
                        условиями
                      </Link>{" "}
                      сервиса
                    </CheckboxUI>
                  </div>
                  <div className='flex items-center gap-4 flex-wrap'>
                    <div className='flex-grow'>
                      <button
                        className='w-full p-5 rounded-[60px] text-base text-white/30 flex justify-center text-center bg-[#FFDD2D] max-xs:p-3'
                        disabled={isProcessing}
                        onClick={handleTinkoffId}
                      >
                        <div className='flex flex-row items-center'>
                          <span className='text-[#1E1E1E] font-bold text-sm max-lg:text-sm max-sm:text-xs'>
                            Войти с Tinkoff
                          </span>
                          <div className='ml-2 w-[37] h-[20]'>
                            <img
                              className='w-full h-full object-cover'
                              src={tinkoffId}
                              alt='Тинькофф ID'
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className='flex-grow'>
                      <ButtonUI
                        // disabled={!(number.length > 0 && checked)}
                        isLoading={isProcessing}
                        onClick={onClickAuthHandler}
                      >
                        Зарегистрироваться
                      </ButtonUI>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReconfirmationModal
        isOpen={stateReconfirmationModal}
        onRepeatAuth={onClickAuthHandler}
        onClose={() => setStateReconfirmationModal(false)}
      />
      <ConfirmMobileModal
        tick={tick}
        isOpen={stateConfirmMobileIDModal}
        setOpen={setStateConfirmMobileIDModall}
      />
    </>
  );
};

export default RegisterPage;
*/
