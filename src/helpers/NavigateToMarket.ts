import { CURR_DOMAIN, HOST_LINK } from "@/constants/domainHost.ts";
import { removeQueryParam } from "@/helpers/RemoveQueryParam.ts";
import queryString from "query-string";
import { IUserDto } from "@/data-contracts.ts";

export const navToMarket = async (payload: { user: IUserDto }) => {
  let params = queryString.parse(location.search);
  if (payload?.user?.id) {
    removeQueryParam("market");
    removeQueryParam("page");

    setUserCookie({ user: payload.user });
    window.location.href = `${HOST_LINK}${
      params?.page ? `${params?.page}/` : ""
    }`;
    return;
  }
  window.location.href = HOST_LINK;
};
export const setUserCookie = (payload: { user: IUserDto }) => {
  document.cookie = `user=${encodeURIComponent(
    JSON.stringify(payload.user),
  )}; ${CURR_DOMAIN} max-age=315360000;  path=/; samesite=None; secure;`;
};
export const setIsAuthCookie = (unAuth: "unAuth" | "auth") => {
  document.cookie = `isAuth=${unAuth}; ${CURR_DOMAIN} max-age=315360000;  path=/; samesite=None; secure;`;
};
