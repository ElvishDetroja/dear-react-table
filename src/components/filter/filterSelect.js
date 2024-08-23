import React from "react";

function FilterSelect({ column, handleChange }) {
  return (
    <>
      <select
        name={`filter_${column.key}`}
        id={`filter_${column.key}`}
        onChange={(e) => {
          handleChange({ column, value: e.target.value });
        }}
      >
        <option value=""></option>
        {column.filter.options.map((fil) => {
          return (
            <option key={fil.value} value={fil.value}>
              {fil.label}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default FilterSelect;
