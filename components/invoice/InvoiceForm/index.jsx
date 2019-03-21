import React from 'react';
import styled from 'styled-components';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import InvoiceParticularForm from './InvoiceParticularForm';
import Button from '../../../common-components/button/Button';
import DatePicker from '../../../common-components/controls/DatePicker';

function InvoiceForm() {
  return (
    <>
      <Card title="Invoice Details">
        <FormGroup width="50%">
          <InlineLabel>Raised Date</InlineLabel>
          <DatePicker block placeholder="DD / MM / YYYY" />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Due Date</InlineLabel>
          <DatePicker block placeholder="DD / MM / YYYY" />
        </FormGroup>
      </Card>
      <Card title="Client Details">
        <FormGroup width="50%">
          <InlineLabel>Client</InlineLabel>
          <Input block placeholder="Search your client list" />
        </FormGroup>
      </Card>
      <Card title="Particulars">
        <InvoiceParticularForm />
      </Card>
      <Card title="Discount">
        <FormGroup width="50%">
          <InlineLabel>Discount Rate</InlineLabel>
          <Input block placeholder="0.00%" />
        </FormGroup>
      </Card>
      <Card title="Tax Deduction at Source">
        <FormGroup width="50%">
          <InlineLabel>TDS Amount</InlineLabel>
          <Input block placeholder="0.00" />
        </FormGroup>
      </Card>
      <ActionCard>
        <Button>
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