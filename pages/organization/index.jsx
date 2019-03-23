import OrganizationSelectView from 'components/organization/OrganizationSelectView';

function Page() {
  return (
    <OrganizationSelectView />
  );
}

Page.getInitialProps = () => ({ title: 'Select Organization', layout: { sidebar: { show: false } } });

export default Page;
