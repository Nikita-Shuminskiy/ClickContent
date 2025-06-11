import {useLocation, useNavigate} from "react-router-dom";
import {useUserInfoContext} from "@/contexts/UserProvider.tsx";
import {FormEvent, useEffect} from "react";
import {deleteInfoUserCookie} from "@/helpers/DeleteInfoUserCookie.ts";
import {authorizedHeaderLinks, landingHeaderLinks} from "@/constants/headerLinks.ts";
import {ModalUI} from "@components/ui/ModalUI";
import {HeaderLinks} from "@components/MainHeader/components/HeaderLinks.tsx";
import {UserMenu} from "@components/MainHeader/components/UserMenu.tsx";
import PersonalCabinetModal from "@components/PersonalCabinetModal/PersonalCabinetModal.tsx";
import {useModal} from "@/contexts/ModalProvider/useModal.ts";
import {ModalKey} from "@/core/types/modal-key.ts";
import {LayoutAvatar} from "@components/MainHeader/components/LayoutAvatar.tsx";
import {useAuth} from "@/core/api/api-hooks/auth/use-auth.ts";
import {useQueryClient} from "@tanstack/react-query";
import {Icon} from "@components/ui/icon/icon.tsx";

export const AuthorizedUserLayout = ({isLanding}) => {
    const nav = useNavigate()
    const queryClient = useQueryClient();
    const isAuth = useAuth()
    const location = useLocation()

    const {openModal} = useModal(ModalKey.PERSONAL_CABINET);
    const {isOpenMobileMenu, setIsOpenMobileMenu, toggleMobileMenu} = useUserInfoContext();

    const currentLinks = (isLanding && isAuth) || !isAuth ? landingHeaderLinks : authorizedHeaderLinks

    const doLogout = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        deleteInfoUserCookie()
        queryClient.clear();
        localStorage.clear()
        localStorage.setItem('userLoggedIn', 'logOut'); // todo для разлогина во всех вкладках
        window.location.reload()
    }

    useEffect(() => {
        if (isOpenMobileMenu) {
            setIsOpenMobileMenu(false)
        }
    }, [location])

    return (
        <>
            <nav className="header-menu">
                <HeaderLinks headerLinks={currentLinks}/>
            </nav>
            <div className="flex items-center gap-5 relative ">
                <div className="max-semi-lg:hidden flex">
                    <UserMenu/>
                </div>
                <button
                    className={`burgerBtnUI ${isOpenMobileMenu ? "burgerBtnUI--active" : ""}`}
                    onClick={toggleMobileMenu}
                >
                    <span className="burgerBtnUI__line"></span>
                </button>
            </div>
            <ModalUI
                hasCloseBtn={false}
                isBottomScreen
                isOpen={isOpenMobileMenu}
                maxWidth={1024}
                setOpen={(boolean) => {
                    setIsOpenMobileMenu(boolean)
                }}
            >
                <div className="flex flex-col gap-2 mb-6">
                    <LayoutAvatar/>
                    <div className="flex justify-center">
                        <button
                            className="flex items-center justify-center gap-1 text-sm text-[#5F5F5F]"
                            onClick={() => openModal()}
                        >
                            <Icon name={'editIcon'}  className="w-4 h-4 opacity-50 flex-shrink-0 object-cover"/>
                            Редактировать
                        </button>
                    </div>
                </div>
                <div className="mb-[103px]">
                    <HeaderLinks headerLinks={currentLinks}/>
                </div>

                <div className="text-center">
                    <button onClick={doLogout} className="text-base text-[#5F5F5F]">Выход</button>
                </div>
            </ModalUI>
            <PersonalCabinetModal/>
        </>
    )
}
