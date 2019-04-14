import React from 'react';
import PropTypes from 'prop-types';
import { Col } from '../styles';

function TableCols(props) {
  const { cols } = props;
  return cols.map((col) => {
    if (col.children) {
      return <TableCols key={col.key} cols={col.children} />;
    }
    return <Col key={col.key} width={col.width} />;
  });
}

TableCols.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.object),
};

export default TableCols;
