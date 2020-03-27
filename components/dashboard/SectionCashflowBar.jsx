import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';

import DropDown from 'common-components/controls/DropDown';
import ButtonLink from 'common-components/button/ButtonLink';
import useForm from 'hooks/useForm';
import {
  months,
  getYears,
  getCurrentMonthNum,
  getCurrentYear,
} from 'helpers/date-service';
import BarChart from '../../common-components/charts/BarChart';
import { getCashflowBar } from '../../apis/dashboard-apis';

const SectionCashflowBar = ({ organization }) => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(false);
  const { formField, setValue, getValues } = useForm();
  const years = getYears();
  const values = getValues();

  const getData = async () => {
    setLoading(true);
    try {
      const inRes = await getCashflowBar({
        ...values,
        organization: organization.id,
      });
      setRes(inRes);
      setValue('month', inRes.month);
      setValue('year', inRes.year);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, Object.values(values));
  return (
    <>
      <DropDown
        {...formField('month', {
          initialValue: (getCurrentMonthNum()),
        })}
        options={months.map((m, index) => ({ title: m, key: index + 1 }))}
      >
        {({ title }) => (<ButtonLink>{title}</ButtonLink>)}
      </DropDown>
      <DropDown
        {...formField('year', {
          initialValue: (getCurrentYear()),
        })}
        options={years.map(y => ({ title: y, key: y }))}
      >
        {({ title }) => (<ButtonLink>{title}</ButtonLink>)}
      </DropDown>
      <BarChart
        data={res && res.data}
        labelKey={res && res.labelKey}
        valueKey={res && res.valueKey}
        // groupBy={res && res.groupBy}
        // stackBy={res && res.stackBy}
        height={300}
        loading={loading}
      />
    </>
  );
};

SectionCashflowBar.propTypes = {
  organization: shape({}),
};

SectionCashflowBar.defaultProps = {
  organization: {},
};

export default SectionCashflowBar;
