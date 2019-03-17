import InvoiceForm from 'components/invoice/InvoiceForm';

function Page() {
  return (
    <InvoiceForm />
  );
}

Page.getInitialProps = () => ({ title: 'Create Invoice' });

export default Page;
