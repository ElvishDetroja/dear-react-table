function activeArrow({ column, dearTableConfig }) {
  //
  let upActive = false;
  let downActive = false;

  if (!dearTableConfig.order || dearTableConfig.order.length <= 0)
    return { upActive, downActive };

  if (dearTableConfig.order[0].key == column.key) {
    if (dearTableConfig.order[0].direction == "asc") {
      upActive = true;
    }
    if (dearTableConfig.order[0].direction == "desc") {
      downActive = true;
    }
  }
  return {
    upActive,
    downActive,
  };
}

export default activeArrow;
