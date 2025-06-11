import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { AuthorizedUserLayout } from "@components/MainHeader/components/AuthorizedUserLayout.tsx";
import { UnauthorizedUserLayout } from "@components/MainHeader/components/UnauthorizedUserLayout.tsx";
import { useAuth } from "@/core/api/api-hooks/auth/use-auth.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

export const MainHeader = ({ isLanding }) => {
  const isAuth = useAuth();
  const { isMobile } = useWindowWidth();
  const navigate = useNavigate();
  const isUserOnBlog = window.location.pathname.includes("blog");

  return (
    <header className="relative z-15 pt-[18px] pb-8 max-sm:pb-6 z-[9]">
      <div className="container">
        <div className="flex items-center justify-between gap-7 max-xs:gap-5">
          <div className="flex gap-3">
            {isMobile && isUserOnBlog ? (
              <div>
                <button
                  className="w-5 h-5 z-10 outline-none"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  <Icon
                    name={"arrowBack"}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            ) : (
              <Link
                to={"/"}
                //onClick={navToMarket}
                className="cursor-pointer relative flex-shrink-0  max-sm:px-3.5 max-sm:py-2.5 p-[14px]"
              >
                <div className="flex items-center row gap-[10px]">
                  <svg
                    width="58"
                    height="58"
                    viewBox="0 0 58 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="58"
                      height="58"
                      rx="15"
                      fill="white"
                      fill-opacity="0.05"
                    />
                    <path
                      d="M21.1608 17.3145C19.8182 16.4872 17.8623 17.3775 18.0077 18.9879L18.0501 19.4575C18.697 26.6231 20.0653 33.722 22.1382 40.6681C22.6319 42.3223 25.1131 42.4649 25.8664 40.9316L28.9853 34.5831C29.2834 33.9762 30.0074 33.5866 30.793 33.6643L38.5094 34.4265C40.2806 34.6015 41.5323 32.6066 40.1128 31.3425C34.4149 26.2683 28.2173 21.663 21.5951 17.5822L21.1608 17.3145Z"
                      fill="white"
                    />
                  </svg>
                  {!isMobile && (
                    <span className="font-extrabold text-[20px]">
                      ClickContent
                    </span>
                  )}
                </div>
              </Link>
            )}
          </div>
          {isAuth ? (
            <AuthorizedUserLayout isLanding={isLanding} />
          ) : (
            <UnauthorizedUserLayout isFooter={isLanding} />
          )}
        </div>
      </div>
    </header>
  );
};
