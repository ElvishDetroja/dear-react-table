import React, { useContext } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { removeClick } from "../../utils/rowClick";
import TableCol from "./TableCol";
import TableHeaderCell from "./TableHeaderCell";
import Filter from "../filter/filter";
import TableRow from "./TableRow";
import Loading from "../loader/loader";
import ErrorMessage from "../error/ErrorMessage";
import dearContext from "../../utils/context";

function TableMain() {
  //
  const { dearTableConfig, dearTableData, setDearTableData, dearTableLayout } =
    useContext(dearContext);

  const primaryKey = dearTableConfig.columns.find(
    (column) => column.primaryKey
  )?.key;

  const tbodyBlock = useClickOutside(() =>
    removeClick({ setDearTableData, dearTableLayout })
  );

  return (
    <table
      className={`dear-table ${dearTableLayout.table.border ? "border" : ""}`}
    >
      <colgroup>
        {dearTableConfig.columns.map((column, colIndex) => (
          <TableCol key={colIndex} column={column} />
        ))}
      </colgroup>
      <thead
        className={`${
          dearTableLayout.thead.borderX ? "border-x" : ""
        } ${dearTableLayout.thead.borderY ? "border-y" : ""}`}
      >
        <tr>
          {dearTableConfig.columns.map((column, colIndex) => (
            <TableHeaderCell key={colIndex} column={column} />
          ))}
        </tr>
        <Filter />
      </thead>
      <tbody
        ref={tbodyBlock}
        className={`
          ${dearTableLayout.tbody.enableRowHover ? "hover" : ""}
          ${dearTableLayout.tbody.borderX ? "border-x" : ""}
          ${dearTableLayout.tbody.borderY ? "border-y" : ""}
        `.trim()}
      >
        {dearTableData.forebay?.length > 0 &&
          dearTableData.forebay.map((row, rowIndex) => (
            <TableRow
              key={row[primaryKey] ?? rowIndex}
              row={row}
              index={rowIndex}
            />
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={dearTableConfig.columns.length}>
            <Loading />
            <ErrorMessage />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default TableMain;
