import ApiService from "../api/api.service";
import { createHttpClient } from "../api/api.client";
import { LoginService } from "./login.service";
import { RegistrationService } from "./registration.service";
import { RegistrationRepo } from "../../src/db/repo/registration.repo";
import { UserServices } from "./user.services";
import { UserRepo } from "../../src/db/repo/user.repo";
import { SSORepo } from '../db/repo/sso.repo';
import { MediaServices } from "./media.services";
import { ProfileServices } from "./profile.services";
import { FeedServices } from "./feed.services";
import { StoryServices } from "./story.service";
import { StoryRepo } from "../../src/db/repo/story.repo";
import { ProfileRepo } from "../../src/db/repo/profile.repo";
import { FeedRepo } from "../../src/db/repo/feed.repo";

export class ServiceContainer {
  public ssoApi: ApiService;
  public socialApi: ApiService;


  public loginService: LoginService;
  public registrationService: RegistrationService;
  public userService: UserServices;
  public mediaService: MediaServices;
  public profileService: ProfileServices;
  public feedService: FeedServices;
  public storyService: StoryServices;

  public registrationRepo: RegistrationRepo
  public userRepo: UserRepo
  public storyRepo: StoryRepo
  public ssoRepo: SSORepo
  public profileRepo: ProfileRepo
  public feedRepo: FeedRepo

  constructor() {
    this.ssoApi = new ApiService(createHttpClient('SSO'));
    this.socialApi = new ApiService(createHttpClient('DEFAULT'));

    this.loginService = new LoginService(this.ssoApi, this.socialApi);
    this.registrationService = new RegistrationService(this.socialApi);
    this.userService = new UserServices(this.socialApi)
    this.mediaService = new MediaServices(this.socialApi)
    this.profileService = new ProfileServices(this.socialApi)
    this.feedService = new FeedServices(this.socialApi)
    this.storyService = new StoryServices(this.socialApi)


    this.registrationRepo = new RegistrationRepo()
    this.userRepo = new UserRepo()
    this.storyRepo = new StoryRepo()
    this.profileRepo = new ProfileRepo()
    this.feedRepo = new FeedRepo()
    this.ssoRepo = new SSORepo()

  }
}