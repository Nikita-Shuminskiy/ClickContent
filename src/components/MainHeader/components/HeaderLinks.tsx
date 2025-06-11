import { HeaderLinksType } from "@/constants/headerLinks.ts";
import { NavLink, useLocation } from "react-router-dom";
import { useLoginModalContext } from "@/contexts/LoginModalContext.tsx";
import { AuthGuard } from "@/contexts/AuthGuardProvider/AuthGuard.tsx";
import { useAuth } from "@/core/api/api-hooks/auth/use-auth.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

export const HeaderLinks = ({
  headerLinks,
}: {
  headerLinks: HeaderLinksType[];
}) => {
  const location = useLocation();
  const isAuth = useAuth();
  const { openLoginModal } = useLoginModalContext();

  const handleOpenModal = (to: string) => {
    if (!isAuth && to === "/") {
      openLoginModal();
    }
  };

  return (
    <ul
      className={`header-menu__list grid-cols-3 ${
        isAuth ? "max-semi-lg:grid" : "max-semi-lg:hidden"
      } flex items-center gap-[60px] max-md:gap-3 max-sm:gap-1 max-lg:gap-5 max-xl:gap-7 max-upper-xl:gap-12`}
    >
      {headerLinks.map((link, i) => {
        const { to, text, img } = link;

        const isLinkActive =
          location.pathname + location.hash === to ||
          link.additionalLinks?.some((path) =>
            location.pathname.startsWith(path),
          );

        return (
          <AuthGuard
            authRequired={link.authRequired}
            key={`${i}-${link?.text}`}
          >
            <li>
              <NavLink
                onClick={() => handleOpenModal(to)}
                className={({ isActive: navLinkIsActive }) =>
                  `flex flex-col items-center gap-1 font-firstNeue  text-white transition-opacity hover:opacity-70 whitespace-nowrap truncate ${
                    navLinkIsActive ? "lg:opacity-100" : "lg:opacity-50"
                  } max-semi-lg:w-full max-semi-lg:p-3 max-semi-lg:bg-[#1A1A1A] max-semi-lg:rounded-2xl max-sm:text-sm  ${
                    link.additionalLinks
                      ? !isLinkActive || (!navLinkIsActive && !isLinkActive)
                        ? "2xl:opacity-50"
                        : ""
                      : !navLinkIsActive || !isLinkActive
                      ? "2xl:opacity-50"
                      : ""
                  }`
                }
                to={to}
              >
                <Icon
                  name={img as any}
                  className="hidden w-6 h-6 flex-shrink-0 max-semi-lg:block"
                />
                {text}
              </NavLink>
            </li>
          </AuthGuard>
        );
      })}
    </ul>
  );
};
