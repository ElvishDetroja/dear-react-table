import { newDataInDearTableData } from "../configure/dataOperation";
import debug from "./debug";

async function request(contextValue) {
  //
  debug.log("request sent");

  const { dearTableConfig, setDearTableData, dearTableCallback, statusRef } =
    contextValue;

  setDearTableData((prev) => ({
    ...prev,
    loading: true,
    error: false,
  }));

  statusRef.current = { ...statusRef.current, firstRender: false };
  const resData = await dearTableCallback(dearTableConfig);

  if (resData) {
    newDataInDearTableData({ newData: resData, contextValue });
  }
}

export { request };
