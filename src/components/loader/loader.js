import React, { useContext } from "react";
import { dearContext } from "../../dearReactTable";

function Loading() {
  //
  const { dearTableData } = useContext(dearContext);
  return (
    <>
      {dearTableData.loading ? (
        <div
          className={`dear-loader-container ${
            dearTableData.forebay?.length > 0 ? "full-display" : ""
          }`}
        >
          <div className="dear-loader"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Loading;
