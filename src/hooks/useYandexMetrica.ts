import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useYandexMetrika = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.ym) {
            window.ym(97412201, 'hit', location.pathname + location.search, {
                referer: document.referrer
            });
        }
    }, [location]);
};