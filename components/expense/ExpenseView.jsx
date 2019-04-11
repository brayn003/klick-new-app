import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
// import Anime from 'react-anime';
import Router from 'next/router';

// import { getInvoices } from 'apis/invoice-apis';
import Button from 'common-components/button/Button';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Animate from 'common-components/animate/Animate';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
import useForm from 'hooks/useForm';

import { getExpenses } from '../../apis/expense-apis';

function InvoiceView() {
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(false);

  const { formField, getValues } = useForm();
  const values = getValues();

  useEffect(() => {
    setLoading(true);
    // const { status, ...rest } = values;
    getExpenses(values)
      .then((res) => {
        setLoading(false);
        setExpenses(res);
      })
      .catch(() => {
        setLoading(false);
      });
  }, Object.values(values));

  return (
    <Container>
      <ActionBar>
        <SearchContainer>
          <Input
            {...formField('title')}
            placeholder="Search expenses"
            block
          />
        </SearchContainer>
        <ActionContainer>
          <Button
            onClick={() => { Router.push({ pathname: '/expense/create' }); }}
            style={{
              marginLeft: 'auto',
            }}
          >
          New Expense
          </Button>
        </ActionContainer>
      </ActionBar>
      <Card>
        <FlexRow>
          <FlexCol bold flex="0 0 120px">Date</FlexCol>
          <FlexCol align="center" bold flex="1 1 auto">Description</FlexCol>
          <FlexCol bold flex="0 0 160px">Category</FlexCol>
          <FlexCol bold flex="0 0 160px">Created by</FlexCol>
          <FlexCol bold flex="0 0 100px">Account Type</FlexCol>
          <FlexCol align="right" bold flex="0 0 100px">Amount</FlexCol>
          <FlexCol align="center" bold flex="0 0 100px">&nbsp;</FlexCol>
        </FlexRow>
        {loading && <p>Loading...</p>}
        <Animate delay={(e, i) => i * 50} opacity={[0, 1]} translateY={[4, 0]}>
          {expenses && expenses.docs.map(expense => (
            <FlexRow key={expense.id}>
              <FlexCol flex="0 0 120px">{dayjs(expense.expenseDate).format('DD MMM YYYY')}</FlexCol>
              <FlexCol flex="1 1 auto">{expense.title}</FlexCol>
              <FlexCol flex="0 0 160px">{(expense.category || {}).name}</FlexCol>
              <FlexCol flex="0 0 160px">{(expense.createdBy || {}).name}</FlexCol>
              <FlexCol flex="0 0 100px">{expense.accountType}</FlexCol>
              <FlexCol align="right" flex="0 0 100px">{expense.total}</FlexCol>
              <FlexCol flex="0 0 100px">&nbsp;</FlexCol>
            </FlexRow>
          ))}
        </Animate>

      </Card>
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

const SearchContainer = styled.div`
  width: 400px;
`;

const ActionContainer = styled.div`
  flex: 1;
  display: flex;
`;

export default InvoiceView;
