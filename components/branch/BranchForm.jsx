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
import { getBranch, createBranch, updateBranch } from 'apis/branch-apis';
import { transformSelect } from 'helpers/form-transforms';

const BranchForm = ({
  activeOrg,
  branchId,
}) => {
  console.log('props', activeOrg, branchId);
  const { formField, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (branchId) {
      setLoading(true);
      getBranch(branchId)
        .then((branch) => {
          setLoading(false);
          setValue('name', branch.name);
          setValue('gstNumber', branch.gstNumber);
          setValue('addressLineOne', branch.addressLineOne);
          setValue('addressLineTwo', branch.addressLineTwo);
          setValue('state', {
            label: branch.state.name,
            value: branch.state.id,
          });
          setValue('pincode', branch.pincode);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  const onClickSubmit = async () => {
    const body = getValues();
    if (branchId) {
      await updateBranch(branchId, {
        ...body,
        organization: activeOrg.id,
      });
    } else {
      await createBranch({
        ...body,
        organization: activeOrg.id,
      });
    }
    Router.push('/branch');
  };

  if (loading) {
    return 'loading ...';
  }

  return (
    <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
      <Card title="Details">
        <FormGroup width="50%">
          <InlineLabel>Branch Name</InlineLabel>
          <Input
            {...formField('name')}
            block
            placeholder="Eg. Home Branch"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>GST Number</InlineLabel>
          <Input
            {...formField('gstNumber')}
            block
            placeholder="Your GST Number"
          />
        </FormGroup>
      </Card>
      <Card style={{ zIndex: 20 }} title="Location">
        <FormGroup style={{ marginBottom: 32 }} width="50%">
          <InlineLabel>Address Line 1</InlineLabel>
          <Input
            {...formField('addressLineOne')}
            block
            placeholder="Eg. Unit number, Bldg Name"
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: 32 }} width="50%">
          <InlineLabel>Address Line 2</InlineLabel>
          <Input
            {...formField('addressLineTwo')}
            block
            placeholder="Eg. Area, Landmark"
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
        <FormGroup style={{ marginBottom: 32 }} width="50%">
          <InlineLabel>Pincode</InlineLabel>
          <Input
            {...formField('pincode')}
            block
            placeholder="Eg. 400001"
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

BranchForm.propTypes = {
  activeOrg: shape({}),
  branchId: string,
};

BranchForm.defaultProps = {
  activeOrg: {},
  branchId: undefined,
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

export default connect(mapStateToProps, null)(BranchForm);
