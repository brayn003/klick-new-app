import styled from 'styled-components';
import { FiRotateCw } from 'react-icons/fi';

const getUnit = (num) => {
  if (typeof num === 'number') {
    return `${num}px`;
  }
  return num;
};

const CenterTextContainer = styled.div`
  display: flex;
  height: ${p => getUnit(p.height)};
  width: ${p => getUnit(p.width)};
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1.2em;
`;

const Loading = () => (
  <CenterTextContainer>
    <FiRotateCw />&nbsp;&nbsp;Loading ...
  </CenterTextContainer>
);

export default Loading;
