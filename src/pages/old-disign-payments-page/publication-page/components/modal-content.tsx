import { ContentCreator } from "../content-creator";
import { QuickLinkInfo } from "./quick-link-info";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Form } from "./form";
import { Dispatch, memo, SetStateAction, useMemo } from "react";
// import { useLoginModalContext } from '@/contexts/LoginModalContext'
import { getHasChangeNickName } from "@/helpers/CheckUserNickName.ts";
import { IQuickLinkDto } from "@/data-contracts.ts";

type IProps = {
  data: IQuickLinkDto;
  // setOpenResellModal: Dispatch<SetStateAction<boolean>>
  setIsConditionsChecked: Dispatch<SetStateAction<boolean>>;
  onSubmitForm: (data: any) => void;
  methods: UseFormReturn;
  isConditionsChecked: boolean;
  isUserHasEmail?: boolean;
};

export const ModalContent = memo(
  ({
    data,
    setIsConditionsChecked,
    onSubmitForm,
    methods,
    isConditionsChecked,
    isUserHasEmail,
  }: IProps) => {
    // const { data: user } = useGetUser()

    // const { openLoginModal } = useLoginModalContext()
    const hasChangedNickName = useMemo(
      () => getHasChangeNickName(data?.user.nickName),
      [data?.user.nickName],
    );

    // const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     openLoginModal(true)
    //     updateParams({
    //         open: 'true'
    //     })
    // }

    return (
      <div className="w-full max-xs:bg-inherit bg-[#141414] py-[60px] px-14 flex text-white gap-8 rounded-[35px]  max-sm:flex-col max-xs:p-2 max-sm:p-6">
        {/*<div className="w-full">*/}
        <div className="flex flex-col gap-6 ">
          <ContentCreator hasChangedNickName={hasChangedNickName} data={data} />
          <QuickLinkInfo quicklink={data} />
          <FormProvider {...methods}>
            <Form
              data={data}
              setIsConditionsChecked={setIsConditionsChecked}
              onSubmitForm={onSubmitForm}
              isConditionsChecked={isConditionsChecked}
              isUserHasEmail={isUserHasEmail}
            />
          </FormProvider>
          {/* TODO Пока уберу - обсудить - надо ли*/}
          {/*{!user && (*/}
          {/*    <LoginButton handleLogin={handleLogin}/>*/}
          {/*)}*/}

          {/*<ResellButton setOpenResellModal={setOpenResellModal} user={user} handleLogin={handleLogin} />*/}
        </div>
        {/*</div>*/}
      </div>
    );
  },
);
