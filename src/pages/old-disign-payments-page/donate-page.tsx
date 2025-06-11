import { getHasChangeNickName } from "@/helpers/CheckUserNickName.ts";
import StorageService from "@/core/service/storage-service.ts";
import { useState, MouseEvent, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePaymentDonate } from "@/OLD_rest/usePayment.ts";
import { useLoginModalContext } from "@/contexts/LoginModalContext.tsx";
import queryString from "query-string";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFormPersist from "react-hook-form-persist";
import { percentageCollected } from "@/helpers/PercentageCollected.ts";
import closeIcon from "@assets/images/icons/close-white.svg";
import { createMediaLink } from "@/helpers/CreateCopyLinks.ts";
import mockAvatar from "@assets/images/all-img/mockAvatar.png";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import { FormInputUI } from "@components/ui/InputUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { IAimsInfo } from "@/OLD_models/responses/IAimsInfo.ts";
import { CurrencyInput } from "@/pages/Quicklinks/components/CurrencyInput.tsx";
import AlertModal from "@/components/AlertModal";
import { useAuth } from "@/core/api/api-hooks/auth/use-auth.ts";
// import { ListBoxUI.tsx } from '@common/ui/ListBoxUI.tsx'

const DonatePage = ({ data, aimId }) => {
  const hasChangedNickName = useMemo(
    () => getHasChangeNickName(data?.nickname),
    [data?.nickname],
  );
  const isAimAvailable =
    aimId !== undefined && data.aims != null && data.aims?.length > 0;
  const aim = isAimAvailable ? findAim(data.aims, aimId) : null;
  const currentAmount =
    aim?.currentAmount !== undefined && aim?.currentAmount != null
      ? aim.currentAmount
      : 0;
  const settings = StorageService.getSettings();
  const [amount, setAmount] = useState(
    isAimAvailable
      ? (aim.recommendedPayment ?? data.amount ?? settings.minDonate) == 0
        ? (data.amount ?? settings.minDonate) == 0
          ? settings.minDonate
          : data.amount ?? settings.minDonate
        : aim.recommendedPayment ?? data.amount ?? settings.minDonate
      : (data.amount ?? settings.minDonate) == 0
      ? settings.minDonate
      : data.amount ?? settings.minDonate,
  );
  const navigate = useNavigate();
  const isErrorForm =
    amount < settings?.minDonate || amount > settings?.maxDonate;

  // const userCards = StorageService.getCards()

  const [cardId, setCardId] = useState(0);

  const isAuthorized = useAuth();

  const [isConditionsChecked, setIsConditionsChecked] = useState(false);
  const [isFocusedInput, setFocusInput] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const { payDonate, error, isMutating } = usePaymentDonate();
  const { openLoginModal } = useLoginModalContext();
  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openLoginModal(true);
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/\D/g, "");

    setAmount(numericValue);
  };
  const handlePay = async ({
    donatorComment,
    amount,
  }: {
    donatorComment?: string;
    amount?: string;
  }) => {
    // if (!userCards?.length) {
    //     alert("Необходимо добавить банковскую карту")
    //     return
    // }

    if (!isConditionsChecked) {
      setIsAlertModalOpen(true);
      return;
    }
    const transformedAmount = amount?.replace("₽", "").trim();

    // StorageService.setPayment({
    //     type: "donate",
    //     id: data.id,
    //     aimId: isAimAvailable ? aimId : null,
    //     amount: Number(transformedAmount),
    //     nickname: data.nickname,
    //     donatorComment: donatorComment ?? "",
    //     date: new Date(),
    // })
    try {
      let params = queryString.parse(location.search);
      const response = await payDonate({
        userId: parseInt(data.id),
        price: Number(transformedAmount),
        donatorComment: donatorComment ?? "",
        redirectUrl: "https://clickcontent.eu/authorize",
        aimId: isAimAvailable ? aimId : null,
        cardId: cardId,
        utm: params["utm"] !== undefined ? params["utm"] : null,
      });

      if (response.paymentUrl?.length > 0) {
        window.location.replace(response.paymentUrl);
      } else {
        navigate("/authorize?status=success");
      }
      sessionStorage.removeItem("payDonate");
    } catch (error) {
      console.log("error handlePay", error);
      if (error.info.error) {
        navigate(`/authorize?status=fail&error=${error.info.error}`);
        return;
      }

      navigate("/authorize?status=fail");
    }
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object({
        message: yup
          .string()
          .max(300, "Максимально 300 символов")
          .notRequired(),
        amount: yup
          .string()
          .required("Это обязательное поле")
          .test(
            "min",
            `Минимальная сумма ${getCorrectPrice(settings.minDonate)}`,
            (value) =>
              parseInt(value.replace("₽", "").trim(), 10) >= settings.minDonate,
          )
          .test(
            "max",
            `Максимальная сумма ${getCorrectPrice(settings.maxDonate)}`,
            (value) =>
              parseInt(value.replace("₽", "").trim(), 10) <= settings.maxDonate,
          ),
      }),
    ),
    defaultValues: {
      message: "",
      amount: `${amount} ₽`,
    },
  });
  const { control, handleSubmit, watch, setValue, reset } = methods;

  useFormPersist("payDonate", { watch, setValue });

  const onSubmitForm = async (data) => {
    await handlePay({ donatorComment: data?.message, amount: data?.amount });
  };

  const currentProcent = percentageCollected(currentAmount, aim?.amount);
  return (
    <div className="max-w-[1140px] w-full m-auto flex flex-row-reverse gap-5 items-start max-md:flex-col">
      <button
        type="button"
        className="flex w-9 h-9 ml-auto mb-[10px] outline-none"
        onClick={() => {
          isAuthorized ? navigate("/dashboard") : navigate("/");
        }}
        aria-label="Закрыть модальное окно"
      >
        <img
          className="w-full h-full object-cover"
          src={closeIcon}
          alt="Закрыть"
        />
      </button>
      <div className="flex flex-col gap-7 w-full bg-[#0e0e0e] py-[60px] px-14 text-white rounded-[35px] max-xs:p-2">
        <div className="max-w-lg">
          <div className="w-[64px] h-[64px] rounded-[50%] overflow-hidden mb-[20px]">
            {
              <img
                className="w-full h-full bg-gray-200 object-cover"
                src={data?.avatar ? createMediaLink(data.avatar) : mockAvatar}
                alt={"avatar"}
              />
            }
          </div>
          <h3 className="text-[32px] font-bold max-md:text-2xl max-sm:text-lg">
            {aim != null
              ? "Отправка кликсов в пользу профиля"
              : "Отправка кликсов пользователю"}{" "}
            <span className="text-[#A354D9]">
              {hasChangedNickName && data?.nickname ? (
                `@${data.nickname}`
              ) : (
                <>
                  {data.beneficiary?.firstName}
                  {"\u00A0"}
                  {data.beneficiary?.surname}
                </>
              )}
            </span>
          </h3>
        </div>
        {aimId && (
          <div className="p-8 rounded-[32px] bg-[#191919] max-xs:p-5 max-xs:rounded-2xl">
            <span className="block text-2xl font-bold text-white mb-2 max-sm:text-lg max-xs:text-base break-all">
              {aim?.title}
            </span>
            <p className="text-sm max-xs:text-xs truncate">
              {aim?.description}
            </p>

            {aim?.showProgress && (
              <div className="w-full pt-5">
                <div className="w-full h-3 rounded-[100px] border border-solid border-white/20 mb-4 relative">
                  <span
                    className="absolute flex items-center justify-end left-0 top-0 bottom-0 bg-[#874AB0] rounded-[100px]"
                    style={{ width: currentProcent + "%" }}
                  >
                    <span className="text-[10px] py-[5px] px-[10px] rounded-2xl bg-[#874AB0] -mr-4">
                      {currentProcent}%
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-5  justify-between">
                  <span className="text-center">
                    {getCorrectPrice(currentAmount)}
                  </span>
                  <span className="text-center">
                    {getCorrectPrice(aim.amount)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        <FormProvider {...methods}>
          {/*{userCards != null && userCards.length > 0 && (*/}
          {/*    <div>*/}
          {/*        <ListBoxUI.tsx userCards={userCards} setCardId={setCardId} />*/}
          {/*    </div>*/}
          {/*)}*/}
          <form
            className="w-full flex flex-col gap-[18px]"
            action="#"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <FormInputUI
              control={control}
              name="message"
              label="Сообщение получателю"
              placeholder="Сообщение получателю"
            />
            <div className="relative mb-3">
              <div className="flex w-full items-center justify-center flex-wrap gap-4 p-3 rounded-[60px] border border-solid border-white/10 max-xs:border-none max-xs:p-0">
                <label className="block w-[48%] max-xs:w-full">
                  <span className="sr-only">Введите сумму доната</span>
                  <CurrencyInput
                    disabled={data.beneficiary == null}
                    name="amount"
                    amount={amount}
                    onChange={handleInputChange}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    className="!p-0 w-full bg-transparent text-2xl text-center placeholder:text-[#736979] border-[#565656] outline-none max-xs:border rounded-full"
                    type="text"
                  />
                </label>
                <div className="w-[48%] max-xs:w-full">
                  <ButtonUI
                    type="submit"
                    disabled={isErrorForm || data.beneficiary == null}
                    isLoading={isMutating}
                  >
                    Оплатить
                  </ButtonUI>
                </div>
              </div>
            </div>
            <CheckboxUI onChangeChecked={(e) => setIsConditionsChecked(e)}>
              Я согласен с{" "}
              <Link className="underline" to="/terms">
                условиями
              </Link>{" "}
              сервиса
            </CheckboxUI>
          </form>
        </FormProvider>
        {!isAuthorized && (
          <div className="flex flex-wrap items-center gap-1 max-xs:justify-center">
            <button className="text-[18px] font-bold" onClick={handleLogin}>
              Вход
            </button>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        setOpen={setIsAlertModalOpen}
        hasCanselBtn={false}
        okButtonText="Ок"
        title="Внимание!"
        text="Примите условия сервиса!"
      />
    </div>
  );
};

export default DonatePage;

const findAim = (aims, aimId): IAimsInfo => {
  for (var i = 0; i < aims.length; i++) {
    if (aims[i].id == aimId) {
      return aims[i];
    }
  }
  return aims[0];
};
