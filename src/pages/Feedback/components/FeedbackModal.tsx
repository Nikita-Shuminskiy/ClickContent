import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useAddFeedback } from "@/core/api/api-hooks/ui/common/use-add-feedback.ts";
import { Controller, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { ModalUI } from "@components/ui/ModalUI";
import errorIcon from "@assets/images/icons/error-icon.svg";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FormInputUI } from "@components/ui/InputUI";
import { FormTextAreaUI } from "@components/ui/TextAreaUI";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import { selectValue } from "@/pages/Feedback/components/constants.ts";
import { feedbackResolver } from "@/pages/Feedback/components/shemes.ts";

const FeedbackModal = ({ setOpenInfoModal, setStatusForm }) => {
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);
  const { mutateAsync: sendFeedback, isPending } = useAddFeedback();

  useEffect(() => {
    setOpenModal(true);
  }, []);

  const onSubmitForm = async (data) => {
    try {
      await sendFeedback({
        ...data,
        type: data.type.value,
      });

      setStatusForm(true);
      setOpenInfoModal(true);
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      setStatusForm(false);
      setOpenInfoModal(false);
      setOpenModal(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitSuccessful, errors, isValidating, isDirty },
    reset: resetForm,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: feedbackResolver,
  });

  useFormPersist("formFeedback", {
    watch,
    setValue,
  });

  useEffect(() => {
    if (!getValues("type")) {
      setValue("type", selectValue[0]);
    }
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful]);

  return (
    <ModalUI
      isOpen={isOpenModal}
      setOpen={(isOpen) => !isOpen && navigate(-1)}
      maxWidth={650}
    >
      <h3 className="text-[32px] text-center font-bold mb-8 max-sm:text-base">
        Форма обратной связи
      </h3>
      {!!errors.isTerms && (
        <p className="flex items-center gap-2 text-red-500 py-3">
          <img className="w-4 h-4 object-cover" src={errorIcon} alt="Ошибка" />
          {errors?.isTerms?.message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-4 mb-8">
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => {
              return (
                <Listbox value={value} onChange={onChange} name="type">
                  <div className="relative mt-1">
                    <ListboxButton className="w-full text-left">
                      <span className="flex flex-col truncate pl-[28px] pb-[28px] pt-[28px] max-sm:pt-[18px] max-sm:pb-[18px] pr-12 text-white bg-[#1A1A1A] text-[16px] rounded-2xl">
                        <span className="text-base w-full overflow-hidden text-ellipsis">
                          {value?.text}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute top-[50%] translate-y-[-50%] right-5 w-2 h-2 border-l-2 border-b-2 border-solid border-white -rotate-45"></span>
                    </ListboxButton>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-[#202020] text-base p-5 shadow-lg ring-1 z-20 ring-black/5 focus:outline-none sm:text-sm">
                        {selectValue.map((option) => (
                          <ListboxOption
                            className={`relative cursor-pointer select-none hover:bg-white/20 rounded-xl`}
                            key={`key-${option.value}`}
                            value={option}
                          >
                            <div className="flex items-center gap-3 truncate text-white text-base py-5 px-3 border-solid border-b-1 border-b-white/20">
                              <span className="w-full overflow-hidden text-ellipsis">
                                {option.text}
                              </span>
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              );
            }}
          />
          <FormInputUI
            control={control}
            name="name"
            label="Имя"
            placeholder="Имя"
          />
          <FormInputUI
            control={control}
            name="contact"
            label={
              watch("type")?.value === "mail"
                ? "Почта"
                : "Телеграм-контакт (например, @yourname)"
            }
            placeholder={
              watch("type")?.value === "mail"
                ? "Почта"
                : "Телеграм-контакт (например, @yourname)"
            }
          />
          <FormTextAreaUI
            control={control}
            name="text"
            label="Текст сообщения"
            placeholder="Текст сообщения"
          />
          <Controller
            name="isTerms"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CheckboxUI onChangeChecked={onChange} checked={value}>
                Я согласен с{" "}
                <Link className="underline" to="/terms">
                  условиями
                </Link>{" "}
                сервиса
              </CheckboxUI>
            )}
          />
        </div>
        <div className="mb-4">
          <ButtonUI
            // disabled={!isValid}
            disabled={isPending || !isValid}
            isLoading={isPending}
            type="submit"
          >
            Отправить
          </ButtonUI>
        </div>
      </form>
    </ModalUI>
  );
};
export default FeedbackModal;
