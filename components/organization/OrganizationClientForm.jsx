import React from 'react';
import { shape, func } from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import ButtonLink from 'common-components/button/ButtonLink';
import useForm from 'hooks/useForm';
import { createOrganization } from 'apis/organization-apis';
import { updateBranch } from 'apis/branch-apis';

function InvoiceForm(props) {
  const { value, onComplete } = props;
  const { formField, getValues } = useForm();

  const add = async () => {
    const { name, phone, gstNumber } = getValues();
    const organization = await createOrganization({
      name,
      phone,
    });
    if (gstNumber) {
      await updateBranch(organization.defaultBranch.id, { gstNumber });
    }
    onComplete({ organization });
  };

  const onClickSubmit = () => { add(); };

  return (
    <>
      <Row>
        <FormGroup>
          <InlineLabel>Name</InlineLabel>
          <Input
            {...formField('name', {
              initialValue: value.name,
            })}
            block
            placeholder="Eg. Some Organization, Inc"
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <InlineLabel>Phone</InlineLabel>
          <Input
            {...formField('phone')}
            block
            placeholder="Eg. 9876543210"
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <InlineLabel>GST Number</InlineLabel>
          <Input
            {...formField('gstNumber')}
            block
            placeholder="Eg. 29ABCDE1234F2ZF"
          />
        </FormGroup>
      </Row>
      <ActionCard>
        <ButtonLink
          style={{ marginRight: 12 }}
        >
          Advanced Options
        </ButtonLink>
        <Button
          onClick={onClickSubmit}
        >
          Submit
        </Button>
      </ActionCard>
    </>
  );
}

InvoiceForm.propTypes = {
  value: shape({}),
  onComplete: func,
};

InvoiceForm.defaultProps = {
  value: {},
  onComplete: () => {},
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

export default connect(mapStateToProps, null)(InvoiceForm);
