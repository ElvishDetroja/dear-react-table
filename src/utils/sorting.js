function sorting({ dearTableConfig, dearTableData }) {
  //
  const order = dearTableConfig?.order?.[0] || [];

  if (order.length == 0) return dearTableData;

  function getValue(li) {
    let value = li[order.key];

    if (typeof value == "string") {
      value = value.toUpperCase();
    }
   
    if (!value) {
      value = "";
    }

    return value;
  }

  const sortedTableData = dearTableData.forebay.sort((li_A, li_B) => {
    const val_A = getValue(li_A);
    const val_B = getValue(li_B);

    if (order.direction == "asc") return val_A > val_B ? 1 : -1;
    if (order.direction == "desc") return val_A > val_B ? -1 : 1;

    return 0;
  });

  return { ...dearTableData, forebay: sortedTableData };
}

export { sorting };
