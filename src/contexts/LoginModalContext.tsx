import React, { createContext, useContext, useEffect, useState } from "react";
import LoginModal from "@/pages/Login/Login.tsx";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams.ts";

export type AddCardProviderProps = {
  children: React.ReactNode | any;
};

export type LoginModalContextType = {
  open?: boolean;
  isFromPayment?: boolean;
  openLoginModal?: (isFromPayment?: boolean) => void;
  closeLoginModal?: () => void;
};

const LoginModalContext = createContext<LoginModalContextType>({});

export const useLoginModalContext = () => {
  return useContext(LoginModalContext);
};

export const LoginModalProvider = React.memo(
  ({ children }: AddCardProviderProps) => {
    const { params } = useUpdateSearchParams();
    const [open, setOpen] = useState(Boolean(params.get("open")) ?? false);
    const [isFromPayment, setIsFromPayment] = useState(false);

    const openLoginModal = (isFromPayment?: boolean) => {
      if (isFromPayment) setIsFromPayment(isFromPayment);
      setOpen(true);
    };

    const closeLoginModal = () => {
      setOpen(false);
    };
    useEffect(() => {
      params.get("open") && setOpen(true);
    }, [params]);

    return (
      <LoginModalContext.Provider
        value={{ open, openLoginModal, closeLoginModal }}
      >
        <LoginModal
          isOpen={open}
          setIsOpenLogin={setOpen}
          isFromPayment={isFromPayment}
        />
        {children}
      </LoginModalContext.Provider>
    );
  },
);
