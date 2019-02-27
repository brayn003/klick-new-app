import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getInvoices } from 'apis/invoice-apis';
import InvoiceCard from './InvoiceCard';
import Input from '../../common-components/controls/Input';

const pdfWidth = 200;

function InvoiceView() {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    getInvoices({ serial: searchTerm || undefined })
      .then((res) => {
        setLoading(false);
        setInvoices(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <Container>
      <ActionBar>
        <SearchContainer>
          <Input
            onChange={setSearchTerm}
            value={searchTerm}
            placeholder="Search invoices"
          />
        </SearchContainer>
      </ActionBar>
      <CardContainer>
        {loading && 'Loading ...'}
        {!loading && invoices && invoices.docs.map(invoice => (
          <InvoiceCard key={invoice.id} width={pdfWidth} invoice={invoice} />
        ))}
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
`;

const ActionBar = styled.div`
  height: 40px;
  margin-bottom: 24px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  max-width: 400px;
`;

export default InvoiceView;
