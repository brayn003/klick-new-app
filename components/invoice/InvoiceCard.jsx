import { useState, forwardRef } from 'react';
import styled from 'styled-components';
import {
  number, shape, oneOfType, func,
} from 'prop-types';
import dayjs from 'dayjs';
import startCase from 'lodash/startCase';
import { FiDollarSign, FiMoreVertical, FiEdit2 } from 'react-icons/fi';
import Router from 'next/router';
import sumBy from 'lodash/sumBy';

import Tag from 'common-components/Tag';
import IconButton from 'common-components/button/IconButton';
import DropDown from 'common-components/controls/DropDown';
import Modal from 'common-components/Modal';
import Actions from 'common-components/Actions';

import InvoicePdf from './InvoicePdf';
import InvoicePdfModal from './InvoicePdfModal';
import InvoicePaymentForm from '../payment/InvoicePaymentForm';
import { updateInvoice } from '../../apis/invoice-apis';

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

const InvoiceCard = ({
  width, invoice, forwardedRef, refreshData,
}) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    previewUrl,
    fileUrl,
  } = invoice;
  const serial = invoice.serial || 'n/a';
  const raisedDate = dayjs(invoice.raisedDate).format('DD MMM YYYY');
  const roundedTotal = invoice.roundedTotal ? invoice.roundedTotal.toLocaleString('en-IN') : '-';
  const statusColor = getStatusColor(invoice.status);
  const status = startCase(invoice.status);
  const amountReceived = sumBy(invoice.payments, 'amount');
  const amountLeft = (invoice.roundedAmountReceivable - amountReceived).toLocaleString('en-IN');

  const onClickCard = (e) => { e.stopPropagation(); setShowInvoiceModal(p => !p); };
  const onCloseModal = () => { setShowInvoiceModal(false); };

  const onClickAddPayment = () => { setShowPaymentModal(true); };
  const onClosePaymentModal = () => { setShowPaymentModal(false); };
  const onCompletePayment = () => {
    setShowInvoiceModal(false);
    refreshData();
  };

  const onClickEdit = () => {
    Router.push(`/invoice/edit?invoiceId=${invoice.id}`, `invoice/edit/${invoice.id}`);
  };

  const onForceClose = async () => {
    setLoading(true);
    try {
      await updateInvoice(invoice.id, { status: 'closed' });
      setLoading(false);
      refreshData();
    } catch (err) {
      setLoading(false);
    }
  };

  const onCancel = async () => {
    setLoading(true);
    try {
      await updateInvoice(invoice.id, { status: 'cancelled' });
      setLoading(false);
      refreshData();
    } catch (err) {
      setLoading(false);
    }
  };

  const onChangeDropDown = (key) => {
    if (key === 'force_close') onForceClose();
    if (key === 'cancel') onCancel();
  };

  if (loading) {
    return (
      <Card
        width={width}
        ref={forwardedRef}
      >
        Loading ...
      </Card>
    );
  }

  return (
    <>
      <Card
        width={width}
        ref={forwardedRef}
      >
        {previewUrl
          ? <Thumbnail onClick={onClickCard} src={previewUrl} />
          : <InvoicePdf onClick={onClickCard} src={fileUrl} />
        }
        <Actions>
          <IconButton
            tooltipText="Add Payment"
            onClick={onClickAddPayment}
            disabled={invoice.status !== 'open'}
          >
            <FiDollarSign />
          </IconButton>
          <IconButton
            onClick={onClickEdit}
            tooltipText="Edit Invoice"
          >
            <FiEdit2 />
          </IconButton>
          <DropDown
            options={[{
              title: 'Force Close',
              key: 'force_close',
            }, {
              title: 'Cancel',
              key: 'cancel',
            }]}
            onChange={onChangeDropDown}
          >
            <IconButton tooltipText="More Options">
              <FiMoreVertical />
            </IconButton>
          </DropDown>
        </Actions>
        {/* </Overlay> */}
        <Info>
          <Text bold>{serial}</Text>
          <Text gray>{raisedDate}</Text>
          <Flex>
            <Text noMargin bold style={{ fontSize: '1em' }}>
            ₹ {roundedTotal}
            </Text>
            <Text gray noMargin>Left: ₹ {amountLeft}</Text>
          </Flex>
          <StatusTag color={statusColor}>
            {status}
          </StatusTag>
        </Info>
      </Card>
      <InvoicePdfModal
        show={showInvoiceModal}
        invoice={invoice}
        onClose={onCloseModal}
      />
      <Modal show={showPaymentModal} onClose={onClosePaymentModal}>
        <InvoicePaymentForm invoice={invoice} onComplete={onCompletePayment} />
      </Modal>
    </>
  );
};

InvoiceCard.propTypes = {
  width: number,
  invoice: shape({}).isRequired,
  forwardedRef: oneOfType([
    shape({}),
    func,
  ]),
  refreshData: func,
};

InvoiceCard.defaultProps = {
  width: 200,
  forwardedRef: {},
  refreshData: () => {},
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

    ${Actions} {
      opacity: 1;
    }
  }
`;

Card.defaultProps = {
  width: 200,
};

// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.3);
//   will-change: opacity;
//   opacity: 0;
//   transition: opacity 0.1s linear;

//   &:hover {
//     opacity: 1;
//   }
// `;

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

const Thumbnail = styled.div`
  background-image: ${p => (p.src ? `url(${p.src})` : 'none')};
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

export default forwardRef((p, ref) => <InvoiceCard {...p} forwardedRef={ref} />);
