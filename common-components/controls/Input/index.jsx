import styled from 'styled-components';
import PropTypes from 'prop-types';

function Input(props) {
  const { onChange, block, ...rest } = props;
  return (
    <StyledInput
      {...rest}
      block={block}
      onChange={(e) => { onChange(e.target.value); }}
    />
  );
}

Input.propTypes = {
  onChange: PropTypes.func,
  block: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  block: false,
};

export const StyledInput = styled.input`
  ${p => (p.block ? `
    display: block;
    width: 100%;
  ` : `
    display: inline-block;
    width: 300px;
  `)}
  height: 40px;
  border: 0;
  background-color: transparent;
  border: 1px solid #CCC;
  padding: 6px 16px;
  box-sizing: border-box;
  line-height: 28px;
  border-radius: 20px;
  will-change: box-shadow, border-color, background-color;
  transition: box-shadow 0.1s linear, border-color 0.1s linear, background-color 0.1s linear;

  &:hover {
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }

  &:focus, &:active {
    outline: 0;
    border-color: #4798DB;
    background-color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }

  &::placeholder {
    color: #DADADA;
  }
`;

StyledInput.defaultProps = {
  block: false,
};

export default Input;
