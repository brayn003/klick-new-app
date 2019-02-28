import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getInvoices } from 'apis/invoice-apis';
import InvoiceCard from './InvoiceCard';
import Input from '../../common-components/controls/Input';
import DropDown from '../../common-components/controls/DropDown';

const pdfWidth = 200;

const options = [{
  title: 'All Status',
  key: 'all_status',
  value: undefined,
}, {
  title: 'Open',
  key: 'open',
}, {
  title: 'Closed',
  key: 'closed',
}, {
  title: 'Cancelled',
  key: 'cancelled',
}];

function InvoiceView() {
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [status, setStatus] = useState(undefined);

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
        <ActionContainer>
          <DropDown
            value={status}
            onChange={setStatus}
            options={options}
          />
        </ActionContainer>
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
  display: flex;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: 400px;
`;

const ActionContainer = styled.div`
  flex: 1;
  text-align: right;
`;

export default InvoiceView;
