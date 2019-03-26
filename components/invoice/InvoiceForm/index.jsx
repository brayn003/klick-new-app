import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import DatePicker from 'common-components/controls/DatePicker';
import SelectOrganization from 'common-components/smart-selects/SelectOrganization';
import useForm from 'hooks/useForm';
import SelectBranch from 'common-components/smart-selects/SelectBranch';
// import { createInvoice } from 'apis/invoice-apis';

import InvoiceParticularForm from './InvoiceParticularForm';
import Modal from '../../../common-components/Modal';
import OrganizationClientForm from '../../organization/OrganizationClientForm';
import UploadS3 from '../../../common-components/file/UploadS3';
import Textarea from '../../../common-components/controls/Textarea';

function InvoiceForm(props) {
  const { activeOrgId } = props;
  const { formField, getValues, setValue } = useForm();
  const [showAddOrg, setShowAddOrg] = useState(null);

  const onClickSubmit = async () => {
    const body = getValues();
    console.log(body);
    // const res = await createInvoice(body);
  };

  const onClickNewOrganization = (orgName) => { setShowAddOrg(orgName); };
  const onCloseAddOrg = () => { setShowAddOrg(null); };
  const onCompleteClient = ({ organization }) => {
    setShowAddOrg(null);
    setValue('clientBranch', {
      label: organization.name,
      value: organization.id,
    });
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
          <SelectBranch
            {...formField('organizationBranch')}
            organizationId={activeOrgId}
            block
            placeholder="Search your client list"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Client</InlineLabel>
          <SelectOrganization
            {...formField('clientBranch')}
            block
            filter={[activeOrgId]}
            placeholder="Search your client list"
            onCreateOption={onClickNewOrganization}
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
      <Card title="Extras">
        <FormGroup width="50%">
          <InlineLabel>Comment</InlineLabel>
          <Textarea
            {...formField('inlineComment')}
            placeholder="Write a comment"
            block
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Attachments</InlineLabel>
          <UploadS3
            {...formField('attachments')}
            style={{ width: '70%' }}
            multiple
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
      <Modal
        show={showAddOrg}
        width={480}
        title="Create Organization"
        onClose={onCloseAddOrg}
      >
        <OrganizationClientForm
          value={{ name: showAddOrg }}
          onComplete={onCompleteClient}
        />
      </Modal>
    </>
  );
}

InvoiceForm.propTypes = {
  activeOrgId: string,
};

InvoiceForm.defaultProps = {
  activeOrgId: null,
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

const mapStateToProps = (state) => {
  const { organization } = state;
  return {
    activeOrgId: (organization.active.value || {}).id,
  };
};

export default connect(mapStateToProps, null)(InvoiceForm);
