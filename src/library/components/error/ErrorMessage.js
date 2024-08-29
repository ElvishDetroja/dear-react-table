import React, { useContext } from "react";
import dearContext from "../../utils/context";

function ErrorMessage() {
  const { dearTableData } = useContext(dearContext);

  return (
    <>
      {dearTableData.error ? (
        <div className="dear-error-container">
          <div className="dear-error">{dearTableData.errorMessage}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default ErrorMessage;
