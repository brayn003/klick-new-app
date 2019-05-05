import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Normalize } from 'styled-normalize';

import GlobalStyles from '../helpers/global-styles';

export default class CustomDocument extends Document {
  static getInitialProps({ pathname, renderPage, isServer }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return {
      ...page, styleTags, pathname, isServer,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.7/flatpickr.min.css" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/react-toastify@5.1.0/dist/ReactToastify.min.css" rel="stylesheet" />
          {this.props.styleTags}
        </Head>
        <body style={{ margin: 0 }}>
          <GlobalStyles />
          <Normalize />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
