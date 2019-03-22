import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import DatePicker from 'common-components/controls/DatePicker';
import TextArea from '../../../common-components/controls/Textarea';

function InvoiceForm() {
  return (
    <Anime delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
      <Card title="Dates">
        <FormGroup width="50%">
          <InlineLabel>Date of expense</InlineLabel>
          <DatePicker block placeholder="DD / MM / YYYY" />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Due Date</InlineLabel>
          <DatePicker block placeholder="DD / MM / YYYY" />
        </FormGroup>
      </Card>
      <Card title="Details">
        <FormGroup width="50%">
          <InlineLabel>Description</InlineLabel>
          <Input block placeholder="Eg. Office Party" />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Categrory</InlineLabel>
          <Input block placeholder="Eg. Parties" />
        </FormGroup>
      </Card>
      <Card title="Accounts & Amounts">
        <FormGroup width="50%">
          <InlineLabel>Amount</InlineLabel>
          <Input block placeholder="0.00" />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Account</InlineLabel>
          <Input block placeholder="Expense Account " />
        </FormGroup>
      </Card>
      <Card title="Deductions">
        <FormGroup width="50%">
          <InlineLabel>TDS Amount</InlineLabel>
          <Input block placeholder="0.00" />
        </FormGroup>
      </Card>
      <Card title="Additional Details">
        <FormGroup width="50%">
          <InlineLabel>Comment</InlineLabel>
          <TextArea block placeholder="Add a comment to this expense" />
        </FormGroup>
      </Card>
      <ActionCard>
        <Button>
          Submit
        </Button>
      </ActionCard>
    </Anime>
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
