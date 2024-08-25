import React, { useContext } from "react";
import FilterSelect from "./filterSelect";
import debug from "../../utils/debug";
import FilterText from "./filterText";
import dearContext from "../../utils/context";

function Filter() {
  //
  debug.info("Filter Run");

  const { dearTableConfig, setDearTableConfig } = useContext(dearContext);

  function handleChange({ column, value }) {
    setDearTableConfig((pre) => {
      const updatedColumns = pre.columns.map((col) => {
        if (col.key == column.key) {
          return { ...col, search: { value } };
        } else {
          return col;
        }
      });
      return {
        ...pre,
        columns: updatedColumns,
        start: 0,
      };
    });
  }

  return (
    <>
      <tr className="dear-table-filter">
        {dearTableConfig.columns.map((column) => (
          <th key={column.key}>
            {column.filter && (
              <div className="dear-table-header-filter">
                {column.filter.type == "select" && (
                  <FilterSelect column={column} handleChange={handleChange} />
                )}
                {column.filter.type == "text" && (
                  <FilterText column={column} handleChange={handleChange} />
                )}
              </div>
            )}
          </th>
        ))}
      </tr>
    </>
  );
}

export default Filter;
