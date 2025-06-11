import { RouteObject } from "react-router-dom";
import React, { lazy } from "react";
import Withdraw from "@/pages/Withdraw/Withdraw.tsx";

const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Payouts = lazy(() => import("@/pages/Payouts/Payouts.tsx"));
const Quicklinks = lazy(() => import("@/pages/Quicklinks/Quicklinks.tsx"));

const Contractors = lazy(() => import("@/pages/Contactors/Contractors.tsx"));
//const Setting = lazy(() => import('@/pages/Setting/Setting.tsx'));
//const Ads = lazy(() => import('@/pages/Ads/Ads.tsx'));

const Steps = lazy(() => import("@/pages/Steps/Steps.tsx"));
const PassportDetails = lazy(
  () => import("@/pages/PassportDetails/PassportDetails.tsx"),
);

export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    index: true,
    element: <Dashboard />,
  },
  { path: "/payouts", element: <Payouts /> },
  { path: "/quicklinks", element: <Quicklinks /> },
  { path: "/contractors", element: <Contractors /> },
  /*  {path: '/settings', element: <Setting/>},*/ //todo коммент кликсы (на долго)
  //  {path: '/ads', element: <Ads/>} todo коммент всю рекламу (на долго),
  { path: "/steps", element: <Steps /> },
  { path: "/passport", element: <PassportDetails /> },
  { path: "/withdraw", element: <Withdraw /> },
];
