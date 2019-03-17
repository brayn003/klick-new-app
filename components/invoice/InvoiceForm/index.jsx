import React from 'react';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';

function InvoiceForm() {
  return (
    <Card>
      <Label>Client</Label>
      <Input placeholder="Search your client list" />
    </Card>
  );
}

export default InvoiceForm;
