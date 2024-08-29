import React from "react";

function Select({ dearTableConfig, handleChange }) {
  return (
    <>
      <select
        name="lengthOption"
        id="lengthOption"
        value={dearTableConfig.defaultOption}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {dearTableConfig.lengthOption.map((dat) => {
          return <option key={dat} value={dat}>{dat}</option>;
        })}
      </select>
    </>
  );
}

export default Select;
