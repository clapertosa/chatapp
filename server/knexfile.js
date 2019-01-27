// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "chat-app",
      user: "postgres",
      password: "password"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
