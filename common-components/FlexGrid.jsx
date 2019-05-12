import styled from 'styled-components';

export const Col = styled.div`
  flex: 1 1 ${p => p.width};
`;

Col.defaultProps = {
  width: '100%',
};

export const Row = styled.div`
  display: flex;
  margin-left: -${p => p.gutter / 2}px;
  margin-right: -${p => p.gutter / 2}px;
  overflow: ${p => (p.gutter ? 'hidden' : 'visible')};

  ${Col} {
    margin-left: ${p => p.gutter / 2}px;
    margin-right: ${p => p.gutter / 2}px;
  }
`;

Row.defaultProps = {
  gutter: 0,
};
