import ApiService from "../api/api.service";
import { createHttpClient } from "../api/api.client";
import { LoginService } from "./login.service";
import { RegistrationService } from "./registration.service";
import { RegistrationRepo } from "../../src/db/repo/registration.repo";

export class ServiceContainer {
  public ssoApi: ApiService;
  public socialApi: ApiService;


  public loginService: LoginService;
  public registrationService: RegistrationService;

  public registrationRepo: RegistrationRepo

  constructor() {
    this.ssoApi = new ApiService(createHttpClient('SSO'));
    this.socialApi = new ApiService(createHttpClient('DEFAULT'));

    this.loginService = new LoginService(this.ssoApi, this.socialApi);
    this.registrationService = new RegistrationService(this.socialApi);

    this.registrationRepo = new RegistrationRepo()
  }
}