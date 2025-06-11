import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "@/contexts/UserProvider.tsx";
import { LoginModalProvider } from "@/contexts/LoginModalContext.tsx";
import { YMProvider } from "@/contexts/YMProvider/YMProvider.tsx";

import { queryClient } from "./core/configs/query-client-config/query-client-config.ts";
import { AlertProvider } from "./contexts/AlertProvider/AlertProvider.tsx";
import App from "./App.tsx";
import "./i18n";
import "./styles/style.scss";
import { ModalProvider } from "@/contexts/ModalProvider/ModalProvider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <YMProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AlertProvider>
            <UserProvider>
              <LoginModalProvider>
                <App />
              </LoginModalProvider>
            </UserProvider>
          </AlertProvider>
        </ModalProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </YMProvider>
  </BrowserRouter>,
);
