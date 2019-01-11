exports.up = function(knex, Promise) {
  return knex.schema.createTable("messages", t => {
    t.increments();
    t.integer("chatroom_id")
      .references("id")
      .inTable("chatroom")
      .notNullable();
    t.integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
    t.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("messages");
};
