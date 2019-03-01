import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getInvoices } from 'apis/invoice-apis';
import InvoiceCard from './InvoiceCard';
import Input from '../../common-components/controls/Input';
import DropDown from '../../common-components/controls/DropDown';
import useForm from '../../hooks/useForm';

const pdfWidth = 200;

const options = [{
  title: 'All Status',
  key: 'all_status',
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

  const { formField, getValues } = useForm();
  const values = getValues();

  useEffect(() => {
    setLoading(true);
    const { status, ...rest } = values;
    getInvoices({ status: status === 'all_status' ? undefined : status, ...rest })
      .then((res) => {
        setLoading(false);
        setInvoices(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [values.serial, values.status]);

  return (
    <Container>
      <ActionBar>
        <SearchContainer>
          <Input
            {...formField('serial')}
            placeholder="Search invoices"
          />
        </SearchContainer>
        <ActionContainer>
          <Actions>
            <DropDown
              {...formField('status')}
              buttonProps={{ block: true }}
              options={options}
            />
          </Actions>
        </ActionContainer>
      </ActionBar>
      <CardContainer>
        {loading && 'Loading ...'}
        {!loading && invoices && invoices.docs.map((invoice, index) => (
          <InvoiceCard
            animationDelay={`${index * 100}ms`}
            key={invoice.id}
            width={pdfWidth}
            invoice={invoice}
          />
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
  text-align: left;
  padding-left: 16px;
`;

const Actions = styled.div`
  width: 120px;
  display: inline-block;
`;

export default InvoiceView;
