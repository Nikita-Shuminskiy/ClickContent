import { useContext } from "react";
import { ModalContext, ModalParams } from "./ModalProvider";
import { ModalKey } from "@/core/types/modal-key";

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const useModal = (modalKey: ModalKey) => {
  const { openModal, closeModal, isModalOpen, getModalParams } =
    useModalContext();
  return {
    openModal: (params?: ModalParams) => openModal(modalKey, params),
    closeModal: () => closeModal(modalKey),
    isModalOpen: isModalOpen(modalKey),
    modalParams: getModalParams(modalKey),
  };
};
