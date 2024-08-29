function Button(data) {
  const { dearRow, dearComponentsProps } = data;
  const { dearTableData, setDearTableData } = dearComponentsProps;

  function handleClick(event) {
    //
    event.stopPropagation();
    const updatedStatus =
      dearRow.status === "unverified" ? "verified" : "unverified";

    const rowIndex = dearTableData.data.findIndex((item) => item.id === row.id);

    if (rowIndex === -1) return;

    const updatedData = [...dearTableData.data];

    updatedData.splice(rowIndex, 1, {
      ...updatedData[rowIndex],
      status: updatedStatus,
    });

    setDearTableData((pre) => ({
      ...pre,
      data: updatedData,
    }));
  }

  return (
    <>
      <button onClick={handleClick}>
        {row.status == "verified" ? "unverified" : "verified"}
      </button>
    </>
  );
}

export default Button;
