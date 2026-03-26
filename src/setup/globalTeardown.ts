// src/setup/globalTeardown.ts
import { PgSocialClient } from '../../src/db/client/pg.social.client'
import { PgSsoClient } from '../../src/db/client/pg.sso.client'
import Log from '../utils/logger'


export default async function globalTeardown() {
  await PgSocialClient.end()
  await PgSsoClient.end()
  Log.info('🧹 Global Teardown Completed')
}