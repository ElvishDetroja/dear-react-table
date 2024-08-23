import React, { useContext } from "react";
import Select from "./select";
import debugLog from "../../utils/debugLog";
import dearContext from "../../utils/context";

function Length() {
  //
  debugLog("Length Run");
  const { dearTableConfig, setDearTableConfig } = useContext(dearContext);

  function handleChange(length) {
    setDearTableConfig((pre) => {
      return { ...pre, length: Number(length) };
    });
  }

  return (
    <div className="dear-input-select-container">
      <Select dearTableConfig={dearTableConfig} handleChange={handleChange} />
      <span>entries per page</span>
    </div>
  );
}

export default Length;
