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
});

export type ConfigurationType = ReturnType<typeof configuration>;

export default configuration;
