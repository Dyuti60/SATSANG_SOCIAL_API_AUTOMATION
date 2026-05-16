import dotenv from 'dotenv';
import path from 'path';
import Log from '../../utils/logger';

// 🔥 LOAD ENV FIRST
export const loadEnv = dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

Log.info(`ENV loaded from ${path.resolve(process.cwd(), '.env')}`);

// 🔥 THEN READ VALUES
export const ENV = {
  BASE_API_URL_SSO: process.env.BASE_API_URL_SSO,
  BASE_API_URL_SOCIAL: process.env.BASE_API_URL_SOCIAL,
  LOGIN_CONTACT_NUMBER: process.env.LOGIN_CONTACT_NUMBER,
  OTHER_CONTACT_NUMBER: process.env.OTHER_CONTACT_NUMBER,
  SYS_ENV: process.env.SYS_ENV,
  PG_HOST_SSO:process.env.PG_HOST_SSO,
  PG_PORT_SSO:process.env.PG_PORT_SSO,
  PG_DATABASE_SSO:process.env.PG_DATABASE_SSO,
  PG_USER_SSO:process.env.PG_USER_SSO,
  PG_PASSWORD_SSO:process.env.PG_PASSWORD_SSO,
  PG_SSL_SSO:process.env.PG_SSL_SSO,
  PG_HOST_SOCIAL:process.env.PG_HOST_SOCIAL,
  PG_PORT_SOCIAL:process.env.PG_PORT_SOCIAL,
  PG_DATABASE_SOCIAL:process.env.PG_DATABASE_SOCIAL,
  PG_USER_SOCIAL:process.env.PG_USER_SOCIAL,
  PG_PASSWORD_SOCIAL:process.env.PG_PASSWORD_SOCIAL,
  PG_SSL_SOCIAL:process.env.PG_SSL_SOCIAL,
  CASSANDRA_CONTACT_POINTS:process.env.CASSANDRA_CONTACT_POINTS,
  CASSANDRA_DC:process.env.CASSANDRA_DC,
  CASSANDRA_KEYSPACE_CHAT:process.env.CASSANDRA_KEYSPACE_CHAT,
  CASSANDRA_KEYSPACE_SOCIAL:process.env.CASSANDRA_KEYSPACE_SOCIAL,
  CASSANDRA_USERNAME:process.env.CASSANDRA_USERNAME,
  CASSANDRA_PASSWORD:process.env.CASSANDRA_PASSWORD,
  CASSANDRA_SSL:process.env.CASSANDRA_SSL
};

// 🚨 HARD FAIL (recommended)
if (!ENV.BASE_API_URL_SSO) {
  throw new Error('❌ BASE_API_URL_SSO is not defined in .env');
}

if (!ENV.BASE_API_URL_SOCIAL) {
  throw new Error('❌ BASE_API_URL_SOCIAL is not defined in .env');
}