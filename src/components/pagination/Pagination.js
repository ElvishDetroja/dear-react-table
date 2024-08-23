import React, { useContext } from "react";
import { paging } from "../../utils/paging";
import debugLog from "../../utils/debugLog";
import dearContext from "../../utils/context";

function Pagination() {
  //
  debugLog("Pagination Run");

  const { dearTableConfig, dearTableData, setDearTableConfig } =
    useContext(dearContext);

  const pages = paging({ dearTableConfig, dearTableData });

  debugLog("Pagination: pages", pages);

  function handlePaging(page) {
    setDearTableConfig((pre) => {
      return { ...pre, start: (page - 1) * dearTableConfig["length"] };
    });
  }

  return (
    <>
      <div className="dear-pagination-container">
        {pages.paginationArray.map((page, index) => {
          return (
            <div
              className={`dear-page-box 
                ${pages.currentPage == page ? "active" : ""}
                ${typeof page == "number" ? "number" : ""}`.trim()}
              key={index}
              onClick={() => {
                if (page !== "...") {
                  handlePaging(page);
                }
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Pagination;
