import styled from 'styled-components';

import { StyledButton } from 'common-components/button/Button';
import { StyledButtonLink } from 'common-components/button/ButtonLink';
import { StyledIconButton } from 'common-components/button/IconButton';

export const Container = styled.div``;

const calcFlexWidth = (width) => {
  if (typeof width === 'undefined') {
    return 'flex: 1 1 100%;';
  }
  if (typeof width === 'number') {
    return `flex: 0 0 ${width}px`;
  }
  if (typeof width === 'string') {
    return `flex: 0 0 ${width}`;
  }
  return '';
};

export const Tr = styled.tr`
  display: flex;
  flex-basis: 100%;
`;

export const Td = styled.td`
  ${p => calcFlexWidth(p.width)};
  text-align: ${p => p.align};
  
  display: block;
  height: 48px;
  padding: 12px;
  box-sizing: border-box;
  line-height: 24px;
  background-color: transparent;
  will-change: background-color, border-radius;
  transition: background-color 0.3s linear, border-radius 0.1s linear;

  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ${StyledButton}, ${StyledButtonLink}, ${StyledIconButton} {
    margin-top: -8px;
    /* margin-right: 8px;

    &:last-child {
      margin-right: 0;
    } */
  }

`;

Td.defaultProps = {
  width: undefined,
  align: 'left',
};

export const Th = styled.th`
  ${p => calcFlexWidth(p.width)};
  text-align: ${p => p.align};

  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;

  display: block;
  font-weight: 700;
  height: 48px;
  padding: 12px;
  box-sizing: border-box;
  line-height: 24px;
  border-bottom: 1px solid #ededed;
  background-color: transparent;
`;

Th.defaultProps = {
  align: 'left',
};

export const TBody = styled.tbody`
  display: table;
  width: 100%;

  ${Tr} {
    &:hover ${Td} {
      background-color: rgba(71, 152, 219, 0.2);
      border-color: transparent;

      &:first-child {
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
      }

      &:last-child {
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
      }
    }
  }
`;

export const THead = styled.thead`
  display: table;
  width: 100%;
`;

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* border-spacing: initial; */
  /* border-color: transparent; */
  display: block;
`;

export const Col = styled(({ width, ...rest }) => <col {...rest} />)`
  width: ${p => (typeof p.width === 'number' ? `${p.width}px` : p.width)};
`;

Col.defaultProps = {
  width: 'initial',
};

export const TLoading = styled.tbody`
  height: ${p => p.rows * 48}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

TLoading.defaultProps = {
  rows: 3,
};
