import React from 'react';
import styled from 'styled-components';


function CoreLayout(props) {
  return <Container {...props} />;
}

const Container = styled.div`
  min-height: 100%;
`;

export default CoreLayout;
