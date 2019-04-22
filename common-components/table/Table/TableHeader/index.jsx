import React from 'react';
import PropTypes from 'prop-types';

import { Th, Tr } from '../styles';

const getCombinedChildren = cols => cols.reduce(
  (acc, col) => (col.children ? acc.concat(col.children) : acc),
  [],
);

const calculateDepth = (cols) => {
  const combinedChildren = getCombinedChildren(cols);
  if (!combinedChildren.length) {
    return 1;
  }
  return 1 + calculateDepth(combinedChildren);
};

function TableHeader(props) {
  const { cols } = props;
  const combinedChildren = getCombinedChildren(cols);
  const depth = calculateDepth(cols);
  return (
    <>
      <Tr>
        {cols.map(col => (
          <Th
            rowSpan={col.children ? undefined : depth}
            colSpan={col.children ? col.children.length : undefined}
            key={col.key}
            width={col.width}
            align={col.align}
          >
            {col.title}
          </Th>
        ))}
      </Tr>
      {combinedChildren.length ? (
        <TableHeader cols={combinedChildren} />
      ) : null}
    </>
  );
}

TableHeader.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.object),
};

TableHeader.defaultProps = {
  cols: [],
};

export default TableHeader;
