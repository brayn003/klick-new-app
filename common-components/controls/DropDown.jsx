
import styled from 'styled-components';
import {
  arrayOf, shape, func, string, node, oneOfType,
} from 'prop-types';

import Popover from '../Popover';

function DropDown(props) {
  const {
    options,
    onChange,
    children,
    placement,
  } = props;
  const {
    value,
  } = props;
  let valueOption = options.find(option => (option.value || option.key) === value);
  if (typeof valueOption === 'undefined') {
    valueOption = { title: 'No Data', value: '' };
  }
  return (
    <Popover
      trigger={['focus']}
      placement={placement}
      overlay={(
        <PopoverContainer>
          {options.map(option => (
            <Item
              active={(option.value || option.key) === value}
              key={option.key}
              onClick={() => { onChange(option.value || option.key); }}
            >
              {option.title}
            </Item>
          ))}
        </PopoverContainer>
      )}
    >
      {typeof children === 'function' ? children({ title: valueOption.title }) : children}
    </Popover>
  );
}

const PopoverContainer = styled.div`
  padding: 12px 0px;
`;

const Item = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 0 24px;
  cursor: pointer;
  background-color: ${p => (p.active ? 'rgba(71, 152, 219, 0.13)' : 'transparent')};
  color: ${p => (p.active ? '#4798db' : 'inherit')};
  transition: background-color 0.1s linear, color 0.1s linear;

  &:hover {
    background-color: ${p => (p.active ? 'rgba(71, 152, 219, 0.13)' : 'rgba(0, 0, 0, 0.04)')};
  }
`;

DropDown.propTypes = {
  onChange: func,
  value: string,
  options: arrayOf(shape({})),
  children: oneOfType([func, node]),
  placement: string,
};

DropDown.defaultProps = {
  onChange: () => {},
  value: undefined,
  options: [],
  children: () => null,
  placement: 'bottomRight',
};

export default DropDown;
