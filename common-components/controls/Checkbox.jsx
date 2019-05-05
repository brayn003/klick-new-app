import { node, bool, func } from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import styled from 'styled-components';

const Checkbox = ({ children, onChange, checked }) => {
  const onClickBox = () => { onChange(!checked); };
  return (
    <Container tabIndex={0} onClick={onClickBox}>
      <Box checked={checked}>
        {checked ? <FiCheck /> : null}
      </Box>
      <Description>{children}</Description>
    </Container>
  );
};

const Box = styled(({ checked, ...rest }) => <div {...rest} />)`
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #CCC;
  margin-right: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: color, box-shadow, border-color, background-color;
  background-color: ${p => (p.checked ? '#4798DB' : 'transparent')};
  color: ${p => (p.checked ? '#FFFFFF' : 'inherit')};
  border-color: ${p => (p.checked ? '#4798DB' : '#CCC')};
  transition: box-shadow 0.1s linear, border-color 0.1s linear, background-color 0.1s linear, color 0.1s linear;
`;

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover ${Box} {
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }

  &:focus {
    outline: 0;
  }

  &:focus ${Box} {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;


const Description = styled.p`
  display: inline-block;
  margin: 0;
`;

Checkbox.propTypes = {
  children: node,
  onChange: func,
  checked: bool,
};

Checkbox.defaultProps = {
  children: null,
  onChange: () => {},
  checked: undefined,
};

export default Checkbox;
