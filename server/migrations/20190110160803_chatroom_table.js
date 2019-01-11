exports.up = function(knex, Promise) {
  return knex.schema.createTable("chatroom", t => {
    t.increments();
    t.string("name", 20).notNullable();
    t.string("password");
    t.boolean("protected")
      .notNullable()
      .defaultTo(false);
    t.integer("admin_id")
      .references("id")
      .inTable("users")
      .notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("chatroom");
};
