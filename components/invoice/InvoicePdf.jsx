
import styled from 'styled-components';
import { Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import { string, number } from 'prop-types';

const InvoicePdf = ({ src, width }) => (
  <StyledPdfDocument
    loading={null}
    file={src}
  >
    <StyledPdfPage loading={null} pageNumber={1} width={width} />
  </StyledPdfDocument>
);

InvoicePdf.propTypes = {
  src: string.isRequired,
  width: number,
};

InvoicePdf.defaultProps = {
  width: 200,
};

const StyledPdfDocument = styled(PdfDocument)``;

const StyledPdfPage = styled(PdfPage)``;

export default InvoicePdf;
