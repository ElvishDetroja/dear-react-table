import debug from "../utils/debug";
import { request } from "../utils/request";
import { formattingCombine } from "./dataFormatting";

function newDataInDearTableData({ newData, contextValue }) {
  //
  debug.log("newDataInDearTableData run", newData);

  const { dearTableData, setDearTableData, statusRef, dearTableConfig } =
    contextValue;

  const { frameworkData } = formattingCombine({
    unprocessedConfig: dearTableConfig,
    unprocessedData: newData,
    existingData: dearTableData,
  });

  debug.info("frameworkData", frameworkData);

  setDearTableData({ ...frameworkData, loading: false });

  statusRef.current = { ...statusRef.current, dataUpdated: true };
}

//
//
//
//
//

function updateDataInDearTableData({ modifiableData, contextValue }) {
  //
  let formattedData, existingData;
  const { dearTableData, setDearTableData, dearTableConfig, statusRef } =
    contextValue;

  if (Object.prototype.toString.call(modifiableData) === "[object Object]") {
    formattedData = [{ ...modifiableData }];
  }
  if (Object.prototype.toString.call(modifiableData) === "[array Object]") {
    formattedData = [...modifiableData];
  }

  const dataSource = dearTableConfig.serverSide ? "forebay" : "reservoir";

  existingData = [...dearTableData[dataSource]];

  formattedData.forEach((dat) => {
    const idx = existingData.findIndex((da) => da.dearId == dat.dearId);

    if (idx == -1) return;

    existingData.splice(idx, 1, {
      ...existingData[idx],
      ...dat,
    });
  });

  debug.log("updateDataInDearTableData run", formattedData);
  debug.info("saving in dearTableData", existingData);

  setDearTableData((pre) => {
    return { ...pre, [dataSource]: existingData };
  });

  if (dearTableConfig.serverSide) {
    request(contextValue);
  } else {
    statusRef.current.dataUpdated = true;
  }
}

export { newDataInDearTableData, updateDataInDearTableData };
