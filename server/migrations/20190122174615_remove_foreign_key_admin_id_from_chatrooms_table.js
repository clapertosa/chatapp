exports.up = function(knex, Promise) {
  return knex.schema.table("chatrooms", t => {
    t.dropForeign("admin_id", "chatroom_admin_id_foreign");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("chatrooms", t => {
    t.foreign("admin_id").references("users.id");
  });
};
