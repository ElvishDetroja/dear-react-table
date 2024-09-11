function deleting({ dearTableData }) {
  const newReservoir = dearTableData.reservoir.filter((dat) => !dat.dearDelete);

  return {
    ...dearTableData,
    forebay: newReservoir,
    filteredRecords: newReservoir.length,
  };
}

export { deleting };
