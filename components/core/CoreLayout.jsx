import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CoreNav from './CoreNav';

function CoreLayout(props) {
  const {
    children,
    layout,
    pathname,
    ...rest
  } = props;
  const { sidebar = {} } = layout;
  const isSidebarCollapsed = typeof sidebar.collapsed === 'undefined' ? false : sidebar.collapsed;
  const isSidebarShown = typeof sidebar.show === 'undefined' ? true : sidebar.show;

  return (
    <Container {...rest}>
      {isSidebarShown && (
        <Sidebar collapsed={isSidebarCollapsed}>
          <CoreNav pathname={pathname} onlyIcons={isSidebarCollapsed} />
        </Sidebar>
      )}
      <Content>
        {children}
      </Content>
    </Container>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.shape({}),
  pathname: PropTypes.string,
};

CoreLayout.defaultProps = {
  children: null,
  layout: {},
  pathname: null,
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

export default CoreLayout;
