import { arrayOf, shape, object } from 'prop-types';

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
      <TableCell key={col.key} row={row} col={col} />
    );
  });
}

TableCells.propTypes = {
  cols: arrayOf(object),
  row: shape({}),
};

TableCells.defaultProps = {
  cols: [],
  row: {},
};

export default TableCells;
