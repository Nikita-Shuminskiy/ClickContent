import { Outlet, useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import Layout from "@/layouts/Layout.tsx";
import Protected from "@/routing/components/Protected.tsx";

import { Fallback } from "@/routing/components/Fallback.tsx";
import ErrorBoundary from "../error-boundary.tsx";
import { protectedRoutes } from "@/routing/protected.tsx";
import { marketRoutes } from "@/routing/common.tsx";

const RoutingRoot = () => {
  const routes = [
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <Suspense fallback={Fallback}>
            <Layout isLanding={true}>
              <Outlet />
            </Layout>
          </Suspense>
        </ErrorBoundary>
      ),
      children: marketRoutes,
    },
    {
      path: "/",
      element: (
        <Protected>
          <ErrorBoundary>
            <Suspense fallback={Fallback}>
              <Layout>
                <Outlet />
              </Layout>
            </Suspense>
          </ErrorBoundary>
        </Protected>
      ),
      children: protectedRoutes,
    },
  ];

  return useRoutes(routes);
};

export default RoutingRoot;
