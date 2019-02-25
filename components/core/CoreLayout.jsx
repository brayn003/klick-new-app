import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function CoreLayout(props) {
  const { children, ...rest } = props;
  return (
    <Container {...rest}>
      <Content>
        {children}
      </Content>
    </Container>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.node,
};

CoreLayout.defaultProps = {
  children: null,
};

const Container = styled.div`
  min-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

export default CoreLayout;
