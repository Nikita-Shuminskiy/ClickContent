import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteInfoUserCookie } from "@/helpers/DeleteInfoUserCookie.ts";

const useAuthListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userLoggedIn" && event.newValue === "logOut") {
        // localStorage.clear()
        localStorage.removeItem("refresh");
        localStorage.removeItem("token");
        window.location.reload();
        deleteInfoUserCookie();
        navigate("/");
      }
      if (event.key === "userLoggedIn" && event.newValue === "logIn") {
        localStorage.removeItem("userLoggedIn");
        window.location.reload();
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);
};

export default useAuthListener;
