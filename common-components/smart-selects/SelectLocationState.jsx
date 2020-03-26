import {
  func, shape, arrayOf, string,
} from 'prop-types';

import AsyncSelect from 'common-components/controls/select/AsyncSelect';
import { getLocationStates } from 'apis/location-apis';

function SelectLocationState(props) {
  const { filter, ...rest } = props;

  const loadOptions = async (searchValue) => {
    const res = await getLocationStates({
      name: searchValue || undefined,
    });
    return res.docs
      .map(org => ({ label: org.name, value: org.id }))
      .filter(option => filter.indexOf(option.value) === -1);
  };

  return (
    <AsyncSelect
      {...rest}
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
    />
  );
}

SelectLocationState.propTypes = {
  onChange: func,
  value: shape({}),
  filter: arrayOf(string),
};

SelectLocationState.defaultProps = {
  onChange: () => {},
  value: undefined,
  filter: [],
};

export default SelectLocationState;
