import {Link, useLocation} from "react-router-dom"
import {useUserInfoContext} from '@/contexts/UserProvider'
import {UnauthorizedUserLayout} from "@components/MainHeader/components/UnauthorizedUserLayout.tsx";
import {useAuth} from "@/core/api/api-hooks/auth/use-auth.ts";
import React from "react";
import {useWindowWidth} from "@/hooks/useWindowWidth.ts";

export const MainFooter = () => {
    const isAuth = useAuth()
    const location = useLocation()
    //for onboard
    const isDashStyle = location.pathname === "/dashboard" && isAuth
    const {isOpenMobileMenu, toggleMobileMenu} = useUserInfoContext();
    const {isMobile} = useWindowWidth();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__container">
                    <div className="flex gap-3">
                        <Link to={'/'}
                            //    onClick={navToMarket}
                              className="cursor-pointer relative  flex-shrink-0 rounded-full max-sm:px-3.5 max-sm:py-2.5 p-[14px] flex items-center gap-1.5"
                        >
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="58" height="58" rx="15" fill="white" fill-opacity="0.05"/>
                                <path
                                    d="M21.1608 17.3145C19.8182 16.4872 17.8623 17.3775 18.0077 18.9879L18.0501 19.4575C18.697 26.6231 20.0653 33.722 22.1382 40.6681C22.6319 42.3223 25.1131 42.4649 25.8664 40.9316L28.9853 34.5831C29.2834 33.9762 30.0074 33.5866 30.793 33.6643L38.5094 34.4265C40.2806 34.6015 41.5323 32.6066 40.1128 31.3425C34.4149 26.2683 28.2173 21.663 21.5951 17.5822L21.1608 17.3145Z"
                                    fill="white"/>
                            </svg>
                            {!isMobile && <span className="font-extrabold text-[20px]">ClickContent</span>}

                        </Link>
                    </div>
                    {!isAuth && <UnauthorizedUserLayout isFooter/>}
                    {isAuth && <div className={`burgerBtnUI ${isOpenMobileMenu ? "burgerBtnUI--active" : ""}`}
                                    onClick={toggleMobileMenu}>
                        <span className="burgerBtnUI__line"></span>
                    </div>}
                </div>
                <div className={`footer__bottom ${isDashStyle && "max-sm:mb-[100px]"}`}>
                    <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-[20px]">
                        <div className="footer__links">
                            {/*  <Link className='footer__link' to='agreement'>
                             Пользовательское соглашение
                             </Link>
                            <Link className="footer__link" to="/policy">
                                Политика конфиденциальности
                            </Link>
                            <Link className="footer__link" to="/terms">
                                Условия использования
                            </Link>
                            <Link className="footer__link" to="/about">
                                Об организации
                            </Link>
                            <Link className="footer__link" to="/feedback">
                                Обратная связь
                            </Link>*/}


                        </div>
                        <div className="flex flex-col max-sm:items-center items-end gap-[10px]">

                   {/*         <span className={'text-[14px] leading-[19px] font-medium text-white/50'}>
                            XPERTIZE, LTD 85 Great Portland Street, London, W1W 7LT, United Kingdom</span>*/}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
