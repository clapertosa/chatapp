import App, { Container } from "next/app";
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Chat App</title>
        </Head>
        <Layout>
          <Component {...pageProps} socket={this.state.socket} />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
