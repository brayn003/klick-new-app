import styled from 'styled-components';
import ReactSelect from 'react-select';

export const StyledSelect = styled(({ block, ...rest }) => <ReactSelect {...rest} />)`
  ${p => (p.block ? `
    display: block;
    width: 100%;
  ` : `
    display: inline-block;
    width: 300px;
  `)}

  .select__control {
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #CCC;
    padding: 6px 16px;
    box-sizing: border-box;
    align-items: flex-start;
    will-change: border;

    will-change: box-shadow, border-color, background-color;
    transition: box-shadow 0.1s linear, border-color 0.1s linear, background-color 0.1s linear;

    &:hover {
      box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
      background-color: #FFF;
    }

    &:focus, &:active, &:focus-within {
      outline: 0;
      border-color: #4798DB;
      background-color: #FFF;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
    }
  }

  .select__value-container {
    height: 100%;
    margin: 0;
    padding: 0;

  }

  .select__placeholder {
    color: #DADADA;
  }

  .select__indicator-separator {
    margin-top: 0;
    height: 100%;
    margin-bottom: 0;
    box-sizing: border-box;
  }

  .select__indicators {
    height: 100%;
  }

  .select__dropdown-indicator {
    padding-right: 0;
  }
`;

StyledSelect.defaultProps = {
  block: false,
  classNamePrefix: 'select',
};

export default StyledSelect;
