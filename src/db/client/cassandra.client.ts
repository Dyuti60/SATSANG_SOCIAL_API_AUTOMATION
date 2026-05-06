import { Client, types } from 'cassandra-driver';
import { ENV } from '../../helper/env/env.config';
import Log from '../../utils/logger';

// 🔹 Single Cassandra Client (no keyspace here)
export const CassandraClient = new Client({
  contactPoints: ENV.CASSANDRA_CONTACT_POINTS.split(','),
  localDataCenter: ENV.CASSANDRA_DC,

  credentials: ENV.CASSANDRA_USERNAME
    ? {
        username: ENV.CASSANDRA_USERNAME,
        password: ENV.CASSANDRA_PASSWORD
      }
    : undefined,

  sslOptions:
    ENV.CASSANDRA_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined
});

// 🔹 Connect once
export const connectCassandra = async () => {
  try {
    await CassandraClient.connect();
    Log.info('✅ Connected to Cassandra');
  } catch (err) {
    Log.error('❌ Cassandra connection error', err);
    throw err;
  }
};

// 🔹 Logging
CassandraClient.on('log', (level, className, message, furtherInfo) => {
  if (level === 'error') {
    Log.error(`❌ Cassandra Error [${className}] ${message}`, furtherInfo);
  }
});

// 🔹 Keyspace Resolver
const getKeyspace = (type: 'social' | 'chat') => {
  if (type === 'social') return ENV.CASSANDRA_KEYSPACE_SOCIAL;
  if (type === 'chat') return ENV.CASSANDRA_KEYSPACE_CHAT;
  throw new Error(`Invalid keyspace type: ${type}`);
};

// 🔹 Query Wrapper (dynamic keyspace)
export const CassandraQuery = async (
  query: string,
  params: any[] = [],
  keyspaceType: 'social' | 'chat' = 'social'
) => {
  try {
    const keyspace = getKeyspace(keyspaceType);

    const result = await CassandraClient.execute(query, params, {
      prepare: true,
      keyspace // 👈 dynamically applied
    });

    return result;
  } catch (err) {
    Log.error(`❌ Cassandra query error [${keyspaceType}]`, err);
    throw err;
  }
};

// 🔹 UUID Helper
export const toUUID = (value: string) => {
  try {
    return types.Uuid.fromString(value);
  } catch (err) {
    Log.error('❌ Invalid UUID:', value);
    throw err;
  }
};

export const dedupeByKeys = (rows: any[], keys: string[]) => {
  return Array.from(
    new Map(
      rows.map((r) => [
        keys.map(k => r[k]?.toString() ?? '').join('|'),
        r
      ])
    ).values()
  );
};