function searching({ dearTableConfig, dearTableData }) {
  //
  if (!dearTableConfig.search?.value)
    return {
      ...dearTableData,
      forebay: [...dearTableData.reservoir],
      filteredRecords: dearTableData.reservoir.length,
    };

  const searchableColumn = dearTableConfig.columns.filter(
    (col) => col.searchable == true
  );

  const searchedTableData = dearTableData.reservoir.filter((dat) => {
    return searchableColumn.some((col) => {
      return (
        dat[col.key] &&
        dat[col.key]
          .toString()
          .toLowerCase()
          .includes(dearTableConfig.search.value.toLowerCase())
      );
    });
  });

  return {
    ...dearTableData,
    filteredRecords: searchedTableData.length,
    forebay: searchedTableData,
  };
}

export { searching };
