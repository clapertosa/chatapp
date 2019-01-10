exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments(),
      t
        .string("nickname", 16)
        .notNullable()
        .unique(),
      t
        .string("email")
        .notNullable()
        .unique(),
      t.string("password").notNullable(),
      t.string("avatar"),
      t
        .boolean("activated")
        .notNullable()
        .defaultTo(false),
      t.string("reset_token"),
      t.timestamp("reset_token_expiration"),
      t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
