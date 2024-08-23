import React, { useContext } from "react";
import debugLog from "../../utils/debugLog";
import { informing } from "../../utils/informing";
import dearContext from "../../utils/context";

function Info() {
  //
  debugLog("Info Run");
  const { dearTableConfig, dearTableData } = useContext(dearContext);
  const infoLine = informing({ dearTableConfig, dearTableData });
  return <>{infoLine}</>;
}

export default Info;
