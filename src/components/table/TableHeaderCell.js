import React,{ useContext, useMemo } from "react";
import { UpArrow, DownArrow } from "../../assets/svg";
import debugLog from "../../utils/debugLog";
import activeArrow from "../../utils/activeArrow";
import dearContext from "../../utils/context";

function TableHeaderCell({ column }) {
  //
  debugLog("TableHeaderCell Run");
  const { dearTableConfig, setDearTableConfig } = useContext(dearContext);

  function handleSorting() {
    //
    const updatedColumn = { name: column.name, key: column.key };
    const currentOrder = dearTableConfig.order || [];

    if (currentOrder.length > 0 && currentOrder[0].key == column.key) {
      if (currentOrder[0].direction == "asc") {
        updatedColumn.direction = "desc";
      }
      if (currentOrder[0].direction == "desc") {
        updatedColumn.direction = undefined;
      }
    } else {
      updatedColumn.direction = "asc";
    }
    setDearTableConfig((pre) => {
      return {
        ...pre,
        order: updatedColumn.direction ? [updatedColumn] : [],
        start: 0,
      };
    });
  }

  const { upActive, downActive } = useMemo(
    () => activeArrow({ column, dearTableConfig }),
    [column, dearTableConfig]
  );

  return (
    <th
      className={column.orderable ? "sorting" : ""}
      onClick={column.orderable ? handleSorting : undefined}
    >
      <div className="dear-table-header-cell">
        <div>{column.name}</div>
        {column.orderable ? (
          <div className="dear-arrow-container">
            <UpArrow active={upActive} />
            <DownArrow active={downActive} />
          </div>
        ) : (
          ""
        )}
      </div>
    </th>
  );
}

export default TableHeaderCell;
