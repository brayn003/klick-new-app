import { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
// import Anime from 'react-anime';
import Router from 'next/router';
import { connect } from 'react-redux';
import { MdPerson } from 'react-icons/md';
import startCase from 'lodash/startCase';

// import { getInvoices } from 'apis/invoice-apis';
import Button from 'common-components/button/Button';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Animate from 'common-components/animate/Animate';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
import useForm from 'hooks/useForm';

import { getExpenses } from '../../apis/expense-apis';
import Table from '../../common-components/table/Table';

const ExpenseView = ({
  activeOrg,
}) => {
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(false);

  const { formField, getValues } = useForm();
  const values = getValues();

  useEffect(() => {
    setLoading(true);
    // const { status, ...rest } = values;
    getExpenses({
      organization: activeOrg.id,
      values,
    })
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
      <Table
        cols={[{
          title: 'Expense Date',
          key: 'expenseDate',
          transform: v => dayjs(v).format('DD MMM YYYY'),
        }, {
          title: 'Title',
          key: 'title',
        }, {
          title: 'Category',
          key: 'category.name',
        }, {
          title: 'Created By',
          key: 'createdBy.name',
        }, {
          title: 'Amount',
          key: 'total',
          style: { textAlign: 'right' },
        }, {
          title: 'Account Type',
          key: 'accountType',
          transform: startCase,
        }]}
        data={(expenses || {}).docs || []}
        rowKey="id"
      />
      {/* {expenses && expenses.docs.map(expense => (

        // <Card key={expense.id}>
        //   <ExpenseContainer>
        //     <DateContainer>
        //       {dayjs(expense.expenseDate).format('DD MMM YYYY')}
        //     </DateContainer>
        //     <DetailsContainer>
        //       <Title>{expense.title}</Title>
        //       <Meta>
        //         Created At:&nbsp;
        //         {dayjs(expense.createdAt).format('DD MMM YYYY')}&nbsp;
        //         |&nbsp;&nbsp;Due Date:&nbsp;
        //         {expense.dueDate ? dayjs(expense.dueDate).format('DD MMM YYYY') : 'n/a'}
        //       </Meta>
        //       <Meta>
        //         <MdPerson
        //           style={{
        //             fontSize: '1.1em',
        //             verticalAlign: 'top',
        //           }}
        //         />
        //         &nbsp;
        //         {(expense.createdBy || {}).name}
        //       </Meta>
        //     </DetailsContainer>
        //   </ExpenseContainer>
        // </Card>
      ))} */}
    </Container>
  );
};

ExpenseView.propTypes = {
  activeOrg: shape({}),
};

ExpenseView.defaultProps = {
  activeOrg: {},
};

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

const DateContainer = styled.div`
  flex: 0 0 200px;
  display: inline-block;
  vertical-align: top;
  text-align: right;
  box-sizing: border-box;
  padding: 0 16px;
`;

const ExpenseContainer = styled.div`
  display: flex;
`;

const DetailsContainer = styled.div`
  flex: auto;
`;

const Title = styled.h3`
  margin-top: 0;
  font-size: 1em;
  margin-bottom: 8px;
`;

const Meta = styled.p`
  color: #666;
  font-size: 0.83em;
  margin: 0;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const mapStateToProps = (state) => {
  const activeOrg = state.organization.active.value;
  return {
    activeOrg,
  };
};

export default connect(mapStateToProps, null)(ExpenseView);
