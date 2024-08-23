import React, { useContext } from "react";
import { dearContext } from "../../dearReactTable";

function TableCol({ column }) {
  //
  const { dearTableConfig } = useContext(dearContext);

  return <col className=""></col>;
}

export default TableCol;
