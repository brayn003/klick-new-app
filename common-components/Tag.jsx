import styled from 'styled-components';
import { isLight } from '../helpers/color-service';

function Tag(props) {
  return (
    <Container {...props} />
  );
}

const Container = styled.div`
  height: 22px;
  padding: 0 12px;
  border-radius: 14px;
  background-color: ${p => p.color};
  display: inline-block;
  font-size: 0.8em;
  line-height: 20px;
  color: ${p => (isLight(p.color) ? 'initial' : '#FFFFFF')};
`;

Container.defaultProps = {
  color: '#DEDEDE',
};

export default Tag;
