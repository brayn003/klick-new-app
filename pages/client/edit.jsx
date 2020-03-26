import { shape } from 'prop-types';

import ClientForm from 'components/client/ClientForm';

const Page = ({ query }) => {
  const { clientId } = query;
  return <ClientForm clientId={clientId} />;
};

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};

Page.getInitialProps = () => ({ title: 'Edit Client' });

export default Page;
