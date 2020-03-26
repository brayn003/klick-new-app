import { shape } from 'prop-types';

import BranchForm from 'components/branch/BranchForm';

const Page = ({ query }) => {
  const { branchId } = query;
  return <BranchForm branchId={branchId} />;
};

Page.propTypes = {
  query: shape({}),
};

Page.defaultProps = {
  query: {},
};

Page.getInitialProps = () => ({ title: 'Edit Branch' });

export default Page;
