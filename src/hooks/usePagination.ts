import { useState, useMemo } from 'react';

export default function usePagination(size: number, limit: number, total: number) {
  const [section, setSection] = useState(1);
  const [page, setPage] = useState(1);

  const items = useMemo(() => {
    return [...new Array(size)].map((v, i) => i + 1 + size * (section - 1));
  }, [size, section]);

  const onChangePageHandler = (newPage) => {
    if (newPage === 1) {
      setPage(1);
      setSection(1);
      return;
    }

    if (newPage === Math.ceil(total / limit)) {
      setPage(newPage);
      setSection(Math.ceil(newPage / size));
      return;
    }

    if (newPage > size * section) {
      setSection(section + 1);
    } else if (newPage < size * section - (size - 1)) {
      setSection(section - 1);
    }
    setPage(newPage);
  };

  const offset = limit * (page - 1);

  const to = limit + offset;

  const paginationInfo = {
    from: offset + 1,
    to: to > total ? to - (to - total) : to,
    total,
  };

  return {
    page,
    items,
    offset,
    paginationInfo,
    onChangePageHandler,
  };
}
