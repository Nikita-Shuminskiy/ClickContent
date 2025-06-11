import { Dispatch, SetStateAction } from "react";
import { PublicationPageButtonProps } from "../types/types";
import { IUserDto } from "@/data-contracts.ts";

interface IProps extends PublicationPageButtonProps {
  user?: IUserDto;
  setOpenResellModal?: Dispatch<SetStateAction<boolean>>;
}

export const ResellButton = ({
  user,
  setOpenResellModal,
  handleLogin,
}: IProps) => {
  const handleOpenResellModal = () => {
    setOpenResellModal(true);
  };

  return (
    <button
      className="inline-block text-[18px] font-bold text-left text-[#874AB0]"
      onClick={user ? handleOpenResellModal : handleLogin}
    >
      Продать этот контент с наценкой
    </button>
  );
};
