// src/context/test.context.ts

import { AxiosResponse } from 'axios';
import { ServiceContainer } from '../services/service.container';
import { FlowContainer } from '../workflow/flow.container';

export class TestContext {

  // 🧩 Containers
  static services: ServiceContainer;
  static flows: FlowContainer;

  /**
   * =====================================
   * 🔁 ACTIVE USER CONTEXT (NEW)
   * =====================================
   */
  static activeUser: 'initial' | 'current' = 'initial';

  static useInitialUser() {
    this.activeUser = 'initial';
  }

  static useCurrentUser() {
    this.activeUser = 'current';
  }

  /**
   * =====================================
   * 🔐 INITIAL USER (DEFAULT LOGIN)
   * =====================================
   */
  static initialAccessToken: string = '';
  static initialStateToken: string = '';
  static initialSsoSession: string = '';
  static initialMemuuid: string = '';
  static initialFamilyCode: string = '';
  static initialMemberCode: string = '';
  static initialFirstName: string = '';
  static initialLastName: string = '';

  static initialDetailsReset() {
    this.initialAccessToken = '';
    this.initialStateToken = '';
    this.initialSsoSession = '';
    this.initialMemuuid = '';
    this.initialFamilyCode = '';
    this.initialMemberCode = '';
    this.initialFirstName = '';
    this.initialLastName = '';

  }

  /**
   * =====================================
   * 🔐 CURRENT USER (RUNTIME USER)
   * =====================================
   */
  static currentAccessToken: string = '';
  static currentStateToken: string = '';
  static currentSsoSession: string = '';

  static currentMemuuid: string = '';
  static currentFamilyCode: string = '';
  static currentMemberCode: string = '';
  static currentFirstName: string = '';
  static currentLastName: string = '';

  static currentDetailsReset() {
    this.currentAccessToken = '';
    this.currentStateToken = '';
    this.currentSsoSession = '';
    this.currentMemuuid = '';
    this.currentFamilyCode = '';
    this.currentMemberCode = '';
    this.currentFirstName = '';
    this.currentLastName = '';
  }

  /**
   * =====================================
   * 🎯 DYNAMIC TOKEN RESOLUTION (KEY PART)
   * =====================================
   */

  static get accessToken(): string {
    return this.activeUser === 'current'
      ? this.currentAccessToken
      : this.initialAccessToken;
  }

  static get stateToken(): string {
    return this.activeUser === 'current'
      ? this.currentStateToken
      : this.initialStateToken;
  }

  static get ssoSession(): string {
    return this.activeUser === 'current'
      ? this.currentSsoSession
      : this.initialSsoSession;
  }


  /**
   * =====================================
   * 📦 LAST RESPONSE TRACKING
   * =====================================
   */
  static lastResponse: AxiosResponse | null = null;
}