declare namespace NodeJS {
  interface ProcessEnv {
    BASE_API_URL_SSO: string;
    BASE_API_URL_SOCIAL: string;
    LOGIN_CONTACT_NUMBER:string;
    OTHER_CONTACT_NUMBER:string;
    SYS_ENV:string,
    PG_HOST_SSO:string;
    PG_PORT_SSO:number;
    PG_DATABASE_SSO:string;
    PG_USER_SSO:string;
    PG_PASSWORD_SSO:string;
    PG_SSL_SSO:string;
    PG_HOST_SOCIAL:string;
    PG_PORT_SOCIAL:number;
    PG_DATABASE_SOCIAL:string;
    PG_USER_SOCIAL:string;
    PG_PASSWORD_SOCIAL:string;
    PG_SSL_SOCIAL:string;
    CASSANDRA_CONTACT_POINTS:string
    CASSANDRA_DC:string
    CASSANDRA_KEYSPACE_CHAT:string
    CASSANDRA_KEYSPACE_SOCIAL:string
    CASSANDRA_USERNAME:string
    CASSANDRA_PASSWORD:string,
    CASSANDRA_SSL:string
  }
}