import BranchView from 'components/branch/BranchView';

function Page() {
  return (
    <BranchView />
  );
}

Page.getInitialProps = () => ({ title: 'Branches' });

export default Page;
