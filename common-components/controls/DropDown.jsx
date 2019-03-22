
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Popover from '../Popover';

function DropDown(props) {
  const {
    options,
    onChange,
    children,
  } = props;
  const {
    value = options.length ? (options[0].value || options[0].key) : undefined,
  } = props;
  let valueOption = options.find(option => (option.value || option.key) === value);
  if (typeof valueOption === 'undefined') {
    valueOption = { title: 'No Data', value: '' };
  }
  return (
    <Popover
      trigger={['focus']}
      placement="bottomLeft"
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
      {children({ title: valueOption.title })}
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  children: PropTypes.func,
};

DropDown.defaultProps = {
  onChange: () => {},
  value: undefined,
  options: [],
  children: () => null,
};

export default DropDown;
