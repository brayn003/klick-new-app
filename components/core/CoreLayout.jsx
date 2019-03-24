import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';

import CoreNav from './CoreNav';
import CoreTopBar from './CoreTopBar';

function CoreLayout(props) {
  const {
    children,
    layout,
    pathname,
    title,
    ...rest
  } = props;

  const { sidebar = {}, topbar = {}, body = {} } = layout;

  // sidebar
  const isSidebarCollapsed = typeof sidebar.collapsed === 'undefined' ? false : sidebar.collapsed;
  const isSidebarShown = typeof sidebar.show === 'undefined' ? true : sidebar.show;

  // topbar
  const isTopbarShown = typeof topbar.show === 'undefined' ? true : topbar.show;

  // body
  const noPadding = typeof body.noPadding === 'undefined' ? false : body.noPadding;

  return (
    <>
      <Head>
        <title>{`Klick App ${title ? `| ${title}` : ''}`}</title>
      </Head>
      <Container {...rest}>
        {isSidebarShown && (
          <Sidebar collapsed={isSidebarCollapsed}>
            <CoreNav pathname={pathname} onlyIcons={isSidebarCollapsed} />
          </Sidebar>
        )}
        <Content>
          {isTopbarShown && <CoreTopBar pathname={pathname} title={title} />}
          <CoreBody noPadding={noPadding}>
            {children}
          </CoreBody>
        </Content>
      </Container>
    </>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.shape({}),
  pathname: PropTypes.string,
  title: PropTypes.string,
};

CoreLayout.defaultProps = {
  children: null,
  layout: {},
  pathname: null,
  title: null,
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  background-color: #F9F9F9;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.aside`
  width: 240px;
`;


const CoreBody = styled.div`
  padding: ${p => (p.noPadding ? '0' : '16px 24px')};
  flex: 1;
`;

CoreBody.defaultProps = {
  noPadding: false,
};

export default CoreLayout;
