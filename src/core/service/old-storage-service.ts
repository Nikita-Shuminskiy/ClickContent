import { IPaymentInfo } from "@/data-contracts.ts";

export interface ISettings {
  minPayout: number;

  minDonate: number;
  maxDonate: number;

  minQuicklink: number;
  maxQuicklink: number;
}

class OldStorageService {
  getSettings(): ISettings {
    return {
      minPayout: 500,
      minDonate: 39,
      maxDonate: 100000,
      minQuicklink: 39,
      maxQuicklink: 100000,
    };
  }

  getLocation = (): string => localStorage.getItem("location");

  clearRedirectUrl = (): any => localStorage.removeItem("redirect");

  setCreateDonateLink = (date: string | Date): any =>
    localStorage.setItem("timeCreateDonate", JSON.stringify(date));
  getCreateDonateLink = () =>
    JSON.parse(localStorage.getItem("timeCreateDonate"));

  clearPayment = (): any => localStorage.removeItem("ql_params");

  setPayments = (payment: IPaymentInfo): any => {
    let payments = JSON.parse(localStorage.getItem("payments"));
    if (!payments) payments = [];
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));
  };

  getPayments(): IPaymentInfo[] {
    const _payments = localStorage.getItem("payments");
    return _payments ? JSON.parse(_payments) : undefined;
  }

  setQuickLinkParams = (payment: IPaymentInfo) => {
    localStorage.setItem("ql_params", JSON.stringify(payment));
  };
  getQuickLinkParams = () => {
    return JSON.parse(localStorage.getItem("ql_params"));
  };

  setPoolingStarting = (): void => localStorage.setItem("pooling", "true");

  stopPooling = () => localStorage.removeItem("pooling");
  getPooling = (): string => JSON.parse(localStorage.getItem("pooling"));

  // clearSendEmail = (): any => localStorage.removeItem("emailSent")
}

export default new OldStorageService();
