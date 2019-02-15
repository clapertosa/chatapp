// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "postgres",
      user: "postgres",
      password: "postgres",
      port: "",
      database: "chat-app"
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
