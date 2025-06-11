import {useLoginModalContext} from "@/contexts/LoginModalContext.tsx";
import {useUpdateSearchParams} from "@/hooks/useUpdateSearchParams.ts";
import {landingHeaderLinks} from "@/constants/headerLinks.ts";
import {HeaderLinks} from "@components/MainHeader/components/HeaderLinks.tsx";

export const UnauthorizedUserLayout = ({isFooter}: { isFooter?: boolean }) => {
    const {openLoginModal} = useLoginModalContext()

    const onHandleClick = () => {
        openLoginModal()
    }
    return (
        <>
            {!isFooter && <HeaderLinks headerLinks={landingHeaderLinks}/>}
            <button
                onClick={onHandleClick}
                className={
                    "max-w-[117px] z-[999] py-[24px] px-[32px] w-full text-base text-center rounded-[60px] text-black bg-white max-sm:max-w-fit max-sm:text-sm max-sm:text-right max-sm:font-firstNeue"
                }
            >
               Войти
            </button>
        </>
    )
}
