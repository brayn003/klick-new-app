import DashboardView from '../components/dashboard/DashboardView';

function Page() {
  return <DashboardView />;
}

Page.getInitialProps = () => ({ layout: { sidebar: { collapse: false } } });

export default Page;
