// src/hooks/jest.hooks.ts

import { allure } from '../utils/allure';
import Log from '../utils/logger';
import { ENV } from '../helper/env/env.config';
import { TestContext } from '../context/test.context';
import { testLogBuffer } from '../utils/logger';
import { ServiceContainer } from '../services/service.container';
import { FlowContainer } from '../workflow/flow.container';

/**
 * ============================
 * GLOBAL SETUP
 * ============================
 */
beforeAll(() => {
  Log.info('🚀 API Test Initialization');
  Log.info(`🌍 Environment: ${ENV.SYS_ENV || 'local'}`);

  // ✅ FIX: no SSO param
  TestContext.services = new ServiceContainer();
  TestContext.flows = new FlowContainer(TestContext.services);

  TestContext.reset();
});

/**
 * ============================
 * BEFORE EACH TEST
 * ============================
 */
beforeEach(async () => {
  const testName = expect.getState().currentTestName || '';

  Log.info(`▶️ ${testName}`);

  allure.epic('API Automation');
  allure.feature('Backend APIs');
  allure.story(testName);

  if (shouldSkipLogin(testName)) {
    Log.info('⏭️ Skipping login');
    return;
  }

  // ✅ Avoid re-login
  if (!TestContext.accessToken) {
    const result = await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER);

    // ✅ CRITICAL FIX
    TestContext.accessToken = result?.accessToken;

    Log.info('🔐 Login successful');
  }
});

/**
 * ============================
 * AFTER EACH TEST
 * ============================
 */
afterEach(() => {
  attachLogs();
  testLogBuffer.clear();
});

/**
 * ============================
 * HELPERS
 * ============================
 */

function shouldSkipLogin(testName: string): boolean {
  const name = testName.toLowerCase();
  return name.includes('[no-login]') || name.includes('[public]');
}

function attachLogs() {
  allure.attachment(
    'Execution Logs',
    testLogBuffer.getAll(),
    'text/plain'
  );

  if (TestContext.lastResponse) {
    allure.attachment(
      'Last API Response',
      JSON.stringify(
        {
          status: TestContext.lastResponse.status,
          headers: TestContext.lastResponse.headers,
          body: TestContext.lastResponse.data
        },
        null,
        2
      ),
      'application/json'
    );
  }
}