import {
  func, shape, arrayOf, string,
} from 'prop-types';

import AsyncCreatableSelect from 'common-components/controls/select/AsyncCreatableSelect';
import { getBranches } from 'apis/branch-apis';

function SelectBranch(props) {
  const { filter, organizationId, ...rest } = props;

  const loadOptions = async (searchValue) => {
    const res = await getBranches({
      name: searchValue || undefined,
      organization: organizationId,
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

SelectBranch.propTypes = {
  onChange: func,
  value: shape({}),
  filter: arrayOf(string),
  organizationId: string.isRequired,
};

SelectBranch.defaultProps = {
  onChange: () => {},
  value: undefined,
  filter: [],
};

export default SelectBranch;
