import React from 'react';

import LoginView from 'components/auth/LoginView';

function Page() {
  return <LoginView />;
}

Page.getInitialProps = () => ({ layout: { sidebar: { show: false } } });


export default Page;
