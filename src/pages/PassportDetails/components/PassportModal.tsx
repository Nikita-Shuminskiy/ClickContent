import React, { Fragment, useEffect, useState } from "react";
import AlertModal, { AlertModalProps } from "@components/AlertModal.tsx";
import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { ModalUI } from "@components/ui/ModalUI";
import { ErrorApiUI } from "@components/ui/ErrorApiUI";
import { FormInputUI } from "@components/ui/InputUI";
import { CheckboxUI } from "@components/ui/CheckboxUI";
import { formatDate, formatUnitCode } from "@/helpers/NumberFormatter.ts";
import { ButtonUI } from "@components/ui/ButtonUI";
import { useCreatePassport } from "@/core/api/api-hooks/passport/use-add-passport.ts";
import { useGetPassport } from "@/core/api/api-hooks/passport/use-get-passport.ts";
import { useValidationPassport } from "@/core/api/api-hooks/passport/use-validation-passport.ts";
import { useEditPassport } from "@/core/api/api-hooks/passport/use-edit-passport.ts";
import { passportScheme } from "@/pages/PassportDetails/components/schemes.ts";
import { convertDateToFormat } from "@/helpers/Datetimeutils.ts";
import { uploadPassportToDefaultValues } from "@/pages/PassportDetails/components/utils.ts";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { useCreateRimPassport } from "@/core/api/api-hooks/passport/use-add-passport-rim.ts";
import { IPassportStatusDto } from "@/data-contracts.ts";
import SelectUI from "@components/ui/SelectUI.tsx";

export const PassportModal = ({ isOpen, setOpen, setStateWarningModal }) => {
  const navigate = useNavigate();
  const { data: dataPassport } = useGetPassport();
  const { mutateAsync: validatePassport, isPending: isPendingValidation } =
    useValidationPassport();
  const {
    mutateAsync: createPassport,
    isError,
    isPending,
  } = useCreatePassport();

  const { mutateAsync: editPassport } = useEditPassport();
  const { data: user } = useGetUser();
  const { mutate: createPassportRim, isPending: isPendingCreateRim } =
    useCreateRimPassport();

  const isEditPassport =
    user?.passportType === IPassportStatusDto.Created ||
    user?.passportType === IPassportStatusDto.ValidationFailed; //TODO если такие статусы знач это редактирование

  const [alertProps, setAlertProps] = useState<AlertModalProps>();
  const [stateAlertModal, setStateAlertModal] = useState(false);

  const onSubmitForm = async (data) => {
    const reqData = {
      ...data,
      dateOfBirth: convertDateToFormat({
        dateStr: data.dateOfBirth,
        inputFormat: "dd/MM/yyyy",
        outputFormat: "yyyy-MM-dd",
      }),
      dateOfIssue: convertDateToFormat({
        dateStr: data.dateOfIssue,
        inputFormat: "dd/MM/yyyy",
        outputFormat: "yyyy-MM-dd",
      }),
      sex: data.sex === "Женский" ? "female" : "male",
    };
    try {
      const response = isEditPassport
        ? await editPassport({ data: reqData, id: dataPassport.id })
        : await createPassport(reqData);

      return createPassportRim({ phone: user.phoneNumber });

      /*await validatePassport({id: response.id}); //todo пока не понятно нужно ли
            setAlertProps({
                title: "Ожидание",
                text: "Ваши данные отправленны на проверку в ФНС",
                okButtonText: 'Ок',
                progress: false,
                onOkButtonClick: onCloseModal,
                onCloseModal
            });
            setStateAlertModal(true);*/
    } catch (error) {
      setAlertProps({
        title: "Ошибка",
        text: "Попробуйте позже",
        okButtonText: "Ок",
        progress: false,
        onOkButtonClick: onCloseModal,
        onCloseModal,
      });
      setStateAlertModal(true);
    }
  };

  const onCloseModal = () => {
    navigate("/dashboard");
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, defaultValues },
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: passportScheme(),
    defaultValues: {
      isPatronymic: false,
    },
  });

  useEffect(() => {
    if (dataPassport) {
      reset(uploadPassportToDefaultValues({ dataPassport }), {
        keepIsValid: true,
      });
    }
  }, [dataPassport]);

  return (
    <>
      <AlertModal
        title={alertProps?.title}
        text={alertProps?.text}
        okButtonText={alertProps?.okButtonText}
        onOkButtonClick={alertProps?.onOkButtonClick}
        progress={alertProps?.progress}
        isOpen={stateAlertModal}
        onCloseModal={alertProps?.onCloseModal}
        setOpen={setStateAlertModal}
      />
      <ModalUI
        isOpen={isOpen}
        setOpen={(isOpen) => {
          if (!isOpen) {
            onCloseModal();
          }
        }}
      >
        <div className="mb-8">
          <h3 className="text-[32px] text-center font-bold mb-3 max-sm:text-base">
            Почти готово!
          </h3>
          <p className="text-center max-sm:text-xs">
            Для завершения регистрации в ClickContent, единственном легальном
            сервисе по продаже контента, необходимо валидировать ваши паспортные
            данные в ФНС
          </p>
        </div>
        <ErrorApiUI error={isError} />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-4 mb-8">
            <FormInputUI
              control={control}
              name="surname"
              label="Фамилия*"
              placeholder="Фамилия*"
            />
            <FormInputUI
              control={control}
              name="firstName"
              label="Имя*"
              placeholder="Имя*"
            />
            <FormInputUI
              control={control}
              name="middleName"
              label="Отчество*"
              placeholder="Отчество*"
            />
            <Controller
              name="isPatronymic"
              control={control}
              render={({ field }) => (
                <CheckboxUI {...field} label="Нет отчества" />
              )}
            />
            <FormInputUI
              control={control}
              onChange={(e) => {
                const date = formatDate(e.target.value);
                setValue("dateOfBirth", date);
              }}
              maxLength={10}
              name="dateOfBirth"
              label="Дата рождения*"
              placeholder="Дата рождения*"
            />
            <div className="flex gap-4 max-xs:flex-col">
              <FormInputUI
                control={control}
                name="series"
                label="Серия*"
                placeholder="Серия*"
              />
              <FormInputUI
                control={control}
                name="number"
                label="Укажите номер паспорта*"
                placeholder="Укажите номер паспорта*"
              />
            </div>
            <FormInputUI
              control={control}
              name="dateOfIssue"
              onChange={(e) => {
                const date = formatDate(e.target.value);
                setValue("dateOfIssue", date);
              }}
              maxLength={10}
              label="Дата выдачи*"
              placeholder="Дата выдачи*"
            />
            <FormInputUI
              control={control}
              name="issuedBy"
              label="Кем выдан*"
              placeholder="Кем выдан*"
            />
            <FormInputUI
              control={control}
              name="phone"
              label="Номер телефона*"
              placeholder="Номер телефона*"
            />

            <FormInputUI
              control={control}
              onChange={(e) => {
                const formattedValue = formatUnitCode(e.target.value);
                setValue("policeDepartmentCode", formattedValue);
              }}
              name="policeDepartmentCode"
              label="Код подразделения*"
              placeholder="Код подразделения*"
            />
            <FormInputUI
              control={control}
              name="registrationAddress"
              label="Адрес регистрации*"
              placeholder="Адрес регистрации*"
            />
            <FormInputUI
              control={control}
              name="placeOfBirth"
              label="Место рождения*"
              placeholder="Место рождения*"
            />
            <SelectUI
              control={control}
              options={[
                { value: "Мужской", option: "Мужской" },
                {
                  value: "Женский",
                  option: "Женский",
                },
              ]}
              name={"sex"}
              placeholder={"Укажите пол"}
            />
          </div>
          <div className="max-w-[190px]">
            <ButtonUI
              isLoading={isPending || isPendingValidation || isPendingCreateRim}
              disabled={isPendingCreateRim}
              // disabled={isSubmitted && !isValid}
              type="submit"
            >
              Сохранить
            </ButtonUI>
          </div>
        </form>
      </ModalUI>
    </>
  );
};
