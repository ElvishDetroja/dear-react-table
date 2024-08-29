import React, { useEffect, useMemo, useRef } from "react";
import DearTable from "../components/table/dearTable";
import { useState } from "react";
import { executeClientSideLogic } from "../utils/executeClientSideLogic";
import debug from "../utils/debug";
import useEffectAfterMount from "../hooks/useEffectAfterMount";
import { formattingCombine } from "../configure/dataFormatting";
import { newDataInDearTableData } from "../configure/dataOperation";
import { request } from "../utils/request";
import dearContext from "../utils/context";

function DearReactTable({
  dearTableConfig: tableConfig,
  dearTableData: tableData,
  dearTableLayout: tableLayout,
  dearTableStyle: tableStyle,
  dearTableCallback,
  dearTableCustomComponents,
}) {
  //
  debug.log("@@@@@@@@@@@@@@@@@");

  const { processedConfig, frameworkData, processedLayout, processedStyle } =
    useMemo(() => {
      debug.log("dearReactTable: useMemo run");
      return formattingCombine({
        unprocessedConfig: tableConfig,
        unprocessedData: tableData,
        unprocessedLayout: tableLayout,
        unprocessedStyle: tableStyle,
      });
    }, []);

  const [dearTableConfig, setDearTableConfig] = useState(processedConfig);
  const [dearTableData, setDearTableData] = useState(frameworkData);
  const [dearTableLayout, setDearTableLayout] = useState(processedLayout);
  const [dearTableStyle, setDearTableStyle] = useState(processedStyle);

  const statusRef = useRef({ firstRender: true, dataUpdated: false });

  debug.log("dearReactTable: dearTableConfig", dearTableConfig);
  debug.log("dearReactTable: dearTableData", dearTableData);
  debug.log("dearReactTable: statusRef", statusRef);
  debug.info("dearReactTable: dearTableLayout", dearTableLayout);
  debug.info("dearReactTable: dearTableStyle", dearTableStyle);

  const contextValue = {
    dearTableConfig,
    setDearTableConfig,
    dearTableData,
    setDearTableData,
    dearTableCallback,
    dearTableLayout,
    dearTableStyle,
    statusRef,
    dearTableCustomComponents,
  };

  useEffectAfterMount(() => {
    debug.log("dearReactTable: tableData useEffect", tableData);
    newDataInDearTableData({ newData: tableData, contextValue });
  }, [tableData]);

  useEffect(() => {
    debug.log("dearReactTable: dearTableData useEffect outside", dearTableData);

    if (!dearTableConfig.serverSide && statusRef.current.dataUpdated) {
      debug.log("dearReactTable: dearTableData useEffect inside");
      executeClientSideLogic(contextValue);
    }
  }, [dearTableData]);

  useEffect(() => {
    debug.log("dearReactTable: dearTableConfig useEffect", dearTableConfig);

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
