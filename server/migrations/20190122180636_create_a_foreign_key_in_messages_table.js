exports.up = function(knex, Promise) {
  return knex.schema.table("messages", t => {
    t.foreign("chatroom_id")
      .references("chatrooms.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("messages", t => {
    t.dropForeign("chatroom_id");
  });
};
