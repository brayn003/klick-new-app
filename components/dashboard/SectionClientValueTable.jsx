import { useEffect, useState } from 'react';

import Loading from 'common-components/Loading';
import LeadText from 'common-components/LeadText';
import { getClientValueTable } from 'apis/dashboard-apis';

const SectionClientValueTable = ({
  organization,
}) => {
  console.log('hey there');

  const [res, setRes] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await getClientValueTable({
        organization: organization._id,
      });
      console.log('>>>', response);
      setLoading(true);
      setRes(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <p>Hey there</p>
    // <LeadText>{res && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(res.totalTaxableAmount)}</LeadText>
  );
};

export default SectionClientValueTable;
