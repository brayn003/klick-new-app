import { memo } from 'react';
import {
  arrayOf, string, object, bool,
} from 'prop-types';

import Animate from 'common-components/animate/Animate';

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
      ? <TLoading rows={data.length || 3}>Loading ...</TLoading>
      : (
        <TBody>
          <Animate delay={(e, i) => i * 100} opacity={[0, 1]} translateY={[4, 0]}>
            {data.map(row => (
              <Tr key={row[rowKey]}>
                <TableCells cols={cols} row={row} />
              </Tr>
            ))}
          </Animate>
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

export default memo(Table);
