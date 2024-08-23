import Info from "../components/info/info";
import Pagination from "../components/pagination/Pagination";
import Length from "../components/length/length";
import Search from "../components/search/search";
import { useContext } from "react";
import { dearContext } from "../dearReactTable";
import debugLog from "./debugLog";

function componentRegistery({ dearTableLayout }) {
  //
  debugLog("componentRegistery run");

  const registery = {
    Search,
    Pagination,
    Info,
    Length,
  };

  const componentRegistery = {
    tl: registery[dearTableLayout.location.topLeft.segment],
    tr: registery[dearTableLayout.location.topRight.segment],
    bl: registery[dearTableLayout.location.bottomLeft.segment],
    br: registery[dearTableLayout.location.bottomRight.segment],
  };

  return componentRegistery;
}

export default componentRegistery;
