import AsyncCreatable from 'react-select/lib/AsyncCreatable';

import { StyledSelect } from './styles';

function AsyncCreatableSelect(props) {
  return (
    <StyledSelect
      as={AsyncCreatable}
      {...props}
    />
  );
}

export default AsyncCreatableSelect;
