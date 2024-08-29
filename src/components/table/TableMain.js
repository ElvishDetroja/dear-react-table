import React, { useContext } from "react";
import TableCol from "./TableCol";
import TableHeaderCell from "./TableHeaderCell";
import Filter from "../filter/filter";
import TableRow from "./TableRow";
import Loading from "../loader/loader";
import ErrorMessage from "../error/ErrorMessage";
import dearContext from "../../utils/context";

function TableMain() {
  //
  const contextValue = useContext(dearContext);

  const { dearTableConfig, dearTableData, setDearTableData, dearTableLayout } =
    contextValue;


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
        className={`${dearTableLayout.thead.borderX ? "border-x" : ""} ${
          dearTableLayout.thead.borderY ? "border-y" : ""
        } ${
          dearTableLayout.thead.borderYForFilter ? "border-y-filter" : ""
        } jc-${dearTableLayout.thead.justifyContent}`}
      >
        <tr>
          {dearTableConfig.columns.map((column, colIndex) => (
            <TableHeaderCell key={colIndex} column={column} />
          ))}
        </tr>
        <Filter />
      </thead>
      <tbody
        className={`${dearTableLayout.tbody.enableRowHover ? "hover" : ""} ${
          dearTableLayout.tbody.borderX ? "border-x" : ""
        } ${dearTableLayout.tbody.borderY ? "border-y" : ""} ta-${
          dearTableLayout.tbody.textAlign
        }`.trim()}
      >
        {dearTableData.forebay?.length > 0 &&
          dearTableData.forebay.map((row, rowIndex) => (
            <TableRow key={row.dearId ?? rowIndex} row={row} index={rowIndex} />
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
