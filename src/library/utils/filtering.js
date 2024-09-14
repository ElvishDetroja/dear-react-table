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
        const condition = col.filter.condition ?? "equalTo";

        let compare;

        switch (condition) {
          case "greaterThan":
            compare = (cellValue, searchValue) => cellValue >= searchValue;
            break;
          case "lessThan":
            compare = (cellValue, searchValue) => cellValue <= searchValue;
            break;
          case "equalTo":
          default:
            compare = (cellValue, searchValue) => cellValue == searchValue;
            break;
        }

        return compare(cellValue, searchValue);
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
