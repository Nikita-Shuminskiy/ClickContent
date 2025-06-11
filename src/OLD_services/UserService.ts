import configuration from "../config";
import { IAimsInfo } from "@/OLD_models/responses/IAimsInfo";
import axios from "./axios";

class UserService {
  public async getQuickLink(id: string) {
    const response = await axios.get(
      //IQuicklinkInfo
      `${configuration.API_URL}/v2/donates/quicklink/${id}`,
    );
    return response;
  }

  public async removeAim(id: string) {
    const response = await axios.delete(
      `${configuration.API_URL}/v2/donates/aim/${id}`,
    );
    return response;
  }

  public async getAim(id: string) {
    const response = await axios.get<IAimsInfo>(
      `${configuration.API_URL}/v2/donates/aim/${id}`,
    );
    return response;
  }

  public async editDonate(amount: number, thanksText: string) {
    const response = await axios.post<IAimsInfo>(
      `${configuration.API_URL}/v2/donates`,
      { amount, thanksText },
    );
    return response;
  }

  public async getUtms() {
    const response = await axios.get(
      `${configuration.API_URL}/payment/purchase/finances/incoming/utm`,
    );
    return response;
  }

  public async getPaymentPayouts(from: string, to: string) {
    const response = await axios.get(
      `${configuration.API_URL}/payment/purchase/finances/payouts?period=SelectedPeriod&from=${from}&to=${to}`,
    );
    return response;
  }

  public async refreshUser(token?: string) {
    const response = await axios.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  public async withdraw() {
    const response = await axios.post(
      `${configuration.API_URL}/payment/withdraw`,
      {},
    );
    return response;
  }
}

export default new UserService();
