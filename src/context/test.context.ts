// src/context/test.context.ts

import { AxiosResponse } from 'axios';
import { ServiceContainer } from '../services/service.container';
import { FlowContainer } from '../workflow/flow.container';

export class TestContext {
  // 🔐 Auth
  static accessToken: string = '';
  static stateToken: string = '';
  static ssoSession: string = '';

  // 📦 Last API response
  static lastResponse: AxiosResponse | null = null;

  // 🧩 Containers
  static services: ServiceContainer;
  static flows: FlowContainer;

  static reset() {
    this.accessToken = '';
    this.stateToken = '';
    this.ssoSession = '';
    this.lastResponse = null;
  }
}