// src/setup/globalSetup.ts

import Log from "../utils/logger";
import { ENV } from "../helper/env/env.config";
import { PgSsoClient } from "../../src/db/client/pg.sso.client";
import { PgSocialClient } from "../../src/db/client/pg.social.client";


export default async function globalSetup() {
  Log.info("🚀 GLOBAL SETUP STARTED");
  Log.info(`🌍 Environment: ${ENV.SYS_ENV || "local"}`);

  /**
   * 1️⃣ Validate critical environment variables
   */
  if (!ENV.BASE_API_URL_SSO) {
    throw new Error("❌ BASE_API_URL_SSO is not defined");
  } else {
    Log.info(`🌍 BASE_API_URL_SSO: ${ENV.BASE_API_URL_SSO}`);
  }

//   const ssodata = await PgSsoClient.query("SELECT 1");
//   if (!ssodata) {
//     throw new Error("❌ SSO Db connection not healthy");
//   }

//   const socialdata = await PgSocialClient.query("SELECT 1");
//   if (!socialdata) {
//     throw new Error("❌ Social Db connection not healthy");
//   }
  Log.info("✅ GLOBAL SETUP COMPLETED");
}
