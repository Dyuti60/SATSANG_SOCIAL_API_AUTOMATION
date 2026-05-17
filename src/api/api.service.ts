import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { allure } from '../utils/allure'
import Log from '../utils/logger'
import { TestContext } from '../context/test.context'

function safeJson(data: any) {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return "Unable to stringify data";
  }
}

function maskHeaders(headers: any = {}) {
  const clone = { ...headers };

  const maskValue = (value: string) => {
    if (!value || value.length <= 10) return value;
    return `****${value.slice(-10)}`;
  };

  if (clone.Authorization) {
    clone.Authorization = maskValue(clone.Authorization);
  }

  if (clone['state-token']) {
    clone['state-token'] = maskValue(clone['state-token']);
  }

  if (clone['Sso-Session']) {
    clone['Sso-Session'] = maskValue(clone['Sso-Session']);
  }

  return clone;
}

export default class ApiService {
  constructor(private client: AxiosInstance) {}

  async request<T = any>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {

    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const start = Date.now()

    const requestDetails = {
      method: (config.method || 'GET').toUpperCase(),
      url: config.url,
      headers: maskHeaders(config.headers),
      params: config.params ?? {},
      body: config.data ?? null
    }

    Log.info(`[${requestId}] API REQUEST → ${requestDetails.method} ${requestDetails.url}`)

    allure.attachment(
      `Request: ${requestDetails.method} ${requestDetails.url}`,
      safeJson(requestDetails),
      'application/json'
    )

    try {
      const response = await this.client.request<T>(config)

      const duration = Date.now() - start

      TestContext.lastResponse = response

      Log.info(`[${requestId}] API RESPONSE → ${response.status} ${config.url}`)
      Log.info(`[${requestId}] ⏱️ ${duration} ms`)

      allure.attachment(
        `Response: ${config.url}`,
        safeJson({
          status: response.status,
          headers: response.headers,
          body: response.data
        }),
        'application/json'
      )

      return response

    } catch (error: any) {

      if (error?.response) {

        const duration = Date.now() - start

        TestContext.lastResponse = error.response

        Log.error(`[${requestId}] API ERROR → ${error.response.status} ${config.url}`)
        Log.error(`[${requestId}] ⏱️ ${duration} ms`)

        allure.attachment(
          `Error Response: ${config.url}`,
          safeJson({
            status: error.response.status,
            headers: error.response.headers,
            body: error.response.data
          }),
          'application/json'
        )

        return error.response as AxiosResponse
      }

      Log.error(`[${requestId}] API ERROR → ${error.message}`)
      throw new Error(
        `API failed without response: ${error.message}`
      )
    }
  }
}