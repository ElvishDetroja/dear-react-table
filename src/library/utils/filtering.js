function filtering({ dearTableConfig, dearTableData }) {
  //
  const filterableColumn = dearTableConfig.columns.filter(
    (col) => col.search?.value
  );

  if (filterableColumn.length == 0) return dearTableData;

  const filteredTableData = dearTableData.forebay.filter((dat) => {
    return filterableColumn.every((col) => {
      const cellValue = dat[col.key]?.toString().toLowerCase();
      const searchValue = col.search.value.toLowerCase();

      if (!cellValue) return false;

      if (col.filter.type == "text") {
        return cellValue.includes(searchValue);
      }

      if (col.filter.type == "select") {
        return cellValue == searchValue;
      }

      return true; // If there are other filter types, they pass by default
    });
  });

  return {
    ...dearTableData,
    filteredRecords: filteredTableData.length,
    forebay: filteredTableData,
  };
}

export { filtering };
