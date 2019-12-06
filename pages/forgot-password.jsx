import React from 'react';


function Page() {
  return <div>Hey there</div>;
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
