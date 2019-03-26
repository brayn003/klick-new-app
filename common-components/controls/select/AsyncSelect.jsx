import Async from 'react-select/lib/Async';

import { StyledSelect } from './styles';

function AsyncSelect(props) {
  return (
    <StyledSelect
      as={Async}
      {...props}
    />
  );
}

export default AsyncSelect;
