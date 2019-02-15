exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          nickname: "george",
          email: "tester@tester.com",
          password:
            "$2a$12$QL0O5WxrghLbwe0eg2GeTeWibASJ/3.4IDdxxLBgAainRDqMSqug2",
          avatar:
            "https://res.cloudinary.com/wolf91/image/upload/v1548792237/chat-app/k9koev48aeaczedfi7cb.png",
          activated: true
        },
        {
          id: 2,
          nickname: "tester1",
          email: "tester1@tester.com",
          password:
            "$2a$12$QL0O5WxrghLbwe0eg2GeTeWibASJ/3.4IDdxxLBgAainRDqMSqug2",
          avatar:
            "https://res.cloudinary.com/wolf91/image/upload/v1548351286/chat-app/emuc09n2j7tdlrxsahne.png",
          activated: true
        }
      ]);
    });
};
