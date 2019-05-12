import { useState, useEffect } from 'react';
import { shape } from 'prop-types';

import PieChart from 'common-components/charts/PieChart';
import { getExpenseCategoryPie } from 'apis/dashboard-apis';
import DropDown from 'common-components/controls/DropDown';
import ButtonLink from 'common-components/button/ButtonLink';
import useForm from 'hooks/useForm';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const years = [2018, 2019];
const ExpenseCategoryPieSection = ({ organization }) => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(false);
  const { formField, setValue, getValues } = useForm();
  const now = new Date();

  const values = getValues();

  const getData = async () => {
    setLoading(true);
    try {
      const inRes = await getExpenseCategoryPie({
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
          initialValue: (now.getMonth() + 1),
        })}
        options={months.map((m, index) => ({ title: m, key: index + 1 }))}
      >
        {({ title }) => (<ButtonLink>{title}</ButtonLink>)}
      </DropDown>
      <DropDown
        {...formField('year', {
          initialValue: (now.getFullYear()),
        })}
        options={years.map(y => ({ title: y, key: y }))}
      >
        {({ title }) => (<ButtonLink>{title}</ButtonLink>)}
      </DropDown>
      <PieChart
        data={res && res.data}
        labelKey={res && res.labelKey}
        valueKey={res && res.valueKey}
        height={300}
        loading={loading}
      />
    </>
  );
};

ExpenseCategoryPieSection.propTypes = {
  organization: shape({}),
};

ExpenseCategoryPieSection.defaultProps = {
  organization: {},
};

export default ExpenseCategoryPieSection;
