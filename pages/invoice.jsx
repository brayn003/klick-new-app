import InvoiceView from 'components/invoice/InvoiceView';

function Page() {
  return (
    <InvoiceView />
  );
}

Page.getInitialProps = () => ({ title: 'Invoice' });

export default Page;
