import styled from 'styled-components';

import GenericCard from 'common-components/card/Card';
import { DEVICE } from 'helpers/style-helper';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #4064d8, #4ad8dd); 
`;

export const Card = styled(GenericCard)`
  width: 400px;

  ${DEVICE.mobile} {
    width: initial;
  }

`;

export const Title = styled.h1`
  font-size: 2em;
  color: #FFF;
`;

export const Description = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  margin-bottom: 24px;
  color: #FFF;
`;

export const SubActionBar = styled.div`
  text-align: right;
  margin-bottom: 32px;
`;

export const Anchor = styled.a`
  color: #4798db;
  font-size: 1em;
  text-decoration: none;

  border-bottom: 1px solid transparent;
  transition: border-color 0.1s linear;

  &:hover, &:active, &:focus {
    border-color: #4798db;
    outline: 0;
  }
`;

export const Logo = styled.p`
  font-size: 3em;
  color: #FFF;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 0;
`;
