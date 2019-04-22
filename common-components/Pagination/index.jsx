import React from 'react';
import { number, func } from 'prop-types';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

import { Container, PageButton } from './styles';

const Pagination = ({
  active,
  total, onChange,
  endBuffer,
  surroundBuffer,
}) => {
  const getPageNumbers = (startIndex, endIndex) => {
    const length = endIndex - startIndex + 1;
    if (length > 0) {
      return Array(length)
        .fill({
          type: 'pageNumber',
          value: undefined,
        })
        .map((e, index) => ({
          ...e,
          value: startIndex + index,
        }));
    }
    return [];
  };

  const getActiveElementChunk = () => {
    const activeChunkStart = active - surroundBuffer;
    const activeChunkEnd = active + surroundBuffer;
    if (active <= endBuffer) {
      return getPageNumbers(endBuffer + 1, activeChunkEnd);
    }
    if (active > endBuffer && active <= (endBuffer + surroundBuffer)) {
      return getPageNumbers(endBuffer + 1, activeChunkEnd);
    }
    if (active >= ((total + 1) - endBuffer)) {
      return getPageNumbers(activeChunkStart, total - endBuffer);
    }
    if (
      active < ((total + 1) - endBuffer)
      && active >= ((total + 1) - (endBuffer + surroundBuffer))
    ) {
      return getPageNumbers(activeChunkStart, total - endBuffer);
    }
    return getPageNumbers(active - surroundBuffer, active + surroundBuffer);
  };

  const getJump = (type = 'left') => {
    if (type === 'left' && active > (endBuffer + surroundBuffer + 1)) {
      return [{ type: 'jumpLeft', value: <MdChevronLeft style={{ marginTop: 4, fontSize: '1.2em' }} /> }];
    }
    if (type === 'right' && active < (total - endBuffer - surroundBuffer)) {
      return [{ type: 'jumpRight', value: <MdChevronRight style={{ marginTop: 4, fontSize: '1.2em' }} /> }];
    }
    return [];
  };

  const getRenderArray = () => [
    ...getPageNumbers(1, endBuffer),
    ...getJump('left'),
    ...getActiveElementChunk(),
    ...getJump('right'),
    ...getPageNumbers((total + 1) - endBuffer, total),
  ];

  const onClickPagination = (el) => {
    if (el.type === 'pageNumber') {
      onChange(el.value);
    }
    if (el.type === 'jumpLeft') {
      const newactive = active - 5;
      onChange(newactive >= 1 ? newactive : 1);
    }
    if (el.type === 'jumpRight') {
      const newactive = active + 5;
      onChange(newactive <= total ? newactive : total);
    }
  };

  return (
    <Container>
      {getRenderArray().map(el => (
        <PageButton
          active={active === el.value}
          key={el.type + el.value}
          onClick={() => { onClickPagination(el); }}
        >
          {el.value}
        </PageButton>
      ))}
    </Container>
  );
};

Pagination.propTypes = {
  active: number,
  total: number,
  onChange: func,
  endBuffer: number,
  surroundBuffer: number,
};

Pagination.defaultProps = {
  active: 1,
  total: 0,
  onChange: () => {},
  endBuffer: 1,
  surroundBuffer: 1,
};

export default Pagination;
