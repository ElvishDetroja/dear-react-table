import { sorting } from "./sorting";
import { pagingProcess } from "./paging";
import debug from "./debug";
import { searching } from "./searching";
import { filtering } from "./filtering";

function executeClientSideLogic(contextValue) {
  //
  let {
    dearTableConfig,
    dearTableData: tableData,
    setDearTableData,
    statusRef,
  } = contextValue;

  let dearTableData = { ...tableData };

  debug.log("executeClientSideLogic: dearTableConfig", dearTableConfig);
  debug.log("executeClientSideLogic: dearTableData", dearTableData);

  const searchedTableData = searching({ dearTableConfig, dearTableData });
  debug.info("executeClientSideLogic: searchedTableData", searchedTableData);

  const filteredTableData = filtering({
    dearTableConfig,
    dearTableData: searchedTableData,
  });

  debug.info("executeClientSideLogic: filteredTableData", filteredTableData);

  const sortedTableData = sorting({
    dearTableConfig,
    dearTableData: filteredTableData,
  });

  debug.info("executeClientSideLogic: sortedTableData", sortedTableData);

  const pagingTableData = pagingProcess({
    dearTableConfig,
    dearTableData: sortedTableData,
  });

  debug.info("executeClientSideLogic: pagingTableData", pagingTableData);

  setDearTableData({ ...pagingTableData, loading: false });
  statusRef.current = { ...statusRef.current, dataUpdated: false };
}

export { executeClientSideLogic };
