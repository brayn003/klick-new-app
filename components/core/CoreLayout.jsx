import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';

import CoreNav from './CoreNav';

function CoreLayout(props) {
  const {
    children,
    layout,
    pathname,
    title,
    ...rest
  } = props;
  const { sidebar = {} } = layout;
  const isSidebarCollapsed = typeof sidebar.collapsed === 'undefined' ? false : sidebar.collapsed;
  const isSidebarShown = typeof sidebar.show === 'undefined' ? true : sidebar.show;
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
          <TopBar>
            <Title>{title}</Title>
          </TopBar>
          <CoreBody>
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
`;

const Content = styled.div`
  flex: 1;
`;

const Sidebar = styled.aside`
  width: 240px;
`;

const TopBar = styled.div`
  min-height: 29px;
  padding: 32px 24px 16px 24px;
`;

const Title = styled.p`
  font-size: 1.6em;
  margin: 0;
`;

const CoreBody = styled.div`
  padding: 16px 24px;
`;

export default CoreLayout;
