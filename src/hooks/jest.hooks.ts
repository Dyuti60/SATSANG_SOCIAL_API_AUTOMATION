// src/hooks/jest.hooks.ts
import { ENV } from '../helper/env/env.config';
import { allure } from '../utils/allure';
import Log from '../utils/logger';
import { TestContext } from '../context/test.context';
import { testLogBuffer } from '../utils/logger';
import { ServiceContainer } from '../services/service.container';
import { FlowContainer } from '../workflow/flow.container';
import { PgSocialClient } from '../../src/db/client/pg.social.client';
import { PgSsoClient } from '../../src/db/client/pg.sso.client';

/**
 * ============================
 * GLOBAL SETUP
 * ============================
 */
beforeAll(async() => {
  Log.info('🚀 API Test Initialization');
  Log.info(`🌍 Environment: ${ENV.SYS_ENV || 'local'}`);
  Log.info('In Before All Section')

  // ✅ FIX: no SSO param
  TestContext.services = new ServiceContainer();
  TestContext.flows = new FlowContainer(TestContext.services);

  TestContext.initialDetailsReset();
  TestContext.currentDetailsReset();
  await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER,'','initial user');

  Log.info(`Access Token in Hooks File - ${ENV.LOGIN_CONTACT_NUMBER} - ${TestContext.initialAccessToken}`)
  Log.info(`Other Details: ${TestContext.initialMemuuid}, ${TestContext.initialFamilyCode}, ${TestContext.initialMemberCode}, ${TestContext.initialFirstName}, ${TestContext.initialLastName}`)
  Log.info('🔐 Login successful');

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

  if (!TestContext.initialAccessToken) {
    await TestContext.flows.loginFlow.loginFlow(ENV.LOGIN_CONTACT_NUMBER,'','initial user');
  }

  console.log(`Access Token in Hooks File - ${ENV.LOGIN_CONTACT_NUMBER} - ${TestContext.initialAccessToken}`)
  console.log(`Other Details: ${TestContext.initialMemuuid}, ${TestContext.initialFamilyCode}, ${TestContext.initialMemberCode}, ${TestContext.initialFirstName}, ${TestContext.initialLastName}`)
  Log.info('🔐 Login Before Test Case Successful');
});

/**
 * ============================
 * AFTER EACH TEST
 * ============================
 */
afterEach(() => {
  attachLogs();
  testLogBuffer.clear();
  TestContext.useInitialUser();
});


afterAll(async () => {
  jest.clearAllTimers();

  await PgSocialClient.end();
  await PgSsoClient.end();

  const http = require("http");
  const https = require("https");

  http.globalAgent.destroy();
  https.globalAgent.destroy();
  TestContext.currentDetailsReset();
  TestContext.initialDetailsReset();
})
/**
 * ============================
 * HELPERS
 * ============================
 */

function shouldSkipLogin(testName: string): boolean {
  const name = testName.toLowerCase();
  return name.includes('[no-test-login]') || name.includes('[public]');
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