import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';
import Router from 'next/router';

import { getInvoices } from 'apis/invoice-apis';
import InvoiceCard from './InvoiceCard';
import Input from '../../common-components/controls/Input';
import DropDown from '../../common-components/controls/DropDown';
import useForm from '../../hooks/useForm';
import Button from '../../common-components/button/Button';

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
            block
            placeholder="Search invoices"
          />
        </SearchContainer>
        <ActionContainer>
          <DropDown
            {...formField('status')}
            buttonProps={{
              style: {
                marginLeft: 24,
                width: 140,
                textAlign: 'center',

              },
            }}
            options={options}
          />
          <Button
            onClick={() => { Router.push('/invoice/create'); }}
            style={{
              marginLeft: 'auto',
            }}
          >
          New Invoice
          </Button>
        </ActionContainer>
      </ActionBar>
      <CardContainer>
        {loading && 'Loading ...'}
        {!loading && invoices && (
        <Anime delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[4, 0]}>
          {invoices.docs.map(invoice => (
            <InvoiceCard
              key={invoice.id}
              width={pdfWidth}
              invoice={invoice}
            />
          ))}
        </Anime>
        )}
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
  display: flex;
`;

export default InvoiceView;
