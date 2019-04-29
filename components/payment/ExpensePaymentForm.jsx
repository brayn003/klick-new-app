import { shape, func } from 'prop-types';
import sumBy from 'lodash/sumBy';
import styled from 'styled-components';

import PaymentForm from './PaymentForm';
import { createExpensePayment } from '../../apis/expense-apis';

const ExpensePaymentForm = ({ expense, onComplete }) => {
  const onClickSubmit = async (value) => {
    const payment = await createExpensePayment({
      expense: expense.id,
      ...value,
    });
    onComplete(payment);
  };

  const amountPaid = sumBy(expense.payments, 'amount');
  const amountRemaining = expense.roundedAmountPayable - amountPaid;

  return (
    <>
      <Text>
        <Bold>Amount Remaining&nbsp;&nbsp;&nbsp;&nbsp;</Bold>
        {expense.roundedAmountPayable} - {amountPaid} = <Bold>{amountRemaining}</Bold>
      </Text>
      <PaymentForm
        value={{ amount: amountRemaining }}
        onSubmit={onClickSubmit}
      />
    </>
  );
};

ExpensePaymentForm.propTypes = {
  expense: shape({}),
  onComplete: func,
};

ExpensePaymentForm.defaultProps = {
  expense: {},
  onComplete: () => {},
};

const Text = styled.p`
  margin: 0;
  line-height: 40px;
  margin-bottom: 24px;
`;

const Bold = styled.span`
  font-weight: 700;
`;

export default ExpensePaymentForm;
