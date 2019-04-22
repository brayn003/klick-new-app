import { shape } from 'prop-types';

import PaymentForm from './PaymentForm';

const ExpensePaymentForm = ({ expense }) => {
  console.log('expense payment');
  return (
    <PaymentForm
      value={{ amount: expense.roundedTotal }}
      onSubmit={(val) => { console.log(val); }}
    />
  );
};

ExpensePaymentForm.propTypes = {
  expense: shape({}),
};

ExpensePaymentForm.defaultProps = {
  expense: {},
};

export default ExpensePaymentForm;
