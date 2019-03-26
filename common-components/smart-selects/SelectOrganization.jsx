import {
  func, shape, arrayOf, string,
} from 'prop-types';

import AsyncCreatableSelect from 'common-components/controls/select/AsyncCreatableSelect';
import { getOrganizations } from 'apis/organization-apis';

function SelectOrganization(props) {
  const { filter, ...rest } = props;

  const loadOptions = async (searchValue) => {
    const res = await getOrganizations({
      name: searchValue || undefined,
    });
    return res.docs
      .map(org => ({ label: org.name, value: org.id }))
      .filter(option => filter.indexOf(option.value) === -1);
  };

  return (
    <AsyncCreatableSelect
      {...rest}
      isClearable
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
    />
  );
}

SelectOrganization.propTypes = {
  onChange: func,
  value: shape({}),
  filter: arrayOf(string),
};

SelectOrganization.defaultProps = {
  onChange: () => {},
  value: undefined,
  filter: [],
};

export default SelectOrganization;