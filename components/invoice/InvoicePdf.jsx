
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Document as PdfDocument, Page as PdfPage } from 'react-pdf';
import { string, number, func } from 'prop-types';

const InvoicePdf = ({ src, width, onClick }) => {
  const instance = useRef({});
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 800);
    return () => {
      if (instance.current.pdf) {
        instance.current.pdf.destroy();
      }
    };
  }, []);

  if (!load) {
    return null;
  }

  return (
    <StyledPdfDocument
      onClick={onClick}
      loading={null}
      file={src}
      onLoadSuccess={(pdf) => {
        instance.current.pdf = pdf;
      }}
    >
      <StyledPdfPage loading={null} pageNumber={1} width={width} />
    </StyledPdfDocument>
  );
};

InvoicePdf.propTypes = {
  src: string.isRequired,
  width: number,
  onClick: func,
};

InvoicePdf.defaultProps = {
  width: 200,
  onClick: () => {},
};

const StyledPdfDocument = styled(PdfDocument)``;

const StyledPdfPage = styled(PdfPage)``;

export default InvoicePdf;
