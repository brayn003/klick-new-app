import { forwardRef } from 'react';
import styled from 'styled-components';
import {
  func, bool, shape, oneOfType, string, number,
} from 'prop-types';
import isNil from 'lodash/isNil';

function Input(props) {
  const {
    onChange, block, forwardedRef, type, value, ...rest
  } = props;

  return (
    <StyledInput
      {...rest}
      type={type}
      ref={forwardedRef}
      block={block}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        console.log(parseFloat(val));
        if (type === 'number') {
          onChange(isNil(val) ? '' : parseFloat(val));
        } else {
          onChange(val);
        }
      }}
    />
  );
}

Input.propTypes = {
  onChange: func,
  block: bool,
  forwardedRef: shape({}),
  value: oneOfType([string, number]),
  type: string,
};

Input.defaultProps = {
  onChange: () => {},
  block: false,
  forwardedRef: null,
  value: '',
  type: 'text',
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
    background-color: #FFF;
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

export default forwardRef((p, ref) => <Input {...p} forwardedRef={ref} />);
