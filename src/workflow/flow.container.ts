import { ServiceContainer } from "../services/service.container";
import { LoginFlow } from "../workflow/login.api.flow";
import { RegistrationFlow } from "./registration.flow";

export class FlowContainer {
  public loginFlow: LoginFlow;
  public registrationFlow: RegistrationFlow;

  constructor(services: ServiceContainer) {
    this.loginFlow = new LoginFlow(services);
    this.registrationFlow = new RegistrationFlow(services, this.loginFlow);
  }
}