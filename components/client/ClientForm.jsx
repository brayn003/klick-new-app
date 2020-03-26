import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';

import Animate from 'common-components/animate/Animate';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import SelectLocationState from 'common-components/smart-selects/SelectLocationState';
import useForm from 'hooks/useForm';
import { getOrganization, createOrganization, updateOrganization } from 'apis/organization-apis';
import { updateBranch, createBranch } from 'apis/branch-apis';
import { transformSelect } from 'helpers/form-transforms';

const ClientForm = ({
  activeOrg,
  clientId,
  value,
}) => {
  console.log('props', activeOrg, clientId);
  const { formField, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.name) {
      setValue('name', value.name);
    }
    if (clientId) {
      setLoading(true);
      getOrganization(clientId)
        .then((client) => {
          setLoading(false);
          setValue('name', client.name);
          setValue('email', client.email);
          setValue('phone', client.phone);
          setValue('gstNumber', client.defaultBranch.gstNumber);
          setValue('state', {
            label: client.defaultBranch.state.name,
            value: client.defaultBranch.state.id,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  const onClickSubmit = async () => {
    const { gstNumber, state, ...body } = getValues();
    if (clientId) {
      const client = await updateOrganization(clientId, {
        ...body,
        referrer: activeOrg.id,
      });
      await updateBranch(client.defaultBranch, { gstNumber, state });
    } else {
      const client = await createOrganization({
        ...body,
        referrer: activeOrg.id,
      });
      const branch = await createBranch({
        name: 'Home Branch',
        gstNumber,
        state,
        organization: client.id,
      });
      await updateOrganization(client.id, {
        defaultBranch: branch.id,
      });
    }
    Router.push('/client');
  };

  if (loading) {
    return 'loading ...';
  }

  return (
    <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
      <Card title="Info">
        <FormGroup style={{ marginBottom: 32 }} width="50%">
          <InlineLabel>Client Name</InlineLabel>
          <Input
            {...formField('name')}
            block
            placeholder="Eg. ABC Client"
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: 32 }} width="50%">
          <InlineLabel>Mobile</InlineLabel>
          <Input
            {...formField('phone')}
            block
            placeholder="Eg. 9876543210"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Email</InlineLabel>
          <Input
            {...formField('email')}
            block
            placeholder="Eg. abc@xyz.com"
          />
        </FormGroup>
      </Card>
      <Card style={{ zIndex: 20 }} title="Details">
        <FormGroup width="50%">
          <InlineLabel>GST Number</InlineLabel>
          <Input
            {...formField('gstNumber')}
            block
            placeholder="Client's GST Number"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>State</InlineLabel>
          <SelectLocationState
            {...formField('state', {
              transform: transformSelect,
            })}
            block
            placeholder="Eg. Maharashtra"
          />
        </FormGroup>
      </Card>
      <ActionCard>
        <Button onClick={onClickSubmit}>
          Submit
        </Button>
      </ActionCard>
    </Animate>
  );
};

ClientForm.propTypes = {
  activeOrg: shape({}),
  clientId: string,
  value: shape({}),
};

ClientForm.defaultProps = {
  activeOrg: {},
  clientId: undefined,
  value: {},
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
    activeOrg: organization.active.value,
  };
};

export default connect(mapStateToProps, null)(ClientForm);
