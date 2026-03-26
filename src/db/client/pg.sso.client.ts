import { Pool } from 'pg';
import { ENV } from '../../helper/env/env.config';
import Log from '../../utils/logger';

export const PgSsoClient = new Pool({
        host: ENV.PG_HOST_SSO,
        port: Number(ENV.PG_PORT_SSO),
        database: ENV.PG_DATABASE_SSO,
        user: ENV.PG_USER_SSO,
        password: ENV.PG_PASSWORD_SSO,
        ssl: ENV.PG_SSL_SSO === 'true' ? { rejectUnauthorized: false } : false
    });

PgSsoClient.on('connect', () => {
  Log.info('✅ Connected to PostgreSQL FOR DATA');
});

PgSsoClient.on('error', (err) => {
  Log.error('❌ PostgreSQL pool error FOR DATA', err);
});
