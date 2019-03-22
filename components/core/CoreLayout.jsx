import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';

import DropDown from 'common-components/controls/DropDown';
import ButtonLink from 'common-components/button/ButtonLink';

import CoreNav from './CoreNav';

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
          {isTopbarShown && (
            <TopBar>
              <Title>{title}</Title>
              <ActionsContainer>
                <DropDown
                  options={[]}
                >
                  {() => (
                    <ButtonLink
                      style={{
                        padding: 0,
                        height: 48,
                        borderRadius: 24,
                      }}
                    >
                      <Avatar />
                      <AvatarText>
                        Rudraprasad Das
                      </AvatarText>
                    </ButtonLink>
                  )}
                </DropDown>
              </ActionsContainer>
            </TopBar>
          )}
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

const TopBar = styled.div`
  height: 80px;
  line-height: 32px;
  padding: 32px 24px 16px 24px;
  box-sizing: border-box;
  display: flex;
`;

const ActionsContainer = styled.div`
  flex: 1;
  text-align: right;
  margin-top: -4px;
  margin-bottom: -4px;
`;

const Title = styled.p`
  font-size: 1.6em;
  margin: 0;
  flex: 0 0 260px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  border-radius: 24px;
  vertical-align: middle;
`;

const AvatarText = styled.p`
  margin: 0;
  line-height: 48px;
  padding: 0 24px;
  display: inline-block;
  vertical-align: middle;
  font-size: 1em;
`;

const CoreBody = styled.div`
  padding: ${p => (p.noPadding ? '0' : '16px 24px')};
  flex: 1;
`;

CoreBody.defaultProps = {
  noPadding: false,
};

export default CoreLayout;
