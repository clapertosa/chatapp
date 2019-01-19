exports.up = function(knex, Promise) {
  return knex.schema.alterTable("messages", t => {
    t.text("message")
      .notNullable()
      .defaultTo("");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("messages", t => {
    t.dropColumn("message");
  });
};
