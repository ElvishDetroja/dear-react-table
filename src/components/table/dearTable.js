import React, { useContext } from "react";
import debug from "../../utils/debug";
import TableBottom from "./TableBottom";
import TableTop from "./TableTop";
import TableMain from "./TableMain";
import dearContext from "../../utils/context";
import EventOrganizer from "../event/EventOrganizer";
import useClickOutside from "../../hooks/useClickOutside";
import { removeClick } from "../../utils/rowClick";

function DearTable() {
  //
  debug.log("Table Run");
  const contextValue = useContext(dearContext);

  const { dearTableLayout, dearTableStyle } = contextValue;

  const tbodyBlock = useClickOutside(() => removeClick(contextValue));

  return (
    <>
      <div
        className={`dear-table-parent-container ${
          dearTableStyle.darkTheme ? "dark-theme" : ""
        }`}
        style={dearTableStyle.feedStock}
        ref={tbodyBlock}
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
