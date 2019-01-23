exports.up = function(knex, Promise) {
  return knex.schema.table("messages", t => {
    t.dropForeign("chatroom_id");
  });
};

exports.down = function(knex, Promise) {
  return;
};
