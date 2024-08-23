import { sorting } from "./sorting";
import { pagingProcess } from "./paging";
import debugLog from "./debugLog";
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

  debugLog("executeClientSideLogic dearTableConfig", dearTableConfig);
  debugLog("executeClientSideLogic dearTableData", dearTableData);

  const searchedTableData = searching({ dearTableConfig, dearTableData });
  debugLog("executeClientSideLogic searchedTableData", searchedTableData);

  const filteredTableData = filtering({
    dearTableConfig,
    dearTableData: searchedTableData,
  });

  debugLog("executeClientSideLogic filteredTableData", filteredTableData);

  const sortedTableData = sorting({
    dearTableConfig,
    dearTableData: filteredTableData,
  });

  debugLog("executeClientSideLogic sortedTableData", sortedTableData);

  const pagingTableData = pagingProcess({
    dearTableConfig,
    dearTableData: sortedTableData,
  });

  debugLog("executeClientSideLogic pagingTableData", pagingTableData);

  setDearTableData({ ...pagingTableData, loading: false });
  statusRef.current = { ...statusRef.current, dataUpdated: false };
}

export { executeClientSideLogic };
