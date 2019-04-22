import { memo } from 'react';
import PropTypes from 'prop-types';
import getIn from 'lodash/get';

function TableCell(props) {
  const { col, row } = props;
  if (!col.key) {
    throw new Error('col requires a key');
  }
  if (col.render) {
    if (typeof col.render === 'function') {
      return col.render(row, col.transform);
    }
    throw new Error('render is defined but not a function');
  }
  if (typeof col.transform === 'function') {
    return col.transform(getIn(row, col.key));
  }
  return getIn(row, col.key);
}

TableCell.propTypes = {
  col: PropTypes.shape({
    key: PropTypes.string,
  }),
  row: PropTypes.shape({}),
};

TableCell.defaultProps = {
  row: {},
  col: {},
};

export default memo(TableCell);
