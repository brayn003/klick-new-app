import Card from 'common-components/card/Card';
import { FormGroup, ActionCard, InlineLabel } from 'common-components/form-helpers';
// import DatePicker from 'common-components/controls/DatePicker';
import Input from 'common-components/controls/Input';
import Button from 'common-components/button/Button';
import Checkbox from 'common-components/controls/Checkbox';
import UploadS3 from 'common-components/file/UploadS3';
import SelectIndustryType from 'common-components/smart-selects/SelectIndustryType';
import useForm from 'hooks/useForm';
import { transformUploadS3 } from 'helpers/form-transforms';

const OrganizationForm = () => {
  const { formField, getValues } = useForm();

  const onClickSubmit = () => { console.log(getValues()); };
  return (
    <>
      <Card title="Details">
        <FormGroup width="50%">
          <InlineLabel>Name</InlineLabel>
          <Input
            {...formField('name')}
            block
            placeholder="Eg. Klick Consulting"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Logo</InlineLabel>
          <UploadS3
            {...formField('logo', {
              transform: transformUploadS3,
            })}
            style={{ width: '70%' }}
          />
        </FormGroup>
      </Card>
      <Card title="Contact">
        <FormGroup width="50%">
          <InlineLabel>Phone</InlineLabel>
          <Input
            {...formField('phone')}
            block
            placeholder="Eg. 2212345678"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Email</InlineLabel>
          <Input
            {...formField('email')}
            block
            placeholder="Eg. abc@klickconsulting.in"
          />
        </FormGroup>
      </Card>
      <Card title="Authority Details">
        <FormGroup width="50%">
          <InlineLabel>PAN</InlineLabel>
          <Input
            {...formField('pan')}
            block
            placeholder="Eg. CJHGFD7654"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Signature</InlineLabel>
          <UploadS3
            {...formField('signature', {
              transform: transformUploadS3,
            })}
            style={{ width: '70%' }}
          />
        </FormGroup>
      </Card>
      <Card title="Industry Details">
        <FormGroup width="50%">
          <InlineLabel>Industry Type</InlineLabel>
          <SelectIndustryType
            {...formField('industryType')}
            block
            placeholder="Eg. Service Based"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Compostion</InlineLabel>
          <Checkbox
            {...formField('isUnderComposition', {
              valuePropName: 'checked',
              initialValue: false,
            })}
          >
            Is under composition?
          </Checkbox>
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
};

export default OrganizationForm;
