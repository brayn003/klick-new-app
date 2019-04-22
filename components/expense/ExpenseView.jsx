import { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Router from 'next/router';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';

import Button from 'common-components/button/Button';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Table from 'common-components/table/Table';
import Pagination from 'common-components/Pagination';
import useForm from 'hooks/useForm';

import { getExpenses } from '../../apis/expense-apis';

const cols = [{
  title: 'Expense Date',
  key: 'expenseDate',
  width: '12%',
  transform: v => dayjs(v).format('DD MMM YYYY'),
}, {
  title: 'Title',
  key: 'title',

}, {
  title: 'Category',
  key: 'category.name',
  width: '12%',
}, {
  title: 'Created By',
  key: 'createdBy.name',
  width: '10%',
}, {
  title: 'Amount',
  key: 'total',
  width: '10%',
  align: 'right',
}, {
  title: 'Account Type',
  key: 'accountType',
  transform: startCase,
  align: 'right',
  width: '12%',
}];

const ExpenseView = ({
  activeOrg,
}) => {
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { formField, getValues } = useForm();
  const values = getValues();

  useEffect(() => {
    setLoading(true);
    getExpenses({
      organization: activeOrg.id,
      page: activePage,
      ...values,
    })
      .then((res) => {
        setLoading(false);
        setExpenses(res);
        setActivePage(res.page);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [...Object.values(values), activePage]);

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
        <Table
          loading={loading}
          cols={cols}
          data={(expenses || {}).docs || []}
          rowKey="id"
        />
      </Card>
      <Pagination
        active={activePage}
        total={(expenses || {}).pages}
        onChange={setActivePage}
      />
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

const mapStateToProps = (state) => {
  const activeOrg = state.organization.active.value;
  return {
    activeOrg,
  };
};

export default connect(mapStateToProps, null)(ExpenseView);
