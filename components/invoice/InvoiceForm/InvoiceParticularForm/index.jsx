import React, { useState } from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import Input from 'common-components/controls/Input';
import ButtonLink from 'common-components/button/ButtonLink';
import { FlexRow, FlexCol } from 'common-components/table/FlexTable';
import useForm from '../../../../hooks/useForm';

function InvoiceParticularForm(props) {
  const { onChange } = props;
  const [rows, setRows] = useState(1);
  const { formField } = useForm({
    onChange: (formValue) => {
      onChange(formValue.particulars);
    },
  });

  const onClickAddNew = () => { setRows(rows + 1); };
  const onClickRemove = () => { setRows(rows - 1); };
  return (
    <>
      <FlexRow>
        <FlexCol align="left" bold flex="0 0 40px">Sr.</FlexCol>
        <FlexCol align="center" bold flex="1 1 auto">Particular</FlexCol>
        <FlexCol align="center" bold flex="0 0 100px">Rate</FlexCol>
        <FlexCol align="center" bold flex="0 0 100px">Qty</FlexCol>
        <FlexCol align="center" bold flex="0 0 100px">Amount</FlexCol>
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
              {...formField(`particulars[${index}].rate`)}
              type="number"
              block
              placeholder="0.00"
            />
          </FlexCol>
          <FlexCol align="right" flex="0 0 100px">
            <Input
              {...formField(`particulars[${index}].quantity`)}
              type="number"
              block
              placeholder="0.00"
            />
          </FlexCol>
          {/* <FlexCol align="right" flex="0 0 100px">
            <Input {...formField(`particulars[${index}].rate`)} block placeholder="0.00" />
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
};

InvoiceParticularForm.defaultProps = {
  onChange: () => {},
};


const ActionContainer = styled.div`
  height: 40px;
  /* text-align: right; */
  margin-top: 24px;
`;


export default InvoiceParticularForm;
