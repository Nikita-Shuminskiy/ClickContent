import { PaymentType } from "@/data-contracts";

export const paymentMethodsDictionary: Record<PaymentType, string> = {
  Card: "Карта",
  Sbp: "CБП",
  Tpay: "T-Pay",
  Other: "Карта",
};
