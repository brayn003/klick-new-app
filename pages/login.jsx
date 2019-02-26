import React from 'react';

import LoginView from 'components/auth/LoginView';

function Page() {
  return <LoginView />;
}

Page.getInitialProps = () => (
  {
    layout: {
      sidebar: {
        show: false,
      },
      topbar: {
        show: false,
      },
      body: {
        noPadding: true,
      },
    },
  }
);


export default Page;
