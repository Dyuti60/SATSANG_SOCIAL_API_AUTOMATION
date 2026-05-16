import { ServiceContainer } from "../services/service.container";
import { LoginFlow } from "../workflow/login.api.flow";
import { FeedFlow } from "./feed.api.flow";
import { MediaFlow } from "./media.api.flow";
import { ProfileFlow } from "./profile.api.flow";
import { RegistrationFlow } from "./registration.flow";
import { StoryFlow } from "./story.api.flow";
import { UserFlow } from "./user.api.flow";

export class FlowContainer {
  public loginFlow: LoginFlow;
  public registrationFlow: RegistrationFlow;
  public userFlow: UserFlow
  public mediaFlow: MediaFlow
  public profileFlow: ProfileFlow
  public feedFlow: FeedFlow
  public storyFlow: StoryFlow

  constructor(services: ServiceContainer) {
    this.loginFlow = new LoginFlow(services);
    this.registrationFlow = new RegistrationFlow(services, this.loginFlow);
    this.userFlow = new UserFlow(services, this.loginFlow)
    this.mediaFlow = new MediaFlow(services, this.loginFlow)
    this.profileFlow = new ProfileFlow(services, this.loginFlow, this.mediaFlow)
    this.feedFlow = new FeedFlow(services, this.loginFlow, this.mediaFlow)
    this.storyFlow = new StoryFlow(services, this.loginFlow, this.mediaFlow)
  }
}