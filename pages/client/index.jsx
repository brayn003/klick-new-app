import ClientView from 'components/client/ClientView';

function Page() {
  return (
    <ClientView />
  );
}

Page.getInitialProps = () => ({ title: 'Clients' });

export default Page;
