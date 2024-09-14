import DearReactTable from "../../listicle.js";
import dbData from "../utils/db.js";
import { useState } from "react";
import ButtonUpdate from "../components/ButtonUpdate.js";
import ButtonDelete from "../components/ButtonDelete.js";
import "./App.css";

//
//
//

function App() {
  //
  console.log("App run");

  const [users, setUsers] = useState();

  function formatData(rowData) {
    const formattedData = rowData.data.map(
      ({ first_name = "", last_name = "", ...rest }) => ({
        ...rest,
        full_name: `${first_name} ${last_name}`.trim(),
      })
    );

    return { ...rowData, data: formattedData };
  }

  async function sendRequest(data) {
    try {
      const response = await fetch("https://dummyjson.com/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log("Request error:", error);
      throw error;
    }
  }

  async function dearTableCallback(data) {
    try {
      const responseData = await sendRequest(data);
      console.log("Received data:", responseData);

      let rowData = {
        data: dbData,
        totalRecords: 75,
        filteredRecords: 75,
      };

      const formattedData = formatData(rowData);
      setUsers(formattedData);
    } catch (error) {
      console.log("Processing error:", error);
      setUsers({ error: true });
    }
  }
  //
  const dearTableConfig = {
    serverSide: true,
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
        name: "Update",
        key: "buttonUpdate",
        component: true,
      },
      {
        name: "Delete",
        key: "buttonDelete",
        component: true,
      },
    ],
  };

  const dearTableCustomComponents = {
    components: {
      buttonUpdate: ButtonUpdate,
      buttonDelete: ButtonDelete,
    },
    componentsProps: {
      users,
      setUsers,
    },
  };

  return (
    <>
      <div className="my-table">
        <DearReactTable
          dearTableConfig={dearTableConfig}
          dearTableData={users}
          dearTableCallback={dearTableCallback}
          dearTableCustomComponents={dearTableCustomComponents}
        />
      </div>
    </>
  );
}

export default App;
