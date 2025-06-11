import { useNavigate } from "react-router-dom";
import { ModalUI } from "@components/ui/ModalUI";
import { ButtonUI } from "@components/ui/ButtonUI";
import { useCreateRimPassport } from "@/core/api/api-hooks/passport/use-add-passport-rim.ts";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";

export const WarningModal = ({ isOpen, setOpen }) => {
  const navigate = useNavigate();
  const { data: user } = useGetUser();
  const { mutate, isPending } = useCreateRimPassport();

  const handleRedirectToDashboard = () => {
    navigate("/dashboard");
  };
  const onAddPassportRim = () => {
    mutate({ phone: user?.phoneNumber });
  };

  return (
    <ModalUI
      isOpen={isOpen}
      setOpen={(boolean) => {
        setOpen(boolean);
        if (!boolean) {
          handleRedirectToDashboard();
        }
      }}
    >
      <div className="mb-8">
        <h3 className="text-[32px] text-center font-bold mb-3 max-sm:text-base">
          Внимание!
        </h3>
        <p className="text-2xl text-center max-sm:text-sm">
          Для работы в сервисе потребуется верифицировать аккаунт
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 max-xs:flex-col-reverse">
        <ButtonUI
          isLoading={isPending}
          disabled={isPending}
          onClick={onAddPassportRim}
        >
          Указать
        </ButtonUI>
      </div>
    </ModalUI>
  );
};
