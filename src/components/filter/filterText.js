import React, { useContext, useEffect, useRef } from "react";
import dearContext from "../../utils/context";

function FilterText({ column, handleChange }) {
  //

  const { dearTableConfig } = useContext(dearContext);

  const debounceRef = useRef(null);
  const debounceTime = dearTableConfig.searchDebounceDelay;

  function handleLocalChange(e) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleChange({ column, value: e.target.value });
    }, debounceTime);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  function handleUp(e) {
    if (e.keyCode == 13) {
      e.target.blur();
    }
  }

  return (
    <>
      <input
        type="text"
        name={`filter_${column.key}`}
        id={`filter_${column.key}`}
        placeholder={column.name}
        onChange={(e) => {
          handleLocalChange(e);
        }}
        onKeyUp={(e) => {
          handleUp(e);
        }}
      />
    </>
  );
}

export default FilterText;
