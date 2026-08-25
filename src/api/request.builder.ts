import { AxiosRequestConfig, Method } from "axios";
import { TestContext } from "../../src/context/test.context";

export class RequestBuilder {

  /**
   * 🔹 Core header injection (single source of truth)
   */
  private static getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    if (TestContext.stateToken) {
      headers["state-token"] = TestContext.stateToken;
    }

    if (TestContext.ssoSession) {
      headers["Sso-Session"] = TestContext.ssoSession;
      // headers["sso-session"] = TestContext.ssoSession;
    }

    if (TestContext.accessToken) {
      headers["Authorization"] = TestContext.accessToken;
    }


  console.log(`
    ////////////////////////////////
    REQUEST BUILDER
    ///////////////////////////////
    
    ActiveUser: ${TestContext.activeUser}
    AccessToken: ${TestContext.accessToken}
    StateToken: ${TestContext.stateToken}
    SsoSession: ${TestContext.ssoSession}
  `);
    return headers;
  }

  /**
   * 🔹 Static builder (PRIMARY USAGE)
   */
  static build(config: AxiosRequestConfig): AxiosRequestConfig {
    return {
      method: config.method || 'GET',
      url: config.url,
      headers: {
        ...this.getDefaultHeaders(),
        ...(config.headers || {}) // override support
      },
      params: config.params || {},
      data: config.data || {},
      timeout: config.timeout || 10000
    };
  }

  /**
   * 🔹 Optional fluent builder (kept simple)
   */
  private config: AxiosRequestConfig = {};

  setMethod(method: Method) {
    this.config.method = method;
    return this;
  }

  setUrl(url: string) {
    this.config.url = url;
    return this;
  }

  setHeaders(headers: Record<string, string>) {
    this.config.headers = headers;
    return this;
  }

  setParams(params: Record<string, any>) {
    this.config.params = params;
    return this;
  }

  setBody(data: any) {
    this.config.data = data;
    return this;
  }

  setTimeout(timeout: number) {
    this.config.timeout = timeout;
    return this;
  }

  build(): AxiosRequestConfig {
    return RequestBuilder.build(this.config);
  }
}