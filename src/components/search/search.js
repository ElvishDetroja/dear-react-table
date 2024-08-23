import dearContext from "../../utils/context";
import debugLog from "../../utils/debugLog";
import React, { useContext, useEffect, useRef } from "react";

function Search() {
  //
  debugLog("Search Run");
  const { dearTableConfig, setDearTableConfig } = useContext(dearContext);

  const debounceRef = useRef(null);
  const debounceTime = dearTableConfig.searchDebounceDelay;

  function handleChange(e) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDearTableConfig((pre) => {
        return {
          ...pre,
          search: { ...pre.search, value: e.target.value },
          start: 0,
        };
      });
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
      <div className="dear-input-search-container">
        <span>Search:</span>
        <input
          type="text"
          name="search"
          id=""
          placeholder="Search here.."
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyUp={(e) => {
            handleUp(e);
          }}
        />
      </div>
    </>
  );
}

export default Search;
