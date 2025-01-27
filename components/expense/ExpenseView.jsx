import { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Router from 'next/router';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import { FiDollarSign, FiEdit2, FiMoreVertical } from 'react-icons/fi';

import DropDown from 'common-components/controls/DropDown';
import Button from 'common-components/button/Button';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Table from 'common-components/table/Table';
import Pagination from 'common-components/Pagination';
import IconButton from 'common-components/button/IconButton';
import useForm from 'hooks/useForm';
import Modal from 'common-components/Modal';

import { getExpenses, updateExpense } from '../../apis/expense-apis';
import ExpensePaymentForm from '../payment/ExpensePaymentForm';


const ExpenseView = ({
  activeOrg,
}) => {
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [paymentExpense, setPaymentExpense] = useState(null);

  const { formField, getValues } = useForm();
  const values = getValues();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getExpenses({
        organization: activeOrg.id,
        page: activePage,
        ...values,
      });
      setLoading(false);
      setExpenses(res);
      setActivePage(res.page);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [...Object.values(values), activePage]);

  const onClickPayment = (expense) => { setPaymentExpense(expense); };
  const onClosePayment = () => { setPaymentExpense(null); };
  const onCompletePayment = () => {
    onClosePayment();
    getData();
  };
  const onClickEdit = (expense) => {
    Router.push(`/expense/edit?expenseId=${expense.id}`, `/expense/edit/${expense.id}`);
  };

  const onClickForceClose = async (expense) => {
    await updateExpense(expense.id, { status: 'closed' });
    getData();
  };
  const onClickCancel = async (expense) => {
    await updateExpense(expense.id, { status: 'cancelled' });
    getData();
  };

  const onChangeDropDown = (key, expense) => {
    if (key === 'force_close') onClickForceClose(expense);
    if (key === 'cancel') onClickCancel(expense);
  };

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
    title: 'Status',
    key: 'status',
    transform: startCase,
    width: '10%',
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
  }, {
    title: '',
    key: 'action',
    width: '14%',
    align: 'right',
    render: r => (
      <>
        <IconButton
          tooltipText="Add Payment"
          onClick={() => { onClickPayment(r); }}
          disabled={r.status === 'closed'}
        >
          <FiDollarSign />
        </IconButton>
        <IconButton
          onClick={() => { onClickEdit(r); }}
          tooltipText="Edit Expense"
        >
          <FiEdit2 />
        </IconButton>
        <DropDown
          options={[{
            title: 'Force Close',
            key: 'force_close',
          }, {
            title: 'Cancel',
            key: 'cancel',
          }]}
          onChange={(key) => { onChangeDropDown(key, r); }}
        >
          <IconButton tooltipText="More Options">
            <FiMoreVertical />
          </IconButton>
        </DropDown>
      </>
    ),
  }];


  return (
    <>
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
      <Modal
        title="Payment for Expense"
        show={!!paymentExpense}
        onClose={onClosePayment}
      >
        <ExpensePaymentForm expense={paymentExpense} onComplete={onCompletePayment} />
      </Modal>
    </>
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
