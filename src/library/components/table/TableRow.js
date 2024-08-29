import React, { useContext } from "react";
import debug from "../../utils/debug";
import { addClick } from "../../utils/rowClick";
import dearContext from "../../utils/context";

function TableRow({ row, index }) {
  //
  debug.info("TableRow Run");
  const {
    dearTableConfig,
    dearTableData,
    setDearTableData,
    dearTableLayout,
    dearTableComponents
  } = useContext(dearContext);

  function handleClick() {
    addClick({
      row,
      index,
      dearTableConfig,
      dearTableData,
      setDearTableData,
      dearTableLayout,
    });
  }

  return (
    <>
      {row.dearDelete ? (
        ""
      ) : (
        <tr className={row.click ? "clicked" : ""} onClick={handleClick}>
          {dearTableConfig.columns.map((col) => {
            const DearComponent = dearTableComponents.components[col.key];
            const isOrdered = dearTableConfig.order?.[0]?.key == col.key;

            return (
              <td key={col.key} className={isOrdered ? "order" : ""}>
                {!col.component && row[col.key]}
                {col.component && DearComponent && (
                  <DearComponent
                    dearRow={row}
                    dearComponentsProps={dearTableComponents.componentsProps}
                  />
                )}
              </td>
            );
          })}
        </tr>
      )}
    </>
  );
}

export default TableRow;
