import React from "react";
import { Overlay } from "@/pages/new-payment-page/components/overlay.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputUI } from "@components/ui/InputUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import { useWithdraw } from "@/core/api/api-hooks/finance/use-withdraw.ts";
import { BackgroundCircle } from "@/pages/new-payment-page/components/background-circle.tsx";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";

const validationSchema = yup.object({
  card: yup
    .string()
    .required("Укажите карту для вывода")
    .matches(/^\d{16}$/, "Номер карты должен содержать ровно 16 цифр"),
  amount: yup
    .number()
    .typeError("Введите числовое значение")
    .required("Укажите сумму для вывода")
    .positive("Сумма должна быть больше нуля"),
});

const Withdraw = () => {
  const { mutateAsync, isPending } = useWithdraw();
  const { data: user } = useGetUser();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = async (data: any) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen bg-[#00000080] z-0">
      <Overlay>
        <BackgroundCircle className="absolute top-[100px] right-[20px] max-3xl:hidden bg-[#00B6EC]" />
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <h3 className="text-[32px] text-center font-bold mb-8 max-sm:text-base">
            Форма вывода средств
          </h3>
          <div className="flex flex-col gap-4">
            <FormInputUI
              control={control}
              value={watch("card")
                ?.replace(/\D/g, "")
                ?.slice(0, 16)
                ?.replace(/(.{4})/g, "$1-")
                ?.replace(/-$/, "")}
              onChange={(val) => {
                const raw = val.currentTarget.value
                  .replace(/\D/g, "")
                  .slice(0, 16);
                setValue("card", raw, { shouldValidate: true });
              }}
              name="card"
              label="Введите номер карты"
              placeholder="0000 0000 0000 0000"
            />
            <FormInputUI
              control={control}
              name="amount"
              label="Введите сумму для вывода"
              placeholder="сумма"
            />
            <div className="mb-4">
              <ButtonUI
                type="submit"
                disabled={!isValid || isPending}
                isLoading={isPending}
              >
                Отправить
              </ButtonUI>
            </div>
          </div>
        </form>
      </Overlay>
    </main>
  );
};

export default Withdraw;
