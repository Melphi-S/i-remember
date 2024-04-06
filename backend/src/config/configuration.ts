export default () => ({
  server: {
    port: process.env.SERVER_PORT || 3000,
    cors_origins: process.env.CORS_ORIGINS,
  },
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_NAME,
  },
  jwt: {
    key: process.env.JWT_KEY,
    ttl: process.env.JWT_TTL || '7d',
  },
  hash: {
    salt: Number(process.env.SALT) || 10,
  },
  avatar: {
    url: process.env.AVATAR_URL,
  },
  email: {
    smtp: process.env.SMTP,
    address: process.env.EMAIL,
  },
});
