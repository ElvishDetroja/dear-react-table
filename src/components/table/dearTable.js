import React, { useContext } from "react";
import debugLog from "../../utils/debugLog";
import TableBottom from "./TableBottom";
import TableTop from "./TableTop";
import TableMain from "./TableMain";
import dearContext from "../../utils/context";

function DearTable() {
  //
  debugLog("Table Run");
  const { dearTableLayout, dearTableStyle } = useContext(dearContext);

  return (
    <div
      className={`dear-table-parent-container ${
        dearTableStyle.darkTheme ? "dark-theme" : ""
      }`}
      style={dearTableStyle.feedStock}
    >
      <TableTop />
      <div
        className={`dear-table-wrapper 
          ${dearTableLayout.table.enableScrollX ? "scroll-x" : ""}
          ${dearTableLayout.table.enableScrollY ? "scroll-y" : ""}
          `}
      >
        <TableMain />
      </div>
      <TableBottom />
    </div>
  );
}

export default DearTable;
