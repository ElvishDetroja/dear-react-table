import React, { useContext, useMemo } from "react";
import componentRegistery from "../../utils/componentRegistery";
import dearContext from "../../utils/context";

function TableBottom() {
  //
  const { dearTableLayout } = useContext(dearContext);

  const componentDirectory = useMemo(
    () => componentRegistery({ dearTableLayout }),
    [dearTableLayout]
  );

  return (
    <div className="dear-table-bottom-container">
      <div className="dear-table-bottom-left-container">
        {dearTableLayout.location.bottomLeft.display && (
          <componentDirectory.bl />
        )}
      </div>
      <div className="dear-table-bottom-right-container">
        {dearTableLayout.location.bottomRight.display && (
          <componentDirectory.br />
        )}
      </div>
    </div>
  );
}

export default TableBottom;
