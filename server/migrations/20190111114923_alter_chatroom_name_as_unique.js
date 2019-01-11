exports.up = function(knex, Promise) {
  return knex.schema.alterTable("chatroom", t => {
    t.string("name", 20)
      .notNullable()
      .unique()
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("chatroom", t => {
    t.string("name", 20)
      .notNullable()
      .alter();
  });
};
