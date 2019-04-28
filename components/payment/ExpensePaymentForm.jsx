import { shape, func } from 'prop-types';

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

  return (
    <PaymentForm
      value={{ amount: expense.roundedTotal }}
      onSubmit={onClickSubmit}
    />
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

export default ExpensePaymentForm;
