import React from 'react';
import styled from 'styled-components';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import InvoiceParticularForm from './InvoiceParticularForm';
import Button from '../../../common-components/button/Button';

function InvoiceForm() {
  return (
    <>
      <Card title="Invoice Details">
        <InlineLabel>Raised Date</InlineLabel>
        <InlineInput placeholder="DD / MM / YYYY" />
        <InlineLabel>Due Date</InlineLabel>
        <InlineInput placeholder="DD / MM / YYYY" />
      </Card>
      <Card title="Client Details">
        <InlineLabel>Client</InlineLabel>
        <InlineInput placeholder="Search your client list" />
      </Card>
      <Card title="Particulars">
        <InvoiceParticularForm />
      </Card>
      <Card title="Discount">
        <InlineLabel>Discount Rate</InlineLabel>
        <InlineInput placeholder="0.00%" />
      </Card>
      <Card title="Tax Deduction at Source">
        <InlineLabel>TDS Amount</InlineLabel>
        <InlineInput placeholder="0.00" />
      </Card>
      <ActionCard>
        <Button>
          Submit
        </Button>
      </ActionCard>
    </>
  );
}

const InlineLabel = styled(Label)`
  width: 15%;
  text-align: right;
  float: left;
  margin: 0;
  height: 100%;
  vertical-align: middle;
  line-height: 40px;
`;

const InlineInput = styled(Input)`
  width: 35%;
  float: left;
  vertical-align: middle;
`;

const ActionCard = styled.div`
  text-align: right;
`;

export default InvoiceForm;
