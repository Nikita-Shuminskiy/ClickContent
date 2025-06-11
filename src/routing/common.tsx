import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound.tsx";
import LandingPage from "@/pages/Landing/LandingPage.tsx";
import AuthorizePage from "@/pages/Authorize/AuthorizePage.tsx";
import Policy from "@/pages/Policy/Policy.tsx";
import Terms from "@/pages/Terms/Terms.tsx";
import PaymentPage from "@/pages/new-payment-page/payment-page.tsx";

const TelegramWidget = lazy(
  () => import("@/pages/TelegramWidget/TelegramWidget.tsx"),
);
const OldReceipt = lazy(
  () => import("@/pages/Receipt/old-receipt/old-receipt"),
);

const Feedback = lazy(() => import("@/pages/Feedback/Feedback.tsx"));
const OldPaymentPage = lazy(
  () => import("@/pages/old-disign-payments-page/old-payment-page"),
);

export const marketRoutes: RouteObject[] = [
  { index: true, element: <LandingPage /> },
  {
    path: "p/:quickLinkId",
    // element: <OldPaymentPage type={'quick'}/>,
    element: <PaymentPage />,
  },
  // { path: 'receipt', element: <Receipt/> },
  // Todo старая логика
  { path: "receipt", element: <OldReceipt /> },
  { path: "policy", element: <Policy /> },
  { path: "terms", element: <Terms /> },
  { path: "authorize/:status?", element: <AuthorizePage /> },
  { path: "tg", element: <TelegramWidget /> },
  { path: "*", element: <NotFound /> },
  { path: "feedback", element: <Feedback /> },
];
