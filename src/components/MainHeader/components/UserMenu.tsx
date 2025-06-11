import React, {FormEvent, Fragment} from "react";
import LoadingWrapper from "@components/LoadingWrapper/LoadingWrapper.tsx";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {classNames} from "@/helpers/CssClasses.ts";
import {LayoutAvatar} from "@components/MainHeader/components/LayoutAvatar.tsx";
import {UserMenuSkeleton} from "@components/MainHeader/components/UserMenuSkeleton.tsx";
import {useModal} from "@/contexts/ModalProvider/useModal.ts";
import {ModalKey} from "@/core/types/modal-key.ts";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import {useQueryClient} from "@tanstack/react-query";
import {deleteInfoUserCookie} from "@/helpers/DeleteInfoUserCookie.ts";
import {useNavigate} from "react-router-dom";

export const UserMenu = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate()
    const {openModal} = useModal(ModalKey.PERSONAL_CABINET);
    const {isLoading} = useGetUser()


    const doLogout = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        deleteInfoUserCookie()
        queryClient.clear();
        // localStorage.clear()
        localStorage.removeItem('refresh')
        localStorage.removeItem('token')
        localStorage.setItem('userLoggedIn', 'logOut'); // todo для разлогина во всех вкладках
        window.location.reload()
    }

    return (
        <>
            <LoadingWrapper isLoading={isLoading} skeleton={<UserMenuSkeleton/>}>
                <Menu as="div" className="relative inline-block text-left">
                    <div className='flex max-semi-lg:hidden'>
                        <MenuButton>
                            <LayoutAvatar/>
                        </MenuButton>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-[16px] overflow-hidden bg-[#141414] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <MenuItem>
                                    <button
                                        onClick={() => openModal()}
                                        className={classNames(
                                            "flex items-center gap-2 text-white w-full px-4 py-2 text-left text-sm hover:bg-white/10",
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                            />
                                        </svg>
                                        Личный кабинет
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        onClick={doLogout}
                                        type="submit"
                                        className={classNames(
                                            "flex items-center gap-2 text-white w-full px-4 py-2 text-left text-sm hover:bg-white/10",
                                        )}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                            />
                                        </svg>
                                        Выйти
                                    </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </LoadingWrapper>
        </>
    )
}
