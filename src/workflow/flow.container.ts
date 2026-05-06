import { ServiceContainer } from "../services/service.container";
import { LoginFlow } from "../workflow/login.api.flow";
import { MediaFlow } from "./media.api.flow";
import { ProfileFlow } from "./profile.api.flow";
import { RegistrationFlow } from "./registration.flow";
import { UserFlow } from "./user.api.flow";

export class FlowContainer {
  public loginFlow: LoginFlow;
  public registrationFlow: RegistrationFlow;
  public userFlow: UserFlow
  public mediaFlow: MediaFlow
  public profileFlow: ProfileFlow

  constructor(services: ServiceContainer) {
    this.loginFlow = new LoginFlow(services);
    this.registrationFlow = new RegistrationFlow(services, this.loginFlow);
    this.userFlow = new UserFlow(services, this.loginFlow)
    this.mediaFlow = new MediaFlow(services, this.loginFlow)
    this.profileFlow = new ProfileFlow(services, this.loginFlow, this.mediaFlow)
  }
}