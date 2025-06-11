import React, {Dispatch, SetStateAction, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import StorageService from "@/core/service/storage-service.ts";
import AlertModal from "@components/AlertModal.tsx";
import {ButtonUI} from "@components/ui/ButtonUI";
import {FormInputUI} from "@components/ui/InputUI";
import {CurrencyInput} from '../CurrencyInput.tsx';
import {useQuickLinkEdit} from "@/core/api/api-hooks/ui/quick-link/use-quick-link-edit.ts";
import {useQuickLinkCreate} from "@/core/api/api-hooks/ui/quick-link/use-quick-link-create.ts";
import {quickFormSchema} from "@/pages/Quicklinks/components/Forms/schemes.ts";
import {IQuickLinkDto} from "@/data-contracts.ts";
import {ErrorApiUI} from "@components/ui/ErrorApiUI";
import UploadBlock from "@/pages/Quicklinks/components/UploadBlock/UploadBlock.tsx";
import {useQuickLinkValidation} from "@/core/api/api-hooks/ui/quick-link/use-quick-link-validation.ts";

interface QlForm {
    edit?: IQuickLinkDto;
    onSuccess?: (edited, created) => void;
    hasCanselBtn?: boolean;
    setStateQuickLinksModal?: Dispatch<SetStateAction<boolean>>;
    setStateStepsModal?: Dispatch<SetStateAction<boolean>>;
    currentStep?: number;
    setCurrentStep?: Dispatch<SetStateAction<number>>;
    onCloseStep?: () => void;
}

export type FileItem = {
    id: string;
    load: boolean;
    name: string;
    file: File;
    isLoaded?: boolean;
};

const QuickLinksForm = ({
                            edit,
                            onSuccess,
                            onCloseStep,
                            hasCanselBtn = false,
                            setStateQuickLinksModal,
                            currentStep,
                        }: QlForm) => {

    const {
        mutateAsync: createQuickLinks,
        isPending: isMutatingCreate,
        isError
    } = useQuickLinkCreate();


    const {
        mutateAsync: createQuickLinksValidation,
        isPending: isMutatingCreateValidation,
        isError: isErrorValidation
    } = useQuickLinkValidation();


    const {
        mutateAsync: editQuickLinks,
        isPending: isMutatingEdit,
    } = useQuickLinkEdit();

    const methods = useForm({
        mode: "onChange",
        resolver: quickFormSchema(),
        defaultValues: {
            title: edit?.title,
            description: edit?.description,
            amount: edit?.amount ? `${String(edit?.amount / 100)} ₽` : '',
            recommendedPayment: edit?.recommendedPayment,
            thanksText: edit?.thanksText,
            allowResell: edit != null ? edit?.allowResell : false,
            isCreateAds: false,
        },
    });

    const {
        control,
        handleSubmit,
        getValues,
        reset: resetForm,
        formState: {isValid}
    } = methods;

    const [fileIds, setFileIds] = useState<FileItem[]>([]);

    const [isCansel, setIsCansel] = useState(false);

    const settings = StorageService.getSettings();


    const handleDeleteFiles = () => {
        setFileIds([]);
    };

    const stepsHandler = () => {
        setStateQuickLinksModal(false);
        onCloseStep?.();
    };


    const onCanselBtnHandler = (e) => {
        e.preventDefault();
        setIsCansel(true);
    };

    const onSubmitForm = async (data, hasCheckAmount = true) => {
        const payload = {
            ...data,
            recommendedPayment: !!data.recommendedPayment ? parseFloat(data.recommendedPayment) : 0,
            amount: Number(data.amount.replace('₽', '').trim()) * 100,
            content: fileIds?.filter((file) => file?.isLoaded)
                .map((file) => ({id: file?.id, name: file?.name})),
        }
        /*  if(hasCheckAmount && Number(data.amount.replace('₽', '').trim()) > 10000) {
              seShowModalAmount(true)
              return
          }*/
        if (!edit) {
            const data = await createQuickLinksValidation(payload)
            if (data.errorText) {
                return alert(data.errorText);
            }


            if (!fileIds.length) return alert('Необходимо выбрать файл')
            try {
                /*  if (fileIds.length === 0 || fileIds.every((file) => !file.isLoaded)) {
                      fileInputRef.current.click();
                      return;
                  }*/
                const dataRes = await createQuickLinks(payload);
                onSuccess({...dataRes, isCreateAds: data.isCreateAds}, true);
                handleDeleteFiles();
                resetForm()
            } catch (e) {
                console.error("error", e);
            }
            return
        }


        try {
            const dataRes = await editQuickLinks({
                ...payload,
                content: edit.content,
                id: edit.id,
            });
            onSuccess({...dataRes, isCreateAds: data.isCreateAds}, true);
            handleDeleteFiles();
            resetForm()
        } catch (e) {
            console.error("error", e);
        }
    };
    //todo для цены больше 10000 руб
    const [showModalAmount, seShowModalAmount] = useState(false)

    return (
        <FormProvider {...methods}>
            {/* <AlertModal
                maxWidth={800}
                classNameModalContainer={"p-[37px]"}
                title={''}
                text={ <div className={'flex flex-col gap-[10px]'}>
                    <h3>Уважаемый клиент!</h3>
                    <div>
                        Контент, для которого будет установлена цена, превышающая 10000 р., временно не будет доступен для покупки. Продолжить?
                    </div>
                </div>}
                okButtonText={'OK'}
                onOkButtonClick={ async () => {
                    await onSubmitForm(getValues(), false)
                    seShowModalAmount(false)
                }}
                onCancelButtonClick={ () => {
                    seShowModalAmount(false)
                }}
                hasCanselBtn={true}
                isOpen={showModalAmount}
            />*/}

            <form onSubmit={handleSubmit(onSubmitForm as any)}>
                <ErrorApiUI error={isError}/>
                <div className='flex gap-8 mb-8 flex-col'>
                    <div className='flex-grow flex flex-col gap-2'>
                        <FormInputUI
                            control={control}
                            name='title'
                            label='Название контента'
                            placeholder='Название контента'
                        />
                        <FormInputUI
                            control={control}
                            name='description'
                            label='Описание контента'
                            placeholder='Описание контента'
                        />
                        <CurrencyInput
                            name='amount'
                            label='Стоимость'
                            placeholder={`Стоимость контента: от ${settings.minQuicklink}₽ до ${settings.maxQuicklink}₽`}
                        />
                        <FormInputUI
                            control={control}
                            name='thanksText'
                            label='Благодарственный текст'
                            placeholder='Сообщение пользователю после оплаты'
                        />
                    </div>

                    {!edit && <UploadBlock fileIds={fileIds} setFileIds={setFileIds}/>}
                </div>

                {edit?.contentExt?.length > 0 && (
                    <div className='flex items-center gap-5 flex-wrap mb-8'>
                        {edit.contentExt.map((ui, i) => (
                            <a
                                href={ui.link}
                                target='_blank'
                                key={ui.link}
                                className='flex items-center gap-6 py-2 px-4 bg-[#874AB0]/50 rounded-full max-w-[300px]'
                            >
                <span className='w-full line-clamp-1 overflow-hidden text-ellipsis text-xl'>
                  {ui.name}
                </span>
                            </a>
                        ))}
                    </div>
                )}
                {!currentStep && (
                    <AlertModal
                        classNameModalContainer={"!p-[37px]"}
                        classNameBtnContainer={"flex-row-reverse "}
                        classNameBtnOk={"!bg-transparent"}
                        classNameBtnCancel={"!bg-[#874AB0]"}
                        isOpen={isCansel}
                        variantOkButtonText={"border"}
                        title={`Отмена редактирования`}
                        text={"Вы уверены, что хотите отменить изменения?"}
                        onCloseButtonText={"Нет"}
                        okButtonText={"Да"}
                        onOkButtonClick={() => setStateQuickLinksModal(false)}
                        onCloseModal={() => setIsCansel(false)}
                        setOpen={setIsCansel}
                    />
                )}
                {/*  <AlertModal
                    isOpen={resellAlertModal}
                    setOpen={setResellAlertModal}
                    onOkButtonClick={() => setCheckboxValue(false)}
                    okButtonText='Да'
                    title='Внимание!'
                    text='Запрещая перепродажу контента, вы лишаетесь дополнительной прибыли. Запретить перепродажу?'
                    onCancelButtonClick={() => setCheckboxValue(true)}
                />*/}
                <div className='max-sm:max-w-[100%] w-full flex flex-row gap-[16px] items-center max-sm:flex-col '>
                    {hasCanselBtn && (
                        <div className={"w-full"}>
                            <ButtonUI
                                type='button'
                                variant={"transparent"}
                                onClick={!currentStep ? onCanselBtnHandler : stepsHandler}
                                className={"border-[1px] border-[#FFFFFF] border-solid"}
                            >
                                Отмена
                            </ButtonUI>
                        </div>
                    )}

                    <div
                        className={`max-w-[180px] max-sm:max-w-[100%] w-full ${
                            hasCanselBtn ? "!max-w-[100%]" : ""
                        }`}
                    >
                        <ButtonUI
                            type='submit'
                            className='border-[1px] border-transparent border-solid'
                            isLoading={isMutatingEdit || isMutatingCreate}
                            disabled={!isValid || fileIds.some(file => file.load === true)}
                        >
                            {edit == null ? "Добавить" : "Сохранить"}
                        </ButtonUI>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default QuickLinksForm;
