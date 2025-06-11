import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import closeIcon from "@assets/images/icons/close-white.svg";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";
import { ButtonUI } from "@components/ui/ButtonUI";
import { FormInputUI } from "@components/ui/InputUI";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import heic2any from "heic2any";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import mockAvatar from "../../assets/images/all-img/mockAvatar.png";
import arrowBack from "../../assets/images/icons/arrow-back.svg";
import { useCreateUniqueNickname } from "@/core/api/api-hooks/ui/user/use-create-unique-nickname.ts";
import { useUploadFile } from "@/core/api/api-hooks/ui/common/use-add-uload-file.ts";
import { useAddUserAvatar } from "@/core/api/api-hooks/ui/user/use-add-user-avatar.ts";
import { SpinerUI } from "@components/ui/SpinerUI";
import { getPersonalCabinetProjectSchema } from "@components/PersonalCabinetModal/Schema.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

const PersonalCabinetModal = () => {
  const { isMobile } = useWindowWidth();
  const { isModalOpen, closeModal } = useModal(ModalKey.PERSONAL_CABINET);
  const { refetch, data: user } = useGetUser();

  const {
    isPending: isPendingNickname,
    mutateAsync: updateNickName,
    error: errorSendNickName,
  } = useCreateUniqueNickname();

  const {
    mutateAsync: uploadFile,
    isPending: isMutationUploadFile,
    error: errorUploadFile,
  } = useUploadFile();

  const {
    mutateAsync: saveAvatar,
    isPending: isMutationAvatar,
    error: errorSendAvatar,
  } = useAddUserAvatar();

  //   const {mutateAsync: deleteOldAvatar} = useDeleteUserAvatar()

  const [isLoadImage, setIsLoadImage] = useState(false);

  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onSubmit",
    resolver: getPersonalCabinetProjectSchema(),
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      reset({
        nickName: user.nickName || "",
        avatar: user.avatarLink || mockAvatar,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (errors?.file?.message) {
      showAlert(errors?.file?.message as any, "error");
    }
  }, [errors]);

  const onSubmitForm = async (data) => {
    if (data.nickName !== user.nickName) {
      await updateNickName(data.nickName);
    }
    if (!!data.file) {
      const dataFile = await uploadFile([data?.file]);
      await saveAvatar(dataFile[0]?.id);
    }

    await refetch();

    showAlert("Данные обновлены", "success");
    closeModal();
    reset({
      nickName: data.nickName,
      avatar: data.avatar,
    });
  };

  const uploadImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        avatar?: string;
      },
      "avatar"
    >,
  ) => {
    const selectedImage = e.target.files[0];
    const fileName = selectedImage.name.toLowerCase();
    const isHeicFormat =
      fileName.endsWith(".heic") ||
      fileName.endsWith(".heif") ||
      fileName.endsWith(".hif");
    if (selectedImage.type === "image/heic" || isHeicFormat) {
      setIsLoadImage(true);
      try {
        const convertedImage = await heic2any({
          blob: selectedImage,
          toType: "image/jpeg",
        });
        const url = URL.createObjectURL(convertedImage as Blob);
        field.onChange(url);
        setValue("file", convertedImage, {
          shouldDirty: true,
        });
      } catch (error) {
        console.error("Conversion error:", error);
      } finally {
        setIsLoadImage(false);
      }
    } else {
      const url = URL.createObjectURL(selectedImage);
      field.onChange(url);
      setValue("file", selectedImage, {
        shouldDirty: true,
      });
    }
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="block relative z-[999]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="transition duration-300"
          enterFrom="transform translate-x-full"
          enterTo="transform translate-x-0"
          leave="transition duration-300"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-full"
        >
          <div className="fixed inset-0 backdrop-blur-md bg-black/50 bg-opacity-75 transition-opacity " />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="transition duration-300"
          enterFrom="transform translate-x-full"
          enterTo="transform translate-x-0"
          leave="transition duration-300"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-full"
        >
          <div className="fixed top-0 right-0 bottom-0 bg-[#0e0e0e]">
            <DialogPanel className="relative transform overflow-hidden transition-all w-full h-full">
              <div
                className={
                  "max-w-[591px] w-screen flex flex-col justify-between items-center h-full overflow-y-auto"
                }
              >
                <div className="pr-14 pl-14 pt-[80px] flex justify-between flex-col relative w-full ">
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    {!isMobile && (
                      <button
                        className="w-[40px] h-[40px] absolute right-[40px] top-[7%] z-10 "
                        type="button"
                        onClick={closeModal}
                      >
                        <Icon
                          name={"closeIcon"}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )}
                    <div className="w-full flex flex-col gap-[32px] max-sm:gap-[16px] mb-8">
                      <div className={"flex flex-row gap-2 items-end"}>
                        {isMobile && (
                          <button
                            className="w-[24px] h-[24px] z-10 "
                            type="button"
                            onClick={closeModal}
                          >
                            <Icon
                              name={"arrowBack"}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        )}
                        <h3 className="text-[32px]  font-semibold max-sm:text-[16px]">
                          Настройка профиля
                        </h3>
                      </div>

                      <div className="flex justify-center">
                        <div className="relative">
                          <Controller
                            name="avatar"
                            control={control}
                            render={({ field }) => {
                              return (
                                <>
                                  <input
                                    type="file"
                                    className={"hidden"}
                                    accept=".jpeg, .jpg, .png, .gif, .bmp, .webp, .tiff, .svg, .heic"
                                    id="imageUploadInput"
                                    onChange={(e) =>
                                      uploadImageHandler(e, field)
                                    }
                                  />
                                  <label
                                    htmlFor="imageUploadInput"
                                    tabIndex={0}
                                    className="bg-[#000000] bg-opacity-50 absolute top-0 w-full h-full rounded-[50%] flex items-center justify-center cursor-pointer"
                                  >
                                    {isLoadImage ? (
                                      <SpinerUI />
                                    ) : (
                                      <Icon
                                        name={"cameraIcon"}
                                        className="w-[46px] h-[40px] max-sm:w-[40px] object-cover"
                                      />
                                    )}
                                  </label>
                                </>
                              );
                            }}
                          />

                          <img
                            className="object-cover rounded-[50%] w-[282px] h-[282px] max-sm:w-[170px] max-sm:h-[170px]"
                            src={watch("avatar") ?? mockAvatar}
                            alt="avatar"
                          />
                        </div>
                      </div>

                      <div className={"gap-[16px] flex flex-col"}>
                        <FormInputUI
                          control={control}
                          label="Имя пользователя"
                          placeholder="Имя пользователя"
                          className={"!bg-[#141414]"}
                          name={"nickName"}
                        />
                        {/*    <ErrorApiUI error={errorSendNickName  || errorSendAvatar || errorUploadFile} />*/}
                      </div>
                      <div
                        className={
                          "max-w-[60%] min-w-[180px] max-sm:max-w-[100%]"
                        }
                      >
                        <ButtonUI
                          isLoading={
                            isPendingNickname ||
                            isMutationAvatar ||
                            isMutationUploadFile
                          }
                          type="submit"
                          disabled={!isDirty}
                        >
                          Сохранить изменения
                        </ButtonUI>
                      </div>
                    </div>
                  </form>
                </div>
                {/*        <button
                                    className={`flex flex-row gap-3 text-[#DE3452] items-center pb-[60px]`}
                                    type="button"
                                    onClick={onDeleteProfile}
                                >
                                    <img
                                        className="w-6 h-6 object-cover"
                                        src={deleteProfile}
                                        alt="удалить"
                                    />
                                    Удалить профиль
                                </button>*/}
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition.Root>
  );
};

export default PersonalCabinetModal;
