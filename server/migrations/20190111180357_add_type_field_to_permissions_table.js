exports.up = function(knex, Promise) {
  return knex.schema.alterTable("permissions", t => {
    t.string("type", 20)
      .notNullable()
      .defaultTo("USER");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("permissions", t => {
    t.dropColumn("type");
  });
};
