import debugLog from "./debugLog";

function removeClick({ setDearTableData, dearTableLayout }) {
  //
  debugLog("removeClick run");
  if (dearTableLayout.tbody.allowRowSelection) {
    debugLog("removeClick truely run");
    setDearTableData((pre) => {
      const index = pre.forebay.findIndex((dat) => dat.click);

      if (index == -1) return pre;

      const updatedData = [...pre.forebay];

      updatedData.splice(index, 1, {
        ...updatedData[index],
        click: false,
      });

      return { ...pre, forebay: updatedData };
    });
  }
}

function addClick({ index, dearTableData, setDearTableData, dearTableLayout }) {
  //
  debugLog("addClick run");
  if (
    dearTableLayout.tbody.allowRowSelection ||
    dearTableLayout.tbody.allowMultipleRowSelection
  ) {
    //
    debugLog("addClick truely run");

    const copiedForebay = [...dearTableData.forebay];

    let oldClick = copiedForebay[index].click;

    if (dearTableLayout.tbody.allowRowSelection) {
      copiedForebay.forEach((dt) => {
        if (dt.click) {
          dt.click = false;
        }
      });
    }

    copiedForebay.splice(index, 1, {
      ...copiedForebay[index],
      click: !oldClick,
    });

    setDearTableData((pre) => {
      return { ...pre, forebay: copiedForebay };
    });
  }
}

export { addClick, removeClick };
