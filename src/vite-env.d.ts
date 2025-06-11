/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
        VITE_SECRET_KEY: string;
        VITE_APP_GOOGLE_RECAPTCHA_SITE_KEY: string;
    }
}