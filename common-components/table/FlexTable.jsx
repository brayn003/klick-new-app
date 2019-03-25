import styled from 'styled-components';

export const FlexRow = styled.div`
display: flex;
margin-bottom: 8px;
`;

export const FlexCol = styled.div`
  font-weight: ${p => (p.bold ? '700' : 'inherit')};
  flex: ${p => p.flex};
  height: 40px;
  line-height: 40px;
  text-align: ${p => p.align};
  box-sizing: border-box;
  padding: 0 8px;

  white-space: nowrap; 
  /* overflow-x: hidden; */
  text-overflow: ellipsis;
`;

FlexCol.defaultProps = {
  flex: '1',
  bold: false,
  align: 'initial',
};
