import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getUnAuthFromCookie,
  getUserFromCookie,
} from "@/helpers/GetUserFromCookie.ts";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import SpinerUI from "../../components/ui/SpinerUI/SpinerUI.tsx";
import { AddCardModal } from "@/pages/AddCardModal/AddCardModal.tsx";
import { deleteInfoUserCookie } from "@/helpers/DeleteInfoUserCookie.ts";
import { usePassportCheck } from "@/routing/components/usePassportCheck.ts";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const userInfoCookie = getUserFromCookie();
  const authUserCookie = getUnAuthFromCookie();

  const { data: user, isLoading } = useGetUser();
  usePassportCheck();

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center h-screen"}>
        <SpinerUI />
      </div>
    );
  }

  // todo логика разлогина (сквозная) || нет юзера
  if ((!userInfoCookie && authUserCookie === "unAuth") || !user) {
    navigate("/");
    deleteInfoUserCookie();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      {children}
      <AddCardModal />
    </>
  );
};

export default Protected;
