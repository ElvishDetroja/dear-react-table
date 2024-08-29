import DearReactTable from "./../index";
import rowData from "./db";
import { useState } from "react";
import Button from "./Button";
import "./App.css";

//
//
//

const finalData = rowData.map(
  ({ first_name = "", last_name = "", ...rest }) => ({
    ...rest,
    full_name: `${first_name} ${last_name}`.trim(),
  })
);

function App() {
  //
  console.log("App run");
  const [dearTableData, setDearTableData] = useState({});
  //
  const dearTableConfig = {
    serverSide: false,
    start: 0,
    lengthOption: [10, 25, 50, 100],
    searchDebounceDelay: 1000,
    columns: [
      {
        name: "User Id",
        key: "id",
        orderable: true,
        searchable: true,
      },
      {
        name: "Email",
        key: "email",
        orderable: false,
        searchable: true,
      },
      {
        name: "Name",
        key: "full_name",
        orderable: true,
        searchable: true,
      },
      {
        name: "About",
        key: "about",
        orderable: true,
      },
      {
        name: "Role",
        key: "role",
        filter: {
          type: "select",
          options: [
            {
              label: "admin",
              value: "admin",
            },
            {
              label: "buyer",
              value: "buyer",
            },
            {
              label: "seller",
              value: "seller",
            },
          ],
        },
      },
      {
        name: "Role Type",
        key: "role_type",
        searchable: true,
        filter: {
          type: "text",
        },
      },
      {
        name: "Account Active Status",
        key: "status",
        filter: {
          type: "select",
          options: [
            {
              label: "unverified",
              value: "unverified",
            },
            {
              label: "verified",
              value: "verified",
            },
          ],
        },
      },
      {
        name: "Action",
        key: "button",
        component: true,
      },
    ],
  };

  const dearTableData2 = {
    data: finalData,
    totalRecords: 75,
    filteredRecords: 75,
    // error: true,
    // errorMessage: "",
  };

  async function dearTableCallback(data) {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const resData = await res.json();
      console.log("dummy json", resData);
      setDearTableData(dearTableData2);
      // return dearTableData2;
    } catch (error) {
      console.log("error", error);
      setDearTableData({ error: true });
      return { error: true };
    }
  }

  const dearTableLayout = {
    display: {
      search: true,
      info: true,
      length: true,
      pagination: true,
    },
    position: {
      topLeft: "length",
      topRight: "search",
      bottomLeft: "info",
      bottomRight: "pagination",
    },
    table: {
      enableScrollX: true,
      enableScrollY: false,
      maxHeightForScrollY: "400px",
      border: true,
    },
    tbody: {
      enableRowHover: true,
      allowRowSelection: true,
      allowMultipleRowSelection: false,
      borderX: true,
      borderY: false,
      textAlign: "left",
    },
    thead: {
      borderX: true,
      borderY: false,
      borderYForFilter: false,
      justifyContent: "space-between",
    },
  };

  const dearTableStyle = {
    darkTheme: false,
    style: {
      borderRadius: "5px",
      maxHeightForScrollY: "400px",

      parentBGColor: "white",
      fontColor: "#333",

      evenRowColor: "white",
      oddRowColor: "#f9fafb",
      rowHoverColor: "#e6e7e8",
      rowBorderColor: "#d6d9e0",

      selectedRowColor: "#0d6efd",
      selectedRowHoverColor: "#0d6dfcd1",
      selectedRowFontColor: "white",

      arrowDefaultColor: "#dfdfdf",
      arrowActiveColor: "#666666",

      paginationActiveColor: "#e6e7e8",
      paginationHoverColor: "#f9fafb",
      paginationBorderColor: "#d6d9e0",

      orderOddRowColor: "#f1f1f1",
      orderEvenRowColor: "#fafafa",

      columnTitleBGColor: "white",

      searchAndLengthBGColor: "#f9fafb",
      searchAndLengthBorderColor: "#e6e7e8",
      searchAndLengthFocusBorderColor: "#0d6efd",

      loadingPrimaryColor: "#0d6efd",
      loadingSecondaryColor: "#e6e7e8",

      scrollbarColor: "#c0b8b8",
      scrollbarHoverColor: "#817f7f",
    },
  };

  const dearTableCustomComponents = {
    components: {
      button: Button,
    },
    componentsProps: {
      dearTableData,
      setDearTableData,
    },
  };

  return (
    <>
      <div className="my-table">
        <DearReactTable
          dearTableConfig={dearTableConfig}
          dearTableData={dearTableData}
          dearTableCallback={dearTableCallback}
          dearTableLayout={dearTableLayout}
          dearTableStyle={dearTableStyle}
          dearTableCustomComponents={dearTableCustomComponents}
        />
      </div>
    </>
  );
}

export default App;
