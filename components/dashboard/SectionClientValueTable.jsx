import { useEffect, useState } from 'react';
import { shape } from 'prop-types';
import Loading from 'common-components/Loading';
import LeadText from 'common-components/LeadText';
import { getTotalInvoiceRemaining } from 'apis/dashboard-apis';

const SectionClientValueTable = ({
  organization,
}) => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await getTotalInvoiceRemaining({
        organization: organization._id,
      });
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
    <LeadText>{res && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(res.remaining)}</LeadText>
  );
};

SectionClientValueTable.propTypes = {
  organization: shape({}).isRequired,
};

export default SectionClientValueTable;
