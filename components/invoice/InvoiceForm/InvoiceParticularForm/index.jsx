import React, { useState } from 'react';
import styled from 'styled-components';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';

import Input from 'common-components/controls/Input';
import ButtonLink from 'common-components/button/ButtonLink';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
import useForm from 'hooks/useForm';
import SelectTaxType from 'common-components/smart-selects/SelectTaxType';

function InvoiceParticularForm(props) {
  const { onChange, activeOrg } = props;
  const { includeQuantity, taxPerItem } = ((activeOrg || {}).invoicePreferences) || {};

  const [rows, setRows] = useState(1);

  const { formField } = useForm({
    onChange: (formValue) => {
      let { particulars } = formValue;
      if (!includeQuantity) {
        particulars = particulars.map(p => ({
          ...p,
          quantity: 1,
        }));
      }
      onChange(particulars);
    },
  });


  // const value = getValues();
  // const getAmount = (index) => {
  //   if (value && value.particulars) {
  //     const { rate = 0, quantity: origQuantity = 0 } = value.particulars[index] || {};
  //     let quantity = origQuantity;
  //     if (!includeQuantity) {
  //       quantity = 1;
  //     }
  //     return (rate * quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  //   }
  //   return '-';
  // };

  const onClickAddNew = () => { setRows(rows + 1); };
  const onClickRemove = () => { setRows(rows - 1); };
  return (
    <>
      <FlexRow>
        <FlexCol align="left" bold flex="0 0 40px">Sr.</FlexCol>
        <FlexCol align="center" bold flex="1 1 auto">Particular</FlexCol>
        <FlexCol align="center" bold flex="0 0 100px">{includeQuantity ? 'Rate' : 'Amount'}</FlexCol>
        {includeQuantity && <FlexCol align="center" bold flex="0 0 100px">Qty</FlexCol>}
        {taxPerItem && <FlexCol align="center" bold flex="0 0 240px">Tax Rate</FlexCol>}
        {/* <FlexCol align="right" bold flex="0 0 100px">Amount</FlexCol> */}
        <FlexCol align="center" bold flex="0 0 76px">&nbsp;</FlexCol>
      </FlexRow>
      {Array(rows).fill(null).map((item, index) => (
        <FlexRow key={index}>
          <FlexCol flex="0 0 40px">{index + 1}.</FlexCol>
          <FlexCol flex="1 1 auto">
            <Input
              {...formField(`particulars[${index}].details.name`)}
              block
              placeholder="Item description"
            />
          </FlexCol>
          <FlexCol align="right" flex="0 0 100px">
            <Input
              {...formField(`particulars[${index}].rate`, {
                initialValue: 1,
              })}
              type="number"
              min={0}
              block
              placeholder="0.00"
            />
          </FlexCol>
          {includeQuantity && (
            <FlexCol align="right" flex="0 0 100px">
              <Input
                {...formField(`particulars[${index}].quantity`, {
                  initialValue: 1,
                })}
                type="number"
                min={0}
                block
                placeholder="0.00"
              />
            </FlexCol>
          )}
          {taxPerItem && (
            <FlexCol align="right" flex="0 0 240px">
              <SelectTaxType
                {...formField(`particulars[${index}].taxes`, {
                  transform: t => ((t || {}).value || []).map(t2 => ({ taxType: t2 })),
                })}
                placeholder="Tax Rate"
                params={{
                  'config.isSameState': true,
                }}
                groupByRate
                block
              />
            </FlexCol>
          )}
          {/* <FlexCol align="right" flex="0 0 100px">
            {getAmount(index)}
          </FlexCol> */}
          <FlexCol align="center" flex="0 0 76px">
            <ButtonLink
              onClick={() => { onClickRemove(index); }}
            >
              X
            </ButtonLink>
          </FlexCol>
        </FlexRow>
      ))}
      <ActionContainer>
        <ButtonLink
          onClick={onClickAddNew}
        >
          + Add new Item
        </ButtonLink>
      </ActionContainer>
    </>
  );
}

InvoiceParticularForm.propTypes = {
  onChange: func,
  activeOrg: shape({}),
};

InvoiceParticularForm.defaultProps = {
  onChange: () => {},
  activeOrg: {},
};


const ActionContainer = styled.div`
  height: 40px;
  /* text-align: right; */
  margin-top: 24px;
`;

const mapStateToProps = (state) => {
  const { organization } = state;
  return {
    activeOrg: organization.active.value,
  };
};

export default connect(mapStateToProps, null)(InvoiceParticularForm);
