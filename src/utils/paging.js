function paging({ dearTableConfig, dearTableData }) {
  //
  let currentPage = dearTableConfig.start / dearTableConfig["length"] + 1;
  let totalPages = Math.ceil(
    dearTableData.filteredRecords / dearTableConfig["length"]
  );
  const paginationBox = 7;

  function generatePagingNumberArray(start, end) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  function generatePaginationArray() {
    //
    if (totalPages <= paginationBox) {
      return generatePagingNumberArray(1, totalPages);
    }

    const shouldShowLeftDots = currentPage >= paginationBox - 2;
    const shouldShowRightDots = currentPage <= totalPages - paginationBox + 3;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftRange = generatePagingNumberArray(1, paginationBox - 2);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightRange = generatePagingNumberArray(
        totalPages - paginationBox + 3,
        totalPages
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = generatePagingNumberArray(
        currentPage - (paginationBox - ((paginationBox + 1) / 2 + 2)),
        currentPage + (paginationBox - ((paginationBox + 1) / 2 + 2))
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }
  }

  const paginationArray = generatePaginationArray();

  return {
    currentPage,
    totalPages,
    paginationArray,
  };
}

function pagingProcess({ dearTableConfig, dearTableData }) {
  //
  const totalRecords = dearTableData.reservoir.length;

  const pagingTableData = dearTableData.forebay.slice(
    dearTableConfig.start,
    dearTableConfig.start + dearTableConfig["length"]
  );

  return { ...dearTableData, totalRecords, forebay: pagingTableData };
}

export { paging, pagingProcess };
