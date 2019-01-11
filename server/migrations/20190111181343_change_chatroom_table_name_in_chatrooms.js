exports.up = function(knex, Promise) {
  return knex.schema.renameTable("chatroom", "chatrooms");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("chatrooms", "chatroom");
};
