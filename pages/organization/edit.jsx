import { shape } from 'prop-types';

import OrganizationForm from 'components/organization/OrganizationForm';

const Page = ({ query }) => {
  const { organizationId } = query;
  console.log(query);
  return <OrganizationForm organizationId={organizationId} />;
};

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};

Page.getInitialProps = () => ({ title: 'Edit Organization' });

export default Page;
