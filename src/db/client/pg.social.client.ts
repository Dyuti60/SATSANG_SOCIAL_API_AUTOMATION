import { ENV } from '../../helper/env/env.config';
import { Pool } from 'pg';
import Log from '../../utils/logger';

export const  PgSocialClient = new Pool({
        host: ENV.PG_HOST_SOCIAL,
        port: Number(ENV.PG_PORT_SOCIAL),
        database: ENV.PG_DATABASE_SOCIAL,
        user: ENV.PG_USER_SOCIAL,
        password: ENV.PG_PASSWORD_SOCIAL,
        ssl: ENV.PG_SSL_SOCIAL === 'true' ? { rejectUnauthorized: false } : false
    });

PgSocialClient.on('connect', () => {
  Log.info('✅ Connected to PostgreSQL FOR DATA');
});

PgSocialClient.on('error', (err) => {
  Log.error('❌ PostgreSQL pool error FOR DATA', err);
});