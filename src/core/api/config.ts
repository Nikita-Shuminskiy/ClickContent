import axios, { AxiosInstance } from "axios";
import { stringify } from "qs";

import { QS_OPTIONS } from "./constants/qs-options";
import { HttpHeader } from "@/core/api/api-types/http-header.ts";
import { updateRefreshToken } from "@/core/api/endpoints/auth-api.ts";

const UI_API_URL = "https://back.clickcontent.eu/api/";
const PAYMENT_API_URL = "https://secure.clickcontent.eu/";
const AUTH_BASE_API_URL = "https://id.clickcontent.eu/";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// todo  для обработки очереди запросов после обновления токена
const processQueue = (error, token: string) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 60000,
    paramsSerializer: (params) => stringify(params, QS_OPTIONS),
  });

  instance.interceptors.request.use(
    async (config) => {
      const baseUrlsWithVersion = [AUTH_BASE_API_URL, PAYMENT_API_URL];

      const token = localStorage.getItem("token");
      if (token) {
        config.headers.set(HttpHeader.Authorization, `Bearer ${token}`);
      }
      if (baseUrlsWithVersion.includes(baseURL)) {
        config.headers.set(HttpHeader.XApiVersion, "1.0");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refresh");
      const accessToken = localStorage.getItem("token");

      const errorRefresh = error.request?.responseURL.includes("/auth/refresh");
      if (errorRefresh) {
        // todo refresh возвращает 401
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        // todo eсли токен уже обновляется, добавляем текущий запрос в очередь
        if (isRefreshing) {
          try {
            // todo возвращаем новый Promise, чтобы запросы в очереди ожидали обновления токена
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers.set(
              HttpHeader.Authorization,
              `Bearer ${token}`,
            );
            return instance(originalRequest);
          } catch (err) {
            // todo произошла ошибка при обработке очереди
            return Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;
        try {
          const { data } = await updateRefreshToken({
            refreshToken,
            accessToken,
          });

          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refresh", data.refreshToken);

          // todo обрабатываем очередь запросов (запускаем) запросы с новым токеном
          processQueue(null, data.accessToken);

          // todo добавляем новый токен в заголовки текущего запроса и повторяем его
          originalRequest.headers.set(
            HttpHeader.Authorization,
            `Bearer ${data.accessToken}`,
          );
          return instance(originalRequest);
        } catch (err) {
          // todo отклоняем все запросы в очереди
          processQueue(err, null);
          localStorage.clear();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
  return instance;
};

const authInstance = createAxiosInstance(AUTH_BASE_API_URL);
const paymentInstance = createAxiosInstance(PAYMENT_API_URL);
const uiInstance = createAxiosInstance(UI_API_URL);

export { authInstance, paymentInstance, uiInstance };
