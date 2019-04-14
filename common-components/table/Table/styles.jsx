import styled from 'styled-components';

export const Container = styled.div``;

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* border-spacing: initial; */
  /* border-color: transparent; */

  th {
    font-weight: 700;
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    text-align: left;
    border-bottom: 1px solid #ededed;
    background-color: transparent;
  }

  td {
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    text-align: left;
    /* border-bottom: 1px solid #ededed; */
    background-color: transparent;
    will-change: background-color, border-radius;
    transition: background-color 0.1s linear, border-radius 0.1s linear;
  }

  tbody tr {
    border-radius: 24px;
    will-change: box-shadow;
    /* box-sizing: border-box; */
    transition: box-shadow linear;

    &:hover{
      box-shadow: rgba(175, 175, 175, 0.5) 0px 2px 4px 0px;
    }

    &:hover td {
      background-color: #FFFFFF;
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

export const Col = styled(({ width, ...rest }) => <col {...rest} />)`
  width: ${p => (typeof p.width === 'number' ? `${p.width}px` : p.width)};
`;

Col.defaultProps = {
  width: 'initial',
};
