exports.up = function(knex, Promise) {
  return knex.schema.createTable("permissions", t => {
    t.increments();
    t.integer("chatroom_id")
      .references("id")
      .inTable("chatroom")
      .notNullable();
    t.integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("permissions");
};
