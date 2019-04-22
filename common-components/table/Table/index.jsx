import {
  arrayOf, string, object, bool,
} from 'prop-types';

import {
  TableWrapper,
  THead,
  TBody,
  Tr,
  TLoading,
} from './styles';
import TableCells from './TableCells';
import TableCols from './TableCols';
import TableHeader from './TableHeader';

const Table = ({
  cols, data, rowKey, loading,
}) => (
  <TableWrapper>
    <colgroup>
      <TableCols cols={cols} />
    </colgroup>
    <THead>
      <TableHeader cols={cols} />
    </THead>
    {loading
      ? <TLoading>Loading ...</TLoading>
      : (
        <TBody>
          {data.map(row => (
            <Tr key={row[rowKey]}>
              <TableCells cols={cols} row={row} />
            </Tr>
          ))}
        </TBody>
      )}
  </TableWrapper>
);

Table.propTypes = {
  cols: arrayOf(object),
  data: arrayOf(object),
  rowKey: string,
  loading: bool,
};

Table.defaultProps = {
  cols: [],
  data: [],
  rowKey: 'key',
  loading: false,
};

export default Table;
