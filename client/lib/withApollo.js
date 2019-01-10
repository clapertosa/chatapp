import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";

export default withApollo(({ ctx, headers, initialState }) => {
  return new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache().restore(initialState || {}),
    headers: { Cookie: headers ? headers.cookie : "" },
    credentials: "same-origin"
  });
});
