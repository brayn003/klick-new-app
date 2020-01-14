/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { MdMenu } from 'react-icons/md';

import IconButton from 'common-components/button/IconButton';
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

  const initalSidebarCollapse = typeof sidebar.collapsed === 'undefined' ? false : sidebar.collapsed;
  const isSidebarShown = typeof sidebar.show === 'undefined' ? true : sidebar.show;

  // topbar
  const isTopbarShown = typeof topbar.show === 'undefined' ? true : topbar.show;

  // body
  const noPadding = typeof body.noPadding === 'undefined' ? false : body.noPadding;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(initalSidebarCollapse);
  const [showToggleButton, setShowToggleButton] = useState(initalSidebarCollapse);

  const resizeWindow = () => {
    if (window.innerWidth < 768) {
      setShowToggleButton(true);
    }
  };

  // reavulate for smaller screens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        resizeWindow();
        setIsSidebarCollapsed(true);
      }
      window.addEventListener('resize', resizeWindow);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeWindow);
      }
    };
  }, []);

  const onClickToggleMenu = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
        <Content hasSidebar={isSidebarShown} isSidebarCollapsed={showToggleButton}>
          {isTopbarShown && (
            <TopContainer>
              {showToggleButton && (
              <IconButton onClick={onClickToggleMenu} className="sidebar-btn">
                <MdMenu />
              </IconButton>
              )}
              <CoreTopBar pathname={pathname} title={title} />
            </TopContainer>
          )}
          <CoreBody noPadding={noPadding}>
            {showToggleButton && !isSidebarCollapsed && <Overlay role="presentation" onClick={() => { setIsSidebarCollapsed(true); }} />}
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

const Content = styled(({ hasSidebar, ...rest }) => <div {...rest} />)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: ${p => (p.isSidebarCollapsed ? '0' : (p.hasSidebar ? '240px' : '0'))};
`;

Content.defaultProps = {
  hasSidebar: false,
};

const Sidebar = styled.aside`
  width: 240px;
  height: 100%;
  position: fixed;
  z-index: 20;
  margin-left: ${p => (p.collapsed ? '-240px' : 'initial')};
`;


const CoreBody = styled.div`
  padding: ${p => (p.noPadding ? '0' : '16px 24px')};
  z-index: 10;
  flex: 1;
`;

CoreBody.defaultProps = {
  noPadding: false,
};

const TopContainer = styled.div`
  display: flex;

  .sidebar-btn {
    margin-top: 29px;
    margin-left: 24px;
    font-size: 1.2em;
  }
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 2;
`;

export default CoreLayout;
