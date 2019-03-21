import React, { useState } from 'react';
import styled from 'styled-components';

import Input from 'common-components/controls/Input';
import ButtonLink from 'common-components/button/ButtonLink';

function InvoiceParticularForm() {
  const [rows, setRows] = useState(1);

  const onClickAddNew = () => {
    setRows(rows + 1);
  };
  return (
    <>
      <Row>
        <Col align="left" bold flex="0 0 40px">Sr.</Col>
        <Col align="center" bold flex="1 1 auto">Particular</Col>
        <Col align="center" bold flex="0 0 100px">Rate</Col>
        <Col align="center" bold flex="0 0 100px">Qty</Col>
        <Col align="center" bold flex="0 0 100px">Amount</Col>
      </Row>
      {Array(rows).fill(null).map((item, index) => (
        <Row>
          <Col flex="0 0 40px">{index + 1}.</Col>
          <Col flex="1 1 auto">
            <Input block placeholder="Item description" />
          </Col>
          <Col align="right" flex="0 0 100px">
            <Input block placeholder="0.00" />
          </Col>
          <Col align="right" flex="0 0 100px">
            <Input block placeholder="0.00" />
          </Col>
          <Col align="right" flex="0 0 100px">
            <Input block placeholder="0.00" />
          </Col>
        </Row>
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

const Row = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Col = styled.div`
  font-weight: ${p => (p.bold ? '700' : 'inherit')};
  flex: ${p => p.flex};
  height: 40px;
  line-height: 40px;
  text-align: ${p => p.align};
  box-sizing: border-box;
  padding: 0 4px;
`;

const ActionContainer = styled.div`
  height: 40px;
  /* text-align: right; */
  margin-top: 24px;
`;

Col.defaultProps = {
  flex: '1',
  bold: false,
  align: 'initial',
};


export default InvoiceParticularForm;
