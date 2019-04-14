import { arrayOf, string, object } from 'prop-types';

import { TableWrapper } from './styles';
import TableCells from './TableCells';
import TableCols from './TableCols';
import TableHeader from './TableHeader';

const Table = ({ cols, data, rowKey }) => (
  <TableWrapper>
    <colgroup>
      <TableCols cols={cols} />
    </colgroup>
    <thead>
      <TableHeader cols={cols} />
    </thead>
    <tbody>
      {data.map(row => (
        <tr key={row[rowKey]}>
          <TableCells cols={cols} row={row} />
        </tr>
      ))}
    </tbody>
  </TableWrapper>
);

Table.propTypes = {
  cols: arrayOf(object),
  data: arrayOf(object),
  rowKey: string,
};

Table.defaultProps = {
  cols: [],
  data: [],
  rowKey: 'key',
};

export default Table;
