import { useNavigate } from "react-router-dom";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

export const CloseModalButton = () => {
  const { data: user } = useGetUser();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex w-9 h-9 ml-auto mb-[10px] outline-none"
      onClick={() => {
        user ? navigate("/dashboard") : navigate("/");
      }}
      aria-label="Закрыть модальное окно"
    >
      <Icon name={"closeIcon"} className="w-full h-full object-cover" />
    </button>
  );
};
