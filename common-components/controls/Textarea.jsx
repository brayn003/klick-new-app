import { forwardRef } from 'react';
import styled from 'styled-components';
import {
  func, bool, shape, number, string,
} from 'prop-types';

function Textarea(props) {
  const {
    onChange, block, forwardedRef, value, ...rest
  } = props;

  return (
    <StyledTextarea
      {...rest}
      value={value}
      ref={forwardedRef}
      block={block}
      onChange={(e) => { onChange(e.target.value); }}
    />
  );
}

Textarea.propTypes = {
  onChange: func,
  block: bool,
  forwardedRef: shape({}),
  rows: number,
  value: string,
};

Textarea.defaultProps = {
  onChange: () => {},
  block: false,
  forwardedRef: null,
  rows: 3,
  value: '',
};

export const StyledTextarea = styled.textarea`
  ${p => (p.block ? `
    display: block;
    width: 100%;
  ` : `
    display: inline-block;
    width: 300px;
  `)}
  min-height: 40px;
  border: 0;
  background-color: transparent;
  border: 1px solid #CCC;
  padding: 6px 16px;
  box-sizing: border-box;
  line-height: 28px;
  border-radius: 20px;
  will-change: box-shadow, border-color, background-color;
  transition: box-shadow 0.1s linear, border-color 0.1s linear, background-color 0.1s linear;
  resize: none;

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

StyledTextarea.defaultProps = {
  block: false,
};

export default forwardRef((p, ref) => <Textarea {...p} forwardedRef={ref} />);
