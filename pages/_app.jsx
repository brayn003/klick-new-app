import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withReduxStore from 'helpers/with-redux-store';

import { pdfjs } from 'react-pdf';
import CoreLayout from 'components/core/CoreLayout';
import ToastContainer from 'common-components/Toast';
import intercept from 'helpers/api-interceptor';
import bootstrap from '../helpers/app-bootstrap';

import 'flatpickr/dist/flatpickr.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

intercept();

class KlickApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    await bootstrap(ctx);

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
      <>
        <ToastContainer />
        <Container>
          <Provider store={reduxStore}>
            <CoreLayout {...pageProps}>
              <Component {...pageProps} />
            </CoreLayout>
          </Provider>
        </Container>
      </>
    );
  }
}

export default withReduxStore(KlickApp);
