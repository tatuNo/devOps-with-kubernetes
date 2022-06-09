module.exports = {
  DATABASE_URL: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres-svc:5432/${process.env.POSTGRES_USER}`,
  PORT: process.env.PORT || 3001,
}