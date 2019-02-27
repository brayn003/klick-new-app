import { useState, useEffect } from 'react';
import { getInvoices } from 'apis/invoice-apis';

function InvoiceView() {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getInvoices()
      .then((res) => {
        setLoading(false);
        setInvoices(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  console.log(invoices);

  return `invoice view - ${loading}`;
}

export default InvoiceView;
