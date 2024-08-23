import React, { useEffect, useMemo, useRef } from "react";
import DearTable from "./components/table/dearTable";
import { useState, createContext } from "react";
import { executeClientSideLogic } from "./utils/executeClientSideLogic";
import debugLog from "./utils/debugLog";
import useEffectAfterMount from "./hooks/useEffectAfterMount";
import { ensureCombine } from "./configure/ensureDefaultValues";
import { request, newDataInDearTableData } from "./utils/request";

const dearContext = createContext();

function DearReactTable({
  dearTableConfig: tableConfig = {},
  dearTableData: tableData = {},
  dearTableLayout: tableLayout = {},
  dearTableStyle: tableStyle = {},
  dearTableCallback,
  dearTableComponents,
  dearComponentsProps,
}) {
  //
  const {
    defaultTableConfig,
    frameworkTableData,
    defaultTableLayout,
    defaultTableStyle,
  } = useMemo(
    () =>
      ensureCombine({
        tableConfig,
        tableData,
        tableLayout,
        tableStyle,
      }),
    [tableConfig, tableData, tableLayout, tableStyle]
  );

  const [dearTableConfig, setDearTableConfig] = useState(defaultTableConfig);
  const [dearTableData, setDearTableData] = useState(frameworkTableData);
  const [dearTableLayout, setDearTableLayout] = useState(defaultTableLayout);
  const [dearTableStyle, setDearTableStyle] = useState(defaultTableStyle);

  const statusRef = useRef({ firstRender: true, dataUpdated: false });

  debugLog("dearReactTable: dearTableConfig", dearTableConfig);
  debugLog("dearReactTable: dearTableData", dearTableData);
  debugLog("dearReactTable: dearTableLayout", dearTableLayout);
  debugLog("dearReactTable: statusRef", statusRef);
  debugLog("dearReactTable: dearTableStyle", dearTableStyle);

  const contextValue = {
    dearTableConfig,
    dearTableData,
    setDearTableConfig,
    setDearTableData,
    dearTableCallback,
    dearTableLayout,
    dearTableStyle,
    dearTableComponents,
    dearComponentsProps,
    statusRef,
  };

  useEffectAfterMount(() => {
    debugLog("dearReactTable: tableData useEffect", tableData);
    newDataInDearTableData({ newData: tableData, contextValue });
  }, [tableData]);

  useEffect(() => {
    debugLog("dearReactTable: dearTableData useEffect outside", dearTableData);

    if (!dearTableConfig.serverSide && statusRef.current.dataUpdated) {
      debugLog("dearReactTable: dearTableData useEffect inside");
      executeClientSideLogic(contextValue);
    }
  }, [dearTableData]);

  useEffect(() => {
    debugLog("dearReactTable: dearTableConfig useEffect", dearTableConfig);

    if (statusRef.current.firstRender || dearTableConfig.serverSide) {
      request(contextValue);
    } else {
      executeClientSideLogic(contextValue);
    }
  }, [dearTableConfig]);

  return (
    <dearContext.Provider value={contextValue}>
      <DearTable />
    </dearContext.Provider>
  );
}

export default DearReactTable;
export { dearContext };
