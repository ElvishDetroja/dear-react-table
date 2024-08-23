import { ensureCombine } from "../configure/ensureDefaultValues";
import debugLog from "./debugLog";

async function request(contextValue) {
  //
  debugLog("request sent");

  const { dearTableConfig, setDearTableData, dearTableCallback, statusRef } =
    contextValue;

  setDearTableData((prev) => ({
    ...prev,
    loading: true,
    error: false,
  }));

  statusRef.current = { ...statusRef.current, firstRender: false };
  const resData = await dearTableCallback(dearTableConfig);

  if (resData) {
    newDataInDearTableData({ newData: resData, contextValue });
  }
}

function newDataInDearTableData({ newData, contextValue }) {
  //
  debugLog("newDataInDearTableData run", newData);

  const { dearTableData, setDearTableData, statusRef, dearTableConfig } =
    contextValue;

  const { frameworkTableData } = ensureCombine({
    tableConfig: dearTableConfig,
    tableData: newData,
    dearTableData: dearTableData,
  });

  debugLog("request: set frameworkTableData", frameworkTableData);

  setDearTableData({ ...frameworkTableData, loading: false });

  statusRef.current = { ...statusRef.current, dataUpdated: true };
}

export { request, newDataInDearTableData };
