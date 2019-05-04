import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { func, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';

import Input from 'common-components/controls/Input';
import ButtonLink from 'common-components/button/ButtonLink';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
import useForm from 'hooks/useForm';
import SelectTaxType from 'common-components/smart-selects/SelectTaxType';

const InvoiceParticularForm = ({ onChange, activeOrg, particulars }) => {
  const { includeQuantity, taxPerItem } = ((activeOrg || {}).invoicePreferences) || {};

  const [rows, setRows] = useState(1);

  const { formField, setValue } = useForm({
    onChange: (formValue) => {
      let { particulars: inParticulars } = formValue;
      inParticulars = inParticulars.map((p) => {
        const newP = p;
        if (!includeQuantity) newP.quantity = 1;
        if (p.details.id) newP.details = p.details.id;
        return newP;
      });
      if (!includeQuantity) {
        inParticulars = inParticulars.map(p => ({
          ...p,
          quantity: 1,
        }));
      }
      onChange(inParticulars);
    },
  });

  useEffect(() => {
    if (particulars) {
      setRows(particulars.length);
      particulars.forEach((p, index) => {
        setValue(`particulars[${index}].details.id`, p.details.id);
        setValue(`particulars[${index}].details.name`, p.details.name);
        setValue(`particulars[${index}].rate`, p.rate);
        setValue(`particulars[${index}].quantity`, p.quantity);
        setValue(`particulars[${index}].taxes`, {
          label: p.taxes.map(({ taxType }) => taxType.name).join(' & '),
          value: p.taxes.map(({ taxType }) => taxType.id),
        });
      });
    }
  }, Object.values(particulars || []));


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
};

InvoiceParticularForm.propTypes = {
  onChange: func,
  activeOrg: shape({}),
  particulars: arrayOf(shape({})),
};

InvoiceParticularForm.defaultProps = {
  onChange: () => {},
  activeOrg: {},
  particulars: [],
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
