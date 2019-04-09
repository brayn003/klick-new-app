import { bool, shape, func } from 'prop-types';
import styled from 'styled-components';
// import { MdArrowBack } from 'react-icons/md';

import Portal from 'common-components/Portal';
// import OgButtonLink from 'common-components/button/ButtonLink';
import useBoundedClick from 'hooks/useBoundedClick';

import InvoicePdf from './InvoicePdf';


const InvoicePdfModal = ({
  show,
  invoice,
  onClose,
}) => {
  const containerRef = useBoundedClick({
    onOuterClick(e) {
      e.stopPropagation();
      onClose();
    },
  });
  return (
    <Portal>
      {show && (
      <Container>
        {/* <BackSection>
          <ButtonLink
            style={{ color: '#FFFFFF' }}
          >
            <MdArrowBack style={{ fontSize: 20, marginRight: 12 }} />
            Serial: {invoice.serial || 'n/a'}
          </ButtonLink>
        </BackSection> */}
        <InnerContainer
          width={800}
          ref={containerRef}
        >
          <InvoicePdf
            width={800}
            src={invoice.fileUrl}
          />
        </InnerContainer>
      </Container>
      )}
    </Portal>
  );
};

InvoicePdfModal.propTypes = {
  show: bool,
  invoice: shape({}),
  onClose: func,
};

InvoicePdfModal.defaultProps = {
  show: false,
  invoice: null,
  onClose: () => {},
};

const Container = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 1180;
  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  width: ${p => p.width}px;
  height: ${p => p.width * 1.412}px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  margin-top: 24px;
  margin-bottom: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
  z-index: 1190;
`;

// const BackSection = styled.div`
//   width: auto;
//   height: 64px;
//   box-sizing: border-box;
//   position: fixed;
//   top: 12px;
//   left: 12px;
//   box-shadow: rgba(0, 0, 0, 0.12) 0px 14px 28px, rgba(0, 0, 0, 0.08) 0px 10px 10px;
//   z-index: 1200;
// `;

// const ButtonLink = styled(OgButtonLink)`
//   color: #FFF;
//   display: flex;
//   align-items: center;
//   &:hover {
//     color: #4798db !important;
//   }
// `;

export default InvoicePdfModal;
