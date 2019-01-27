import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:site_name" content="Chat App" />
          <meta property="og:title" content="Chat App" />
          <meta
            property="og:description"
            content="A chat app created with Nextjs and Socket.io"
          />
          <meta
            property="og:url"
            content="https://nyan-chatapp.herokuapp.com/"
          />
          <meta
            property="og:image"
            content="https://nyan-chatapp.herokuapp.com/static/images/nyan_cat.gif"
          />
          <meta property="og:type" content="website" />
          <link
            rel="shortcut icon"
            href="/static/images/logo.ico"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/fonts/fontello/css/fontello.css"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
