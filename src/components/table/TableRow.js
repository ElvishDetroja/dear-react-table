import React, { useContext } from "react";
import { dearContext } from "../../dearReactTable";
import debugLog from "../../utils/debugLog";
import { addClick } from "../../utils/rowClick";

function TableRow({ row, index }) {
  //
  debugLog("TableRow Run");
  const {
    dearTableConfig,
    dearTableData,
    setDearTableData,
    dearTableComponents,
    dearComponentsProps,
    dearTableLayout,
  } = useContext(dearContext);

  function handleClick() {
    addClick({
      index,
      dearTableData,
      setDearTableData,
      dearTableLayout,
    });
  }

  return (
    <tr className={row.click ? "clicked" : ""} onClick={handleClick}>
      {dearTableConfig.columns.map((col) => {
        const DearComponent = dearTableComponents[col.key];
        const isOrdered = dearTableConfig.order?.[0]?.key == col.key;

        return (
          <td key={col.key} className={isOrdered ? "order" : ""}>
            {!col.component && row[col.key]}
            {col.component && DearComponent && (
              <DearComponent
                row={row}
                dearComponentsProps={dearComponentsProps}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
}
export default TableRow;
