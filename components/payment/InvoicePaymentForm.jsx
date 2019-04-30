import { shape, func } from 'prop-types';
import sumBy from 'lodash/sumBy';
import styled from 'styled-components';

import PaymentForm from './PaymentForm';
import { createInvoicePayment } from '../../apis/invoice-apis';

const InvoicePaymentForm = ({ invoice, onComplete }) => {
  const onClickSubmit = async (value) => {
    const payment = await createInvoicePayment({
      invoice: invoice.id,
      ...value,
    });
    onComplete(payment);
  };

  const amountPaid = sumBy(invoice.payments, 'amount');
  const amountRemaining = invoice.roundedAmountReceivable - amountPaid;

  return (
    <>
      <Text>
        <Bold>Amount Remaining&nbsp;&nbsp;&nbsp;&nbsp;</Bold>
        {invoice.roundedAmountReceivable} - {amountPaid} = <Bold>{amountRemaining}</Bold>
      </Text>
      <PaymentForm
        value={{ amount: amountRemaining }}
        onSubmit={onClickSubmit}
      />
    </>
  );
};

InvoicePaymentForm.propTypes = {
  invoice: shape({}),
  onComplete: func,
};

InvoicePaymentForm.defaultProps = {
  invoice: {},
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

export default InvoicePaymentForm;
