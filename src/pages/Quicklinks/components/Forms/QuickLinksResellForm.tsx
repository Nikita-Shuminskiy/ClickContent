import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";
import { createCopyQuickLink } from "@/helpers/CreateCopyLinks.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import StorageService from "@/core/service/storage-service.ts";
import { ButtonUI } from "@components/ui/ButtonUI";
import { ErrorApiUI } from "@components/ui/ErrorApiUI";
import { FormInputUI } from "@components/ui/InputUI";
import { IQuickLinkDto } from "@/data-contracts.ts";
import { useQuickLinkCreate } from "@/core/api/api-hooks/ui/quick-link/use-quick-link-create.ts";

const QuickLinksResellForm = ({
  onSuccess,
  edit,
}: {
  onSuccess?: (...param: any) => void;
  edit?: IQuickLinkDto;
}) => {
  const settings = StorageService.getSettings();

  const {
    mutateAsync: createQuickLinks,
    error: isErrorCreate,
    isPending: isMutating,
    isError,
  } = useQuickLinkCreate();

  const onSubmitForm = async (data) => {
    const res = await createQuickLinks({
      ...data,
      recommendedPayment:
        data.recommendedPayment != null
          ? parseFloat(data.recommendedPayment)
          : 0,
      content: [],
    });

    if (res) {
      onSuccess(res, true);
      resetForm();
    }
  };

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object({
        resellId: yup
          .string()
          .required("Укажите ссылку на контент")
          .test(
            "length-check",
            `Неверный формат. Пример ссылки ${createCopyQuickLink("{id}")}`,
            (value) =>
              value.length ===
              createCopyQuickLink(
                Math.random().toString(36).substring(2, 38).padEnd(36, "a"),
              ).length,
          ),
        title: yup
          .string()
          .required("Укажите название ссылки")
          .max(100, "Максимально 100 символов"),
        description: yup
          .string()
          .max(300, "Максимально 300 символов")
          .notRequired(),
        amount: yup
          .number()
          .required("Укажите стоимость")
          .min(
            settings.minQuicklink,
            `Минимальная сумма ${getCorrectPrice(settings.minQuicklink)}`,
          )
          .max(
            settings.maxQuicklink,
            `Максимальная сумма ${getCorrectPrice(settings.maxQuicklink)}`,
          )
          .typeError("Допустимо только цифры"),
        thanksText: yup
          .string()
          .max(100, "Максимально 100 символов")
          .notRequired(),
        recommendedPayment: yup.string().notRequired(),
      }),
    ),
    defaultValues: {
      resellId: edit?.resellQuicklinkId,
      title: edit?.title,
      description: edit?.description,
      thanksText: edit?.thanksText,
      recommendedPayment: edit?.recommendedPayment
        ? String(edit?.recommendedPayment)
        : "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <ErrorApiUI error={isError} />
      <div className="flex gap-8 mb-8 max-sm:flex-col">
        <div className="flex-grow flex flex-col gap-2">
          <FormInputUI
            control={control}
            name="resellId"
            label="Ссылка на контент"
            disabled={!!edit?.resellQuicklinkId}
            placeholder="Ссылка на контент"
          />
          <FormInputUI
            control={control}
            name="title"
            label="Название ссылки"
            placeholder="Название"
          />
          <FormInputUI
            control={control}
            name="description"
            label="Описание ссылки(не обязательно)"
            placeholder="Описание (не обязательно)"
          />
          <FormInputUI
            control={control}
            name="amount"
            label="Стоимость"
            placeholder={`Ваша наценка (без учёта номинальной стоимости)`}
          />
          <FormInputUI
            control={control}
            name="thanksText"
            label="Благодарственный текст"
            placeholder="Сообщение пользователю после оплаты"
          />
        </div>
      </div>
      <div className="max-w-[180px] max-sm:max-w-[100%] w-full">
        <ButtonUI
          isLoading={isMutating}
          disabled={!isValid}
          // disabled={isSubmitted && !isDirty && !isValid}
        >
          Добавить
        </ButtonUI>
      </div>
    </form>
  );
};

export default QuickLinksResellForm;
