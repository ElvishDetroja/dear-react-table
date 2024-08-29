function informing({ dearTableConfig, dearTableData }) {
  //
  const limit = {
    start: dearTableConfig.start + 1,
    end: dearTableConfig.start + dearTableConfig["length"],
    totalRecords: dearTableData.totalRecords,
    filteredRecords: dearTableData.filteredRecords,
  };

  if (limit.start == 1) {
    limit.start = 0;
  }

  if (limit.end > limit.filteredRecords) {
    limit.end = limit.filteredRecords;
  }

  if (dearTableData.filteredRecords == dearTableData.totalRecords) {
    return `Displaying ${limit.start} to ${limit.end} out of ${limit.totalRecords} total entries`;
  }
  if (dearTableData.filteredRecords == 0) {
    return `Displaying ${limit.start} filtered entries (from ${limit.totalRecords} total entries)`;
  }
  if (dearTableData.filteredRecords < dearTableData.totalRecords) {
    return `Displaying ${limit.start} to ${limit.end} out of ${limit.filteredRecords} filtered entries (from ${limit.totalRecords} total entries)`;
  }
}

export { informing };
