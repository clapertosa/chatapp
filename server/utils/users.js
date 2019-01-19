class Users {
  constructor() {
    this.users = [];
  }

  addUser(user, chatroomId, socketId) {
    this.users.push({ user, chatroomId, socketId });
  }

  removeUser(socketId) {
    const user = this.getUser(socketId);

    if (user) {
      this.users = this.users.filter(user => user.socketId !== socketId);
    }

    return user;
  }

  getUser(socketId) {
    return this.users.filter(user => user.socketId === socketId)[0];
  }

  getUsersList(chatroomId) {
    return this.users.filter(user => user.chatroomId === chatroomId);
  }
}

module.exports = { Users };
