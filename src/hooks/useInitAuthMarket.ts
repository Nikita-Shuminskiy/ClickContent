import { useLoginModalContext } from "@/contexts/LoginModalContext.tsx";
import {
  getUnAuthFromCookie,
  getUserFromCookie,
} from "@/helpers/GetUserFromCookie.ts";
import { setIsAuthCookie, setUserCookie } from "@/helpers/NavigateToMarket.ts";
import { useEffect } from "react";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";

export const useInitAuthMarket = () => {
  const { params } = useUpdateSearchParams();
  const userInfoCookie = getUserFromCookie();
  const { openLoginModal } = useLoginModalContext();

  const user = useGetUser().data;

  if (!!user && !userInfoCookie && !getUnAuthFromCookie()) {
    setUserCookie({ user: JSON.parse(localStorage.getItem("user")) });
    setIsAuthCookie("auth");
  }

  const isMarket = !!params.get("market");

  useEffect(() => {
    if (isMarket && !userInfoCookie) openLoginModal?.();
  }, []);
};
