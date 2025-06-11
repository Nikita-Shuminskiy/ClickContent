import { MainFooter } from "@components/MainFooter/MainFooter.tsx";
import { MainHeader } from "@components/MainHeader/MainHeader.tsx";

import { useLocation } from "react-router-dom";
import React from "react";
import { ScrollToAnchor } from "@components/marketLanding/components/ScrollToAnchor.tsx";
import { PayModal } from "@/pages/PayModal/PayModal.tsx";

export default function Layout({
  children,
  isLanding,
}: {
  children: React.ReactNode;
  isLanding?: boolean;
}) {
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/authorize", "/p", "/receipt", "/go"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(
    (route) =>
      location.pathname.includes(route) &&
      location.pathname !== "/payouts" &&
      location.pathname !== "/policy",
  );

  return (
    <>
      <ScrollToAnchor />
      {!shouldHideHeaderFooter && <MainHeader isLanding={isLanding} />}
      <main className="main">{children}</main>
      {!shouldHideHeaderFooter && !isLanding && <MainFooter />}
      <PayModal />
    </>
  );
}
