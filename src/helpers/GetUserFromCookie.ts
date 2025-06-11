export const getUserFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((cookie) => cookie.startsWith("user="));

  if (userCookie) {
    return JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
  }
  return null;
};
export const getUnAuthFromCookie = (): "unAuth" | "auth" => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((cookie) => cookie.startsWith("isAuth="));

  if (userCookie) {
    return userCookie.split("=")[1] as "unAuth" | "auth";
  }
  return null;
};
