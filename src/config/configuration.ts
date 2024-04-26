const configuration = () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
  database: {
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  mailer: {
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
  },
});

export type ConfigurationType = ReturnType<typeof configuration>;

export default configuration;
