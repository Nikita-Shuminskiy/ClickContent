import { CURR_DOMAIN } from "@/constants/domainHost.ts";
import { setIsAuthCookie } from "@/helpers/NavigateToMarket.ts";

export const deleteInfoUserCookie = () => {
  document.cookie = `user=; path=/; ${CURR_DOMAIN} expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=lax`;
  setIsAuthCookie("unAuth");
};
