import BranchForm from 'components/branch/BranchForm';

function Page() {
  return (
    <BranchForm />
  );
}

Page.getInitialProps = () => ({ title: 'Create Branch' });

export default Page;
