const app = require("express")();
const session = require("express-session");
const client = require("redis").createClient(process.env.REDIS_URL);
const RedisStore = require("connect-redis")(session);
const graphqlHTTP = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const keys = require("./config/keys");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "client" });
const nextHandler = nextApp.getRequestHandler();

io.on("connect", socket => {
  console.log("Connected to socket.io!");
});

nextApp.prepare().then(() => {
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

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
