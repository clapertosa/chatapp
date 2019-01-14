import App, { Container } from "next/app";
import withApollo from "../lib/withApollo";
import { ApolloProvider } from "react-apollo";
import Head from "next/head";
import React from "react";
import io from "socket.io-client";
import Layout from "../hoc/Layout/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  state = {
    socket: null
  };
  componentDidMount() {
    // connect to WS server and listen event
    const socket = io();
    this.setState({ socket });
  }

  // close socket connection
  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <title>Chat App</title>
          </Head>
          <Layout>
            <Component {...pageProps} socket={this.state.socket} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
