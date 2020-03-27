import { useState, useEffect } from 'react';
import {
  func, shape, bool,
} from 'prop-types';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

import Select from 'common-components/controls/select/Select';
import { getTaxTypes } from 'apis/tax-type-apis';

function SelectTaxType(props) {
  const { params, groupByRate, ...rest } = props;
  const [searchValue, setSearchValue] = useState();
  const [options, setOptions] = useState();

  const getOptions = async (pars) => {
    const res = await getTaxTypes({
      name: searchValue || undefined,
      ...pars,
    });
    if (groupByRate) {
      const groupedTaxTypes = map(groupBy(res, 'rate'), value => value.reduce((acc, taxType, index) => {
        const acc2 = acc;
        acc2.label += `${index === 0 ? '' : ' & '}${taxType.name}`;
        acc2.value.push(taxType.id);
        return acc2;
      }, { label: '', value: [] }));
      return setOptions(groupedTaxTypes);
    }
    return setOptions(res.map(taxType => ({ label: taxType.name, value: [taxType.id] })));
  };

  useEffect(() => {
    getOptions(params);
  }, [...Object.values(params)]);

  // const loadOptions = pars => async (searchValue) => {
  // };

  return (
    <Select
      {...rest}
      isClearable
      cacheOptions
      defaultOptions
      options={options}
      onInputChange={(v) => { setSearchValue(v); }}
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
