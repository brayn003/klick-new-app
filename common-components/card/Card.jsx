import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Card(props) {
  const { title, children, ...rest } = props;
  return (
    <Container {...rest}>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {
  title: null,
  children: null,
};

const Container = styled.div`
  background-color: #FFFFFF;
  /* width: 400px; */
  height: auto;
  padding: 24px;
  border-radius: 20px;
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  margin-bottom: 24px;

  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const Title = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  border-bottom: 1px solid #EFEFEF;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

export default Card;
