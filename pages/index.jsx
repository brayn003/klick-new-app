import DashboardView from '../components/dashboard/DashboardView';

function Page() {
  return <DashboardView />;
}

Page.getInitialProps = () => ({ title: 'Dashboard' });

export default Page;
