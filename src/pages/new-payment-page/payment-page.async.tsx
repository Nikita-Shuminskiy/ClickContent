import { lazy } from "react";

const PaymentPageAsync = lazy(() => import("./payment-page.tsx"));

export { PaymentPageAsync as PaymentPage };
