import React, { useContext } from "react";
import debug from "../../utils/debug";
import TableBottom from "./TableBottom";
import TableTop from "./TableTop";
import TableMain from "./TableMain";
import dearContext from "../../utils/context";
import EventOrganizer from "../event/EventOrganizer";

function DearTable() {
  //
  debug.log("Table Run");
  const { dearTableLayout, dearTableStyle } = useContext(dearContext);

  return (
    <>
      <div
        className={`dear-table-parent-container ${
          dearTableStyle.darkTheme ? "dark-theme" : ""
        }`}
        style={dearTableStyle.feedStock}
      >
        <TableTop />
        <div
          className={`dear-table-wrapper ${
            dearTableLayout.table.enableScrollX ? "scroll-x" : ""
          } ${dearTableLayout.table.enableScrollY ? "scroll-y" : ""}
          `.trim()}
        >
          <TableMain />
        </div>
        <TableBottom />
        <EventOrganizer />
      </div>
    </>
  );
}

export default DearTable;
