
import styled from 'styled-components';
import { Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import PropTypes from 'prop-types';

function InvoiceCard(props) {
  const { width, invoice } = props;
  return (
    <Card width={width}>
      <StyledPdfDocument
        loading={(
          <PdfLoading>
            Loading ...
          </PdfLoading>
        )}
        file={invoice.fileUrl}
      >
        <StyledPdfPage pageNumber={1} width={width} />
      </StyledPdfDocument>
    </Card>
  );
}

InvoiceCard.propTypes = {
  width: PropTypes.number,
  invoice: PropTypes.shape({}).isRequired,
};

InvoiceCard.defaultProps = {
  width: 200,
};

const Card = styled.div`
  height: ${p => `${p.width * 1.4142}px`};
  width: ${p => `${p.width}px`};
  box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  }
`;

Card.defaultProps = {
  width: 200,
};

const PdfLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #AAA;
`;

const StyledPdfDocument = styled(PdfDocument)`
  width: 100%;
  height: 100%;
`;

const StyledPdfPage = styled(PdfPage)`
  width: 100%;
  height: 100%;
`;

export default InvoiceCard;
