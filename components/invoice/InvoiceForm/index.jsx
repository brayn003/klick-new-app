import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { shape, string } from 'prop-types';
import Router from 'next/router';
import startCase from 'lodash/startCase';

import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Button from 'common-components/button/Button';
import { InlineLabel, FormGroup, ActionCard } from 'common-components/form-helpers';
import DatePicker from 'common-components/controls/DatePicker';
import SelectOrganization from 'common-components/smart-selects/SelectOrganization';
import useForm from 'hooks/useForm';
import SelectBranch from 'common-components/smart-selects/SelectBranch';
import Modal from 'common-components/Modal';
import UploadS3 from 'common-components/file/UploadS3';
import Textarea from 'common-components/controls/Textarea';
import SelectTaxType from 'common-components/smart-selects/SelectTaxType';
import Animate from 'common-components/animate/Animate';
import SelectTaxInclusion from 'common-components/smart-selects/SelectTaxInclusion';
import { transformSelect, transformMultiUploadS3 } from 'helpers/form-transforms';
import { getInvoice, createInvoice, updateInvoice } from 'apis/invoice-apis';

import InvoiceParticularForm from './InvoiceParticularForm';
import OrganizationClientForm from '../../organization/OrganizationClientForm';

const InvoiceForm = ({ activeOrg, invoiceId }) => {
  const { formField, getValues, setValue } = useForm();
  const [showAddOrg, setShowAddOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valParticular, setValParticular] = useState();

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getInvoice(invoiceId);
      setValParticular(res.particulars);
      setValue('raisedDate', res.raisedDate);
      setValue('dueDate', res.dueDate);
      setValue('organizationBranch', { label: res.organizationBranch.name, value: res.organizationBranch.id });
      setValue('client', { label: res.client.name, value: res.client.id });
      setValue('taxInclusion', { label: startCase(res.taxInclusion), value: res.taxInclusion });
      setValue('discountRate', res.discountRate);
      setValue('tdsAmount', res.tdsAmount);
      setValue('inlineComment', res.inlineComment);
      setValue('attachments', res.attachments.map(f => ({
        file: { name: f },
        key: f,
        result: { url: f },
        status: 'succeeded',
      })));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      getData();
    }
  }, []);

  const onClickSubmit = async () => {
    const body = getValues();
    if (!(activeOrg.invoicePreferences || {}).taxPerItem) {
      body.particulars = body.particulars.map(p => ({
        ...p,
        taxes: body.taxTypes.map(taxType => ({ taxType })),
      }));
      body.taxTypes = undefined;
    }
    if (invoiceId) {
      await updateInvoice(invoiceId, body);
    } else {
      await createInvoice(body);
    }
    Router.push('/invoice');
  };

  const onClickNewOrganization = (orgName) => { setShowAddOrg(orgName); };
  const onCloseAddOrg = () => { setShowAddOrg(null); };
  const onCompleteClient = ({ organization }) => {
    setShowAddOrg(null);
    setValue('client', {
      label: organization.name,
      value: organization.id,
    });
  };

  if (loading) {
    return 'loading ...';
  }

  return (
    <>
      <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
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
        <Card style={{ zIndex: 30 }} title="Client Details">
          <FormGroup width="50%">
            <InlineLabel>Branch</InlineLabel>
            <SelectBranch
              {...formField('organizationBranch', {
                transform: transformSelect,
              })}
              organizationId={activeOrg.id}
              block
              placeholder="Search your client list"
            />
          </FormGroup>
          <FormGroup width="50%">
            <InlineLabel>Client</InlineLabel>
            <SelectOrganization
              {...formField('client', {
                transform: transformSelect,
              })}
              params={{
                verfied: false,
                referrer: activeOrg.id,
              }}
              block
              filter={[activeOrg.id]}
              placeholder="Search your client list"
              onCreateOption={onClickNewOrganization}
            />
          </FormGroup>
        </Card>
        <Card style={{ zIndex: 20 }} title="Particulars">
          <InvoiceParticularForm
            taxPerItem={(activeOrg.invoicePreferences || {}).taxPerItem}
            particulars={valParticular}
            {...formField('particulars')}
          />
        </Card>
        <Card style={{ zIndex: 10 }} title="Taxes">
          <FormGroup width="50%">
            <InlineLabel>Tax Inclusion</InlineLabel>
            <SelectTaxInclusion
              {...formField('taxInclusion', {
                initialValue: { label: 'Inclusive', value: 'inclusive' },
                transform: transformSelect,
              })}
            />
          </FormGroup>
          {!(activeOrg.invoicePreferences || {}).taxPerItem && (
          <FormGroup width="50%">
            <InlineLabel>Tax Rate</InlineLabel>
            <SelectTaxType
              {...formField('taxTypes', {
                transform: transformSelect,
              })}
              type="number"
              block
              placeholder="Select Tax Type"
            />
          </FormGroup>
          )}
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
              {...formField('attachments', {
                transform: transformMultiUploadS3,
              })}
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
      </Animate>
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
};

InvoiceForm.propTypes = {
  activeOrg: shape({}),
  invoiceId: string,
};

InvoiceForm.defaultProps = {
  activeOrg: {},
  invoiceId: null,
};

const mapStateToProps = (state) => {
  const { organization } = state;
  return {
    activeOrg: organization.active.value,
  };
};

export default connect(mapStateToProps, null)(InvoiceForm);
