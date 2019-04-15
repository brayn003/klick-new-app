import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../TableCell';
import Popover from '../../../Popover';

import { Td } from '../styles';

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
      <Td
        style={col.style}
        width={col.width}
        key={col.key}
        onMouseEnter={(e) => {
          console.log(e.target.offsetWidth, e.target.scrollWidth);
        }}
      >
        <Popover
          trigger={['hover']}
          overlay="hello"
          placement="bottomLeft"
        >
          hello
          {/* <TableCell row={row} col={col} /> */}
        </Popover>
      </Td>
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
