import axios from "axios";
import StorageService from "../core/service/storage-service.ts";
import configuration from "../config";

const httpClient = axios.create({
  baseURL: `${configuration.BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (config.url === "/auth/refresh") {
    return config;
  }
  const token = "StorageService.getUser()?.accessToken;";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default httpClient;
