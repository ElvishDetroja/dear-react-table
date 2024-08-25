import React, { useContext } from "react";
import debug from "../../utils/debug";
import { informing } from "../../utils/informing";
import dearContext from "../../utils/context";

function Info() {
  //
  debug.info("Info Run");
  const { dearTableConfig, dearTableData } = useContext(dearContext);
  const infoLine = informing({ dearTableConfig, dearTableData });
  return <>{infoLine}</>;
}

export default Info;
