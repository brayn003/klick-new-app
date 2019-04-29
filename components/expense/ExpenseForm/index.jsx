import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';

import Animate from 'common-components/animate/Animate';
import Card from 'common-components/card/Card';
import Input from 'common-components/controls/Input';
import Label from 'common-components/Label';
import Button from 'common-components/button/Button';
import DatePicker from 'common-components/controls/DatePicker';
import TextArea from 'common-components/controls/Textarea';
import UploadS3 from 'common-components/file/UploadS3';
import SelectExpenseCategory from 'common-components/smart-selects/SelectExpenseCategory';
import SelectExpenseAccount from 'common-components/smart-selects/SelectExpenseAccount';
import useForm from 'hooks/useForm';
import { getExpense, createExpense } from 'apis/expense-apis';
import { transformSelect, transformMultiUploadS3 } from 'helpers/form-transforms';
import { updateExpense } from '../../../apis/expense-apis';

const InvoiceForm = ({
  activeOrg,
  expenseId,
}) => {
  const { formField, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expenseId) {
      setLoading(true);
      getExpense(expenseId)
        .then((expense) => {
          setLoading(false);
          setValue('expenseDate', expense.expenseDate);
          setValue('title', expense.title);
          setValue('category', {
            label: expense.category.name,
            value: expense.category.id,
          });
          setValue('amount', expense.total);
          setValue('accountType', { label: startCase(expense.accountType), value: expense.accountType });
          setValue('tdsAmount', expense.tdsAmount);
          setValue('inlineComment', expense.inlineComment);
          setValue('attachments', expense.attachments.map(f => ({
            file: { name: f },
            key: f,
            result: { url: f },
            status: 'succeeded',
          })));
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  const onClickSubmit = async () => {
    const body = getValues();
    if (expenseId) {
      await updateExpense(expenseId, {
        ...body,
        organization: activeOrg.id,
      });
    } else {
      await createExpense({
        ...body,
        organization: activeOrg.id,
      });
    }
    Router.push('/expense');
  };

  if (loading) {
    return 'loading ...';
  }

  return (
    <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[12, 0]}>
      <Card title="Dates">
        <FormGroup width="50%">
          <InlineLabel>Date of expense</InlineLabel>
          <DatePicker
            {...formField('expenseDate')}
            block
            placeholder="DD / MM / YYYY"
          />
        </FormGroup>
      </Card>
      <Card title="Details">
        <FormGroup width="50%">
          <InlineLabel>Description</InlineLabel>
          <Input
            {...formField('title')}
            block
            placeholder="Eg. Office Party"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Categrory</InlineLabel>
          <SelectExpenseCategory
            {...formField('category', {
              transform: transformSelect,
            })}
            block
            placeholder="Eg. Parties"
          />
        </FormGroup>
      </Card>
      <Card title="Accounts & Amounts">
        <FormGroup width="50%">
          <InlineLabel>Amount</InlineLabel>
          <Input
            {...formField('amount', {
              initialValue: 0,
            })}
            type="number"
            block
            placeholder="0.00"
          />
        </FormGroup>
        <FormGroup width="50%">
          <InlineLabel>Account</InlineLabel>
          <SelectExpenseAccount
            {...formField('accountType', {
              transform: transformSelect,
              initialValue: { label: 'Business', value: 'business' },
            })}
            block
            placeholder="Expense Account"
          />
        </FormGroup>
      </Card>
      <Card title="Deductions">
        <FormGroup width="50%">
          <InlineLabel>TDS Amount</InlineLabel>
          <Input
            {...formField('tdsAmount', {
              initialValue: 0,
            })}
            type="number"
            block
            placeholder="0.00"
          />
        </FormGroup>
      </Card>
      <Card title="Additional Details">
        <FormGroup width="50%">
          <InlineLabel>Comment</InlineLabel>
          <TextArea
            {...formField('inlineComment')}
            block
            placeholder="Add a comment to this expense"
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
        <Button onClick={onClickSubmit}>
          Submit
        </Button>
      </ActionCard>
    </Animate>
  );
};

InvoiceForm.propTypes = {
  activeOrg: shape({}),
  expenseId: string,
};

InvoiceForm.defaultProps = {
  activeOrg: {},
  expenseId: undefined,
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

export default connect(mapStateToProps, null)(InvoiceForm);
