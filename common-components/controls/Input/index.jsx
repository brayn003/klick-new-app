import styled from 'styled-components';
import PropTypes from 'prop-types';

function Input(props) {
  const { onChange, ...rest } = props;
  return (
    <StyledInput
      {...rest}
      onChange={(e) => { onChange(e.target.value); }}
    />
  );
}

Input.propTypes = {
  onChange: PropTypes.func,
};

Input.defaultProps = {
  onChange: () => {},
};

export const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  border: 0;
  background-color: transparent;
  border: 1px solid #CCC;
  padding: 6px 16px;
  box-sizing: border-box;
  will-change: box-shadow, border-color;
  line-height: 28px;
  border-radius: 20px;
  margin-bottom: 16px;
  transition: box-shadow 0.1s linear, border-color 0.1s linear;

  &:hover {
    box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  }

  &:focus, &:active {
    outline: 0;
    border-color: #4798DB;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }

  &::placeholder {
    color: #DADADA;
  }
`;

export default Input;
