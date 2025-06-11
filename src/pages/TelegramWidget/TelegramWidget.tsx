import { useEffect } from "react";
import queryString from 'query-string';
import StorageService from "@/core/service/storage-service.ts";
import UserService from "@/OLD_services/UserService";
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/core/api/api-hooks/auth/use-auth.ts";

const TelegramWidget = () => {
    const navigate = useNavigate();
    const isAuthorized = useAuth()

    useEffect(() => {

        const head = document.querySelector("head");
        const script = document.createElement("script");

        script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js");
        head.appendChild(script);

        if (!isAuthorized) {
            let params = queryString.parse(location.search);
            if (params['accessToken'] !== undefined) {
                localStorage.setItem("user", JSON.stringify({ accessToken: params['accessToken'] }));
                UserService
                    .refreshUser()
                    .then((json) => {
                       // StorageService.setUser(json.data, () => { });
                        navigate("/dashboard");
                    })
                    .catch(() => localStorage.removeItem("user"));
            }
        } else {
            navigate("/dashboard");
        }

        return () => {
            head.removeChild(script);
        };
    }, []);

    return (
        <>
            {!isAuthorized && <>
                Поделитесь вашим контактом в Telegram, чтобы начать работу с сервисом
            </>}
        </>
    );
}

export default TelegramWidget;
