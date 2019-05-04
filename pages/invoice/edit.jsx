import { shape } from 'prop-types';

import InvoiceForm from 'components/invoice/InvoiceForm';

const Page = ({ query }) => {
  const { invoiceId } = query;
  return <InvoiceForm invoiceId={invoiceId} />;
};

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};

Page.getInitialProps = () => ({ title: 'Create Invoice' });

export default Page;
