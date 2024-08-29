import debug from "./debug";

function removeClick({
  dearTableConfig,
  dearTableData,
  setDearTableData,
  dearTableLayout,
}) {
  //
  debug.log("removeClick run");

  if (dearTableLayout.tbody.allowRowSelection) {
    //
    debug.info("removeClick truely run");

    const index = dearTableData.forebay.findIndex((dat) => dat.click);
    if (index == -1) return;

    const dearId = dearTableData.forebay[index].dearId;

    const updatedForebay = [...dearTableData.forebay];

    updatedForebay.splice(index, 1, {
      ...updatedForebay[index],
      click: false,
    });

    if (!dearTableConfig.serverSide) {
      const updatedReservoir = [...dearTableData.reservoir];
      const idx = updatedReservoir.findIndex((dat) => dat.dearId == dearId);

      updatedReservoir[idx].click = false;

      setDearTableData((pre) => {
        return {
          ...pre,
          forebay: updatedForebay,
          reservoir: updatedReservoir,
        };
      });
    } else {
      setDearTableData((pre) => {
        return {
          ...pre,
          forebay: updatedForebay,
        };
      });
    }
  }
}

function addClick({
  row,
  index,
  dearTableConfig,
  dearTableData,
  setDearTableData,
  dearTableLayout,
}) {
  //
  debug.log("addClick run");
  if (
    dearTableLayout.tbody.allowRowSelection ||
    dearTableLayout.tbody.allowMultipleRowSelection
  ) {
    //
    debug.info("addClick truely run");

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

    if (!dearTableConfig.serverSide) {
      const copiedReservoir = [...dearTableData.reservoir];
      const findIdx = copiedReservoir.findIndex(
        (dat) => dat.dearId == row.dearId
      );

      copiedReservoir[findIdx] = {
        ...copiedReservoir[findIdx],
        click: !oldClick,
      };

      setDearTableData((pre) => {
        return { ...pre, forebay: copiedForebay, reservoir: copiedReservoir };
      });
    } else {
      setDearTableData((pre) => {
        return { ...pre, forebay: copiedForebay };
      });
    }
  }
}

export { addClick, removeClick };
