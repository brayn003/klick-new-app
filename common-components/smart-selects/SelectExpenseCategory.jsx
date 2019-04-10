import {
  func, shape, arrayOf, string,
} from 'prop-types';

import AsyncCreatableSelect from 'common-components/controls/select/AsyncCreatableSelect';
import { getExpenseCategories } from 'apis/expense-apis';

function SelectExpenseCategory(props) {
  const { filter, organizationId, ...rest } = props;

  const loadOptions = async (searchValue) => {
    const res = await getExpenseCategories({
      name: searchValue || undefined,
      organization: organizationId,
    });
    return res.docs
      .map(options => ({ label: options.name, value: options.id }))
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

SelectExpenseCategory.propTypes = {
  onChange: func,
  value: shape({}),
  filter: arrayOf(string),
  organizationId: string,
};

SelectExpenseCategory.defaultProps = {
  onChange: () => {},
  value: undefined,
  filter: [],
  organizationId: undefined,
};

export default SelectExpenseCategory;
