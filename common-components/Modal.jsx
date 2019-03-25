import React from 'react';
import {
  bool, func, node, string, oneOfType, number,
} from 'prop-types';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import useBoundedClick from 'hooks/useBoundedClick';

import Portal from './Portal';

function Modal(props) {
  const {
    show,
    onClose,
    children,
    showOverlay,
    title,
    width,
  } = props;

  const containerRef = useBoundedClick({
    onOuterClick(e) {
      e.stopPropagation();
      onClose();
    },
  });

  return (
    <Portal>
      {show && (
      <>
        {showOverlay && <Overlay />}
        <Container width={width} ref={containerRef}>
          {title && <Title>{title}</Title>}
          <CloseButton onClick={() => { onClose(); }}>
            <MdClose />
          </CloseButton>
          {children}
        </Container>
      </>
      )}
    </Portal>
  );
}

Modal.propTypes = {
  show: bool,
  onClose: func,
  children: node,
  showOverlay: bool,
  title: string,
  width: oneOfType([string, number]),
};

Modal.defaultProps = {
  show: false,
  onClose: () => {},
  children: null,
  showOverlay: true,
  title: null,
  width: 500,
};

const calcWidth = (width) => {
  if (typeof width === 'string') return width;
  if (typeof width === 'number') return `${width}px`;
  return 'auto';
};

export const Container = styled.div`
  position: fixed;
  width: ${p => calcWidth(p.width)};
  left: calc(50% - (${p => calcWidth(p.width)} / 2));
  top: 200px;
  min-height: 100px;
  max-height: 300px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1010;
  background-color: #FFF;
  border-radius: 20px;
  padding: 24px;
`;

Container.defaultProps = {
  width: 500,
};

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  height: auto;
  width: auto;
  padding: 0;
  border: 0;
  background: 0;
  cursor: pointer;
  &:focus, &:active {
    outline: 0;
  }
`;

const Title = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  border-bottom: 1px solid #EFEFEF;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

export default Modal;
