import { useState, forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import startCase from 'lodash/startCase';

import Tag from 'common-components/Tag';

import InvoicePdf from './InvoicePdf';
import InvoicePdfModal from './InvoicePdfModal';

const getStatusColor = (status) => {
  switch (status) {
    case 'closed':
      return '#000000';
    case 'cancelled':
      return '#ED2939';
    case 'open':
    default:
      return '#50C878';
  }
};

function InvoiceCard(props) {
  const { width, invoice, forwardedRef } = props;

  const [showModal, setShowModal] = useState(false);

  const {
    fileUrl,
  } = invoice;
  const serial = invoice.serial || 'n/a';
  const raisedDate = dayjs(invoice.raisedDate).format('DD MMM YYYY');
  const roundedTotal = invoice.roundedTotal ? invoice.roundedTotal.toLocaleString('en-IN') : '-';
  const roundedAmountReceivable = invoice.roundedAmountReceivable.toLocaleString('en-IN');
  const statusColor = getStatusColor(invoice.status);
  const status = startCase(invoice.status);

  const onClickCard = () => { setShowModal(p => !p); };
  const onCloseModal = () => { setShowModal(false); };

  return (
    <>
      <Card
        width={width}
        ref={forwardedRef}
        onClick={onClickCard}
      >
        <InvoicePdf src={fileUrl} />
        <Info>
          <Text bold>{serial}</Text>
          <Text gray>{raisedDate}</Text>
          <Flex>
            <Text noMargin bold style={{ fontSize: '1em' }}>
            ₹ {roundedTotal}
            </Text>
            <Text gray noMargin>Left: ₹ {roundedAmountReceivable}</Text>
          </Flex>
          <StatusTag color={statusColor}>
            {status}
          </StatusTag>
        </Info>
      </Card>
      <InvoicePdfModal
        show={showModal}
        invoice={invoice}
        onClose={onCloseModal}
      />
    </>
  );
}

InvoiceCard.propTypes = {
  width: PropTypes.number,
  invoice: PropTypes.shape({}).isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.func,
  ]),
};

InvoiceCard.defaultProps = {
  width: 200,
  forwardedRef: {},
};

const Card = styled.div`
  height: ${p => `${p.width * 1.4142}px`};
  width: ${p => `${p.width}px`};
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  position: relative;
  margin-bottom: 24px;
  cursor: pointer;
  background-color: #FFF;
  transition: box-shadow 0.1s linear;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;

Card.defaultProps = {
  width: 200,
};

const Info = styled.div`
  width: 100%;
  background-color: #FFF;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
  box-sizing: border-box;
  border-top: 1px solid #EFEFEF;
`;

const Text = styled.p`
  margin-top: 0;
  margin-bottom: ${p => (p.noMargin ? '0' : '8px')};
  font-size: 0.8em;
  font-weight: ${p => (p.bold ? '700' : '400')};
  /* line-height: 1; */
  color: ${p => (p.gray ? '#999999' : 'inherit')};
`;

Text.defaultProps = {
  bold: false,
  noMargin: false,
  gray: false,
};


const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StatusTag = styled(Tag)`
  top: 4px;
  right: 8px;
  position: absolute;
`;

export default forwardRef((p, ref) => <InvoiceCard {...p} forwardedRef={ref} />);
