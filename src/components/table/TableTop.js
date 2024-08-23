import React, { useContext, useMemo } from "react";
import { dearContext } from "../../dearReactTable";
import componentRegistery from "../../utils/componentRegistery";

function TableTop() {
  const { dearTableLayout } = useContext(dearContext);

  const componentDirectory = useMemo(
    () => componentRegistery({ dearTableLayout }),
    [dearTableLayout]
  );

  return (
    <div className="dear-table-top-container">
      <div className="dear-table-top-left-container">
        {dearTableLayout.location.bottomLeft.display && (
          <componentDirectory.tl />
        )}
      </div>
      <div className="dear-table-top-right-container">
        {dearTableLayout.location.topRight.display && <componentDirectory.tr />}
      </div>
    </div>
  );
}

export default TableTop;
