import React, { memo, useContext, useEffect } from "react";
import dearContext from "../../utils/context";
import { request } from "../../utils/request";
import eventEmitter from "../../hooks/eventEmitter";
import debug from "../../utils/debug";
import { updateDataInDearTableData } from "../../configure/dataOperation";

function EventOrganizer() {
  const contextValue = useContext(dearContext);

  useEffect(() => {
    const handleReload = (data) => {
      debug.info("event reload: observe detect");
      request(contextValue);
    };

    const handleUpdate = (data) => {
      debug.info("event updateTableData: observe detect", data);
      updateDataInDearTableData({ modifiableData: data, contextValue });
    };

    eventEmitter.observe("reload", handleReload);
    eventEmitter.observe("updateTableData", handleUpdate);

    return () => {
      eventEmitter.unobserve("reload", handleReload);
      eventEmitter.unobserve("updateTableData", handleUpdate);
    };
  }, [contextValue]);

  return;
}

function reload(data) {
  eventEmitter.emit("reload", data);
}

function updateDearTableData(data) {
  eventEmitter.emit("updateTableData", data);
}

export default memo(EventOrganizer);

export { reload, updateDearTableData };
