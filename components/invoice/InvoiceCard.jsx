
import styled, { keyframes } from 'styled-components';
import { Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import startCase from 'lodash/startCase';

import Tag from 'common-components/Tag';

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
  const { width, invoice, animationDelay } = props;
  return (
    <Card animationDelay={animationDelay} width={width}>
      <StyledPdfDocument
        loading={null}
        file={invoice.fileUrl}
      >
        <StyledPdfPage pageNumber={1} width={width} />
      </StyledPdfDocument>
      <Info>
        <Text bold>{invoice.serial || 'n/a'}</Text>
        <Text gray>{dayjs(invoice.raisedDate).format('DD MMM YYYY')}</Text>
        <Flex>
          <Text noMargin bold style={{ fontSize: '1em' }}>
            ₹ {invoice.roundedGrandTotal.toLocaleString('en-IN')}
          </Text>
          <Text gray noMargin>Left: ₹ {invoice.roundedAmountReceivable.toLocaleString('en-IN')}</Text>
        </Flex>
        <StatusTag
          color={getStatusColor(invoice.status)}
        >
          {startCase(invoice.status)}
        </StatusTag>
      </Info>
    </Card>
  );
}

InvoiceCard.propTypes = {
  width: PropTypes.number,
  invoice: PropTypes.shape({}).isRequired,
  animationDelay: PropTypes.string,
};

InvoiceCard.defaultProps = {
  width: 200,
  animationDelay: '0',
};

const cardAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 4px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Card = styled.div`
  height: ${p => `${p.width * 1.4142}px`};
  width: ${p => `${p.width}px`};
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  margin-bottom: 24px;
  cursor: pointer;
  animation-name: ${cardAnimation};
  animation-duration: 300ms;
  animation-timing-function: linear;
  animation-delay: ${p => p.animationDelay};
  animation-fill-mode: forwards;
  opacity: 0;
  background-color: #FFF;
  transition: box-shadow 0.1s linear;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;

Card.defaultProps = {
  width: 200,
  animationDelay: 0,
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

const StyledPdfDocument = styled(PdfDocument)`
  width: 100%;
  height: 100%;
`;

const StyledPdfPage = styled(PdfPage)`
  width: 100%;
  height: 100%;
`;

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

export default InvoiceCard;
