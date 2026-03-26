// src/api/api.client.ts

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import https from 'https';
import { ENV } from '../helper/env/env.config';
import { TestContext } from '../context/test.context';

type ClientType = 'DEFAULT' | 'SSO';

export function createHttpClient(type: ClientType): AxiosInstance {

  const isSSO = type === 'SSO';

  const client = axios.create({
    baseURL: isSSO
      ? ENV.BASE_API_URL_SSO // ✅ move to env (don’t hardcode)
      : ENV.BASE_API_URL_SOCIAL,

    timeout: 30000,

    headers: {
      'Content-Type': 'application/json',
      Accept: isSSO ? '*/*' : 'application/json'
    },

    httpsAgent: isSSO
      ? new https.Agent({ rejectUnauthorized: false })
      : undefined
  });

  /**
   * ============================
   * REQUEST INTERCEPTOR (MINIMAL)
   * ============================
   */
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

      // 🔹 Only lightweight step tracking
      // (No headers, no business logic)
      return config;
    }
  );

  /**
   * ============================
   * RESPONSE INTERCEPTOR
   * ============================
   */
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      TestContext.lastResponse = response; // ✅ central tracking
      return response;
    },
    (error: AxiosError) => {
      TestContext.lastResponse = error.response || null;
      return Promise.reject(error);
    }
  );

  return client;
}