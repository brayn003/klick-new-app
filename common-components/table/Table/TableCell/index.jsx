import { useState } from 'react';
import { shape } from 'prop-types';
import Tooltip from 'common-components/Tooltip';

import { Td } from '../styles';
import TableCellDetail from '../TableCellDetail';

const TableCell = ({
  row,
  col,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onRef = (r) => {
    if (r && (r.scrollWidth > r.offsetWidth)) {
      setShowTooltip(true);
    }
  };
  return (
    <Tooltip
      trigger={['hover']}
      placement="right"
      show={showTooltip}
      text={<TableCellDetail row={row} col={col} />}
      mouseEnterDelay={0.6}
    >
      <Td
        width={col.width}
        align={col.align}
        ref={onRef}
      >
        <TableCellDetail row={row} col={col} />
      </Td>
    </Tooltip>
  );
};

TableCell.propTypes = {
  col: shape({}),
  row: shape({}),
};

TableCell.defaultProps = {
  col: {},
  row: {},
};
export default TableCell;
