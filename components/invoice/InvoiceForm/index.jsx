import React from 'react';
import styled from 'styled-components';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import DatePicker from 'common-components/controls/DatePicker';

import InvoiceParticularForm from './InvoiceParticularForm';
import useForm from '../../../hooks/useForm';
import { createInvoice } from '../../../apis/invoice-apis';

function InvoiceForm() {
  const { formField, getValues } = useForm();

  const onClickSubmit = async () => {
    const body = getValues();
    const res = await createInvoice(body);
    console.log(res);
  };
  return (
    <>
      <Card title="Invoice Details">
        <FormGroup width="50%">
          <InlineLabel>Raised Date</InlineLabel>
          <DatePicker
            {...formField('raisedDate')}
            block
            placeholder="DD / MM / YYYY"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Due Date</InlineLabel>
          <DatePicker
            {...formField('dueDate')}
            block
            placeholder="DD / MM / YYYY"
          />
        </FormGroup>
      </Card>
      <Card title="Client Details">
        <FormGroup width="50%">
          <InlineLabel>Branch</InlineLabel>
          <Input
            {...formField('organizationBranch')}
            block
            placeholder="Search your client list"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Client</InlineLabel>
          <Input
            {...formField('clientBranch')}
            block
            placeholder="Search your client list"
          />
        </FormGroup>
      </Card>
      <Card title="Particulars">
        <InvoiceParticularForm
          {...formField('particulars')}
        />
      </Card>
      <Card title="Discount">
        <FormGroup width="50%">
          <InlineLabel>Discount Rate</InlineLabel>
          <Input
            {...formField('discountRate')}
            type="number"
            block
            placeholder="0.00%"
          />
        </FormGroup>
      </Card>
      <Card title="Deductions">
        <FormGroup width="50%">
          <InlineLabel>TDS Amount</InlineLabel>
          <Input
            {...formField('tdsAmount')}
            type="number"
            block
            placeholder="0.00"
          />
        </FormGroup>
      </Card>
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

export default InvoiceForm;
