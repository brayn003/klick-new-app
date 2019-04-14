import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../TableCell';

function TableCells(props) {
  const { cols, row } = props;
  return cols.map((col) => {
    if (!col.key) {
      throw new Error('col requires a key');
    }
    if (col.children && col.children.length) {
      return <TableCells key={col.key} cols={col.children} row={row} />;
    }
    return (
      <td style={col.style} key={col.key}>
        <TableCell row={row} col={col} />
      </td>
    );
  });
}

TableCells.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.object),
  row: PropTypes.shape({}),
};

TableCells.defaultProps = {
  cols: [],
  row: {},
};

export default TableCells;
