exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("avatar")
      .defaultTo("/static/images/balloons.svg")
      .alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", t => {
    t.string("avatar").alter();
  });
};
