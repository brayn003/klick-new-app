import { shape } from 'prop-types';

import ClientForm from 'components/client/ClientForm';

function Page({ query }) {
  const { name } = query;
  return (
    <ClientForm value={{ name }} />
  );
}

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};
Page.getInitialProps = () => ({ title: 'Create Client' });

export default Page;
