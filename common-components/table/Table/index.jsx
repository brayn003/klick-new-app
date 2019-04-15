import { arrayOf, string, object } from 'prop-types';

import {
  TableWrapper,
  THead,
  TBody,
  Tr,
} from './styles';
import TableCells from './TableCells';
import TableCols from './TableCols';
import TableHeader from './TableHeader';

const Table = ({ cols, data, rowKey }) => (
  <TableWrapper>
    <colgroup>
      <TableCols cols={cols} />
    </colgroup>
    <THead>
      <TableHeader cols={cols} />
    </THead>
    <TBody>
      {data.map(row => (
        <Tr key={row[rowKey]}>
          <TableCells cols={cols} row={row} />
        </Tr>
      ))}
    </TBody>
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
