import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withReduxStore from 'helpers/with-redux-store';

import CoreLayout from '../components/core/CoreLayout';
import intercept from '../helpers/api-interceptor';
import { checkToken } from '../helpers/auth-service';

intercept();

class Kappa extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    await checkToken(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    pageProps.pathname = ctx.pathname;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <CoreLayout {...pageProps}>
            <Component {...pageProps} />
          </CoreLayout>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(Kappa);
