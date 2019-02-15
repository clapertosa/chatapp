const app = require("express")();
const compression = require("compression");
const session = require("express-session");
const client = require("redis").createClient(
  process.env.REDIS_URL || { host: "redis" }
);
const RedisStore = require("connect-redis")(session);
const helmet = require("helmet");
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { Users } = require("./utils/users");
const keys = require("./config/keys");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "client" });
const nextHandler = nextApp.getRequestHandler();

const users = new Users();
io.on("connection", socket => {
  socket.on("join", ({ chatroom, user }) => {
    socket.join(chatroom.id);
    users.addUser(user, chatroom.id, socket.id);
  });

  socket.on("getUsers", chatroomId => {
    io.to(chatroomId).emit("users", users.getUsersList(chatroomId));
  });

  socket.on("createMessage", message => {
    io.to(message.chatroomId).emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.chatroomId).emit("users", users.getUsersList(user.chatroomId));
    }
  });
});

nextApp.prepare().then(() => {
  // Trust first proxy if in production
  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  // Gzip compression
  app.use(compression());

  // express-session config
  app.use(
    session({
      store:
        process.env.NODE_ENV === "production"
          ? new RedisStore({ url: process.env.REDIS_URL })
          : new RedisStore({ host: "localhost", port: 6379, client }),
      secret: keys.SESSION_SECRET,
      resave: false,
      unset: "destroy",
      saveUninitialized: false,
      name: "qob",
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    })
  );

  // Helmet config
  app.use(helmet({ hidePoweredBy: { setTo: "Cheri Lady" } }));

  // GraphQL config
  app.use("/graphql", (req, res) => {
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: process.env.NODE_ENV !== "production",
      context: { req, res },
      formatError: error => {
        if (!error.originalError) return error;
        return { error, type: error.originalError.type };
      }
    })(req, res);
  });

  // Clean url for chatrooms
  app.get("/chatroom/:name", (req, res) => {
    const actualPage = "/chatroom";
    const queryParams = { name: req.params.name };
    nextApp.render(req, res, actualPage, queryParams);
  });

  app.get("/settings/chatroom/:name", (req, res) => {
    const actualPage = "/settings/chatroom";
    const queryParams = { name: req.params.name };
    nextApp.render(req, res, actualPage, queryParams);
  });

  app.get("/access/chatroom/:name", (req, res) => {
    const actualPage = "/access/chatroom";
    const queryParams = { name: req.params.name };
    nextApp.render(req, res, actualPage, queryParams);
  });

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port: ${port}`);
  });
});
