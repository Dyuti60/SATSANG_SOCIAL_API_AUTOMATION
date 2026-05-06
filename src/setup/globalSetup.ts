// src/setup/globalSetup.ts
import { ENV } from "../helper/env/env.config";
import Log from "../utils/logger";
import dotenv from 'dotenv'


export default async function globalSetup() {
  dotenv.config()
  Log.info("🚀 GLOBAL SETUP STARTED");
  Log.info(`🌍 Environment: ${ENV.SYS_ENV || "local"}`);
  Log.info(`DB HOST from env: ${process.env.PG_HOST_SOCIAL}`);


  /**
   * 1️⃣ Validate critical environment variables
   */
  if (!ENV.BASE_API_URL_SSO) {
    throw new Error("❌ BASE_API_URL_SSO is not defined");
  } else {
    Log.info(`🌍 BASE_API_URL_SSO: ${ENV.BASE_API_URL_SSO}`);
  }

  Log.info("✅ GLOBAL SETUP COMPLETED");
}
