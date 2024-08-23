import DearReactTable from "./dearReactTable";
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
        primaryKey: true,
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
    display: {},
    position: {},
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
    },
    thead: {
      borderX: true,
      borderY: false,
    },
  };

  const dearTableStyle = {
    darkTheme: false,
  };

  const dearTableComponents = {
    button: Button,
  };

  const dearComponentsProps = {
    dearTableData,
    setDearTableData,
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
          dearTableComponents={dearTableComponents}
          dearComponentsProps={dearComponentsProps}
        />
      </div>
    </>
  );
}

export default App;
