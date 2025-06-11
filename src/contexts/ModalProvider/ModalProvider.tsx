import { createContext, useState, ReactNode, useMemo, useCallback } from 'react'
import { Extra } from '@/data-contracts'
import { ModalKey } from '@/core/types/modal-key'

type ModalContextType = {
    openModal: (modalKey: ModalKey, params?: ModalParams) => void;
    closeModal: (modalKey: ModalKey) => void;
    isModalOpen: (key: ModalKey) => boolean;
    getModalParams: (key: ModalKey) => any;
};

export type AlertType = {
    title: string;
    text: string | ReactNode;
    okButtonText?: ReactNode | string;
    onOkButtonClick?: (...params: any) => void;
    onCloseButtonText?: string;
    onCancelButtonClick?: (data?: Payload) => void
    payload?: Payload
    icon?: string
};

export type Payload = Extra

export type ModalParams = Partial<AlertType> | string | Record<string, any>

type ModalState = {
    isOpen: boolean;
    params?: ModalParams;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [ openModals, setOpenModals ] = useState<Map<ModalKey, ModalState>>(new Map())

    const openModal = useCallback((modalKey: ModalKey, params?: ModalParams) => {
        setOpenModals((prev) => new Map(prev).set(modalKey, {isOpen: true, params}))
    }, [ setOpenModals ])

    const closeModal = useCallback((modalKey: ModalKey) => {
        setOpenModals((prev) => {
            const newMap = new Map(prev)
            newMap.set(modalKey, {isOpen: false})
            return newMap
        })
    }, [ setOpenModals ])

    const isModalOpen = (modalKey: ModalKey) => openModals.get(modalKey)?.isOpen || false
    const getModalParams = (modalKey: ModalKey) => openModals.get(modalKey)?.params


    const value = useMemo(() => ({
        openModal,
        closeModal,
        isModalOpen,
        getModalParams
    }), [ openModal, closeModal, isModalOpen, getModalParams ])

    return (
        <ModalContext.Provider value={ value }>
            { children }
        </ModalContext.Provider>
    )
}