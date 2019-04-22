import React from 'react';
import { shape, func } from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import SelectPaymentMode from 'common-components/smart-selects/SelectPaymentMode';
import DatePicker from 'common-components/controls/DatePicker';
import useForm from 'hooks/useForm';
import { transformSelect } from 'helpers/form-transforms';

function PaymentForm(props) {
  const { value, onSubmit } = props;
  const { formField, getValues } = useForm();

  const onClickSubmit = () => {
    onSubmit(getValues());
  };

  return (
    <>
      <Row>
        <FormGroup>
          <InlineLabel>Payment Date</InlineLabel>
          <DatePicker
            {...formField('paymentDate', {
              intialValue: (new Date()).toISOString(),
            })}
            block
            placeholder="DD / MM / YYYY"
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <InlineLabel>Amount</InlineLabel>
          <Input
            {...formField('amount', {
              initialValue: value.amount,
            })}
            type="number"
            block
            placeholder="Amount to be paid"
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <InlineLabel>Mode</InlineLabel>
          <SelectPaymentMode
            {...formField('mode', {
              initialValue: { label: 'Cash', value: 'cash' },
              transform: transformSelect,
            })}
            block
            placeholder="Eg. Cash"
          />
        </FormGroup>
      </Row>
      <ActionCard>
        <Button
          onClick={onClickSubmit}
        >
          Submit
        </Button>
      </ActionCard>
    </>
  );
}

PaymentForm.propTypes = {
  value: shape({}),
  onSubmit: func,
};

PaymentForm.defaultProps = {
  value: {},
  onSubmit: () => {},
};

const FormGroup = styled.div`
  width: ${p => p.width};
  float: left;
  margin: 0;
  vertical-align: middle;
  height: auto;
  display: flex;
`;

FormGroup.defaultProps = {
  width: '100%',
};

const InlineLabel = styled(Label)`
  flex: 0 0 30%;
  text-align: right;
  margin: 0;
  height: 100%;
  line-height: 40px;
`;

const ActionCard = styled.div`
  text-align: right;
`;

const Row = styled.div`
  margin-bottom: 24px;

  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const mapStateToProps = (state) => {
  const { organization } = state;
  return {
    activeOrgId: (organization.active.value || {}).id,
  };
};

export default connect(mapStateToProps, null)(PaymentForm);
