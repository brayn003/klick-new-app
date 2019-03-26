import {
  func, shape, bool,
} from 'prop-types';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

import AsyncSelect from 'common-components/controls/select/AsyncSelect';
import { getTaxTypes } from 'apis/tax-type-apis';

function SelectTaxType(props) {
  const { params, groupByRate, ...rest } = props;

  const loadOptions = async (searchValue) => {
    const res = await getTaxTypes({
      name: searchValue || undefined,
      ...params,
    });
    if (groupByRate) {
      const groupedTaxTypes = map(groupBy(res.docs, 'rate'), value => value.reduce((acc, taxType, index) => {
        const acc2 = acc;
        acc2.label += `${index === 0 ? '' : ' & '}${taxType.name}`;
        acc2.value.push(taxType.id);
        return acc2;
      }, { label: '', value: [] }));
      return groupedTaxTypes;
    }
    return res.docs.map(taxType => ({ label: taxType.name, value: [taxType.id] }));
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

SelectTaxType.propTypes = {
  onChange: func,
  value: shape({}),
  params: shape({}),
  groupByRate: bool,
};

SelectTaxType.defaultProps = {
  onChange: () => {},
  value: undefined,
  params: {},
  groupByRate: false,
};

export default SelectTaxType;
