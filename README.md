## Introduction

dear-react-table is a customizable React library designed for creating dynamic tables. It handles both client-side and server-side data operations, offering developers a powerful tool for complex data management needs. It integrates advanced functionalities like searching, sorting, filtering, pagination, and custom styling. With scalability and performance, it's ideal for applications where developers need to add custom components and tailor the table to fit specific requirements.

## Why choose dear-react-table?

- Highly Customizable: Developers can fine-tune everything from layout and styles to individual components like pagination, sorting arrows, and row selection. This level of customization ensures that your table fits seamlessly into your application's design and functionality.

- Flexible Data Handling: It supports both client-side and server-side data processing, making it adaptable to a wide range of use cases. Whether you're dealing with small datasets that can be fully managed on the client side or large datasets that require server-side processing, this library has you covered.

- Performance Optimizations: Built with performance in mind, library is optimized for handling large datasets efficiently. Its design ensures smooth interactions and fast rendering, even when dealing with thousands of rows.

- Modern Technology Stack: dear-react-table is developed with modern React practices in mind, utilizing the latest React capabilities and patterns to ensure compatibility and ease of integration with other contemporary libraries and tools.

- Developer Friendly: dear-react-table was designed with developers in mind. It has an easy-to-use interface, comprehensive documentation and an intuitive design that minimizes the learning curve and accelerates development.

- Rich Feature Set: Like many other table libraries, dear-react-table offers search, filtering, and responsive design. However, it stands out with its out-of-the-box feature that allows developers to easily integrate custom components, such as buttons, inputs, and popups.

- Built with ❤️ in React

## CodeSandbox Demo

Try out **dear-react-table** live on [CodeSandbox](https://codesandbox.io/p/sandbox/dear-react-table-c8lkxj). This interactive demo showcases the library's features and allows you to experiment with its functionality.

## Documentation

### Installation

To get started with dear-react-table, you first need to install it via npm or yarn. Open your terminal and run one of the following commands:

```bash
npm install dear-react-table
```

```bash
yarn add dear-react-table
```

### Usage

Importing dear-react-table
Once installed, you can import dear-react-table into your React component.

```bash
import DearReactTable from 'dear-react-table';
```

#### Basic Initialization

```bash
# App.js

import DearReactTable from "dear-react-table";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState();

  const dearTableConfig = {
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
        searchable: true,
      },
      {
        name: "Role",
        key: "role",
      },
      {
        name: "Role Type",
        key: "role_type",
        searchable: true,
      },
      {
        name: "Account Status",
        key: "status",
      },
    ],
  };

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
      const response = await fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

    // Format the data as needed for your table, ensuring that the final version is compatible with dearTableData.

      const formattedData = formatData(responseData);
      setUsers(formattedData);
    } catch (error) {
      console.log("Processing error:", error);
      setUsers({ error: true });
    }
  }

  return (
    <>
      <div className="my-table">
        <DearReactTable
          dearTableConfig={dearTableConfig}
          dearTableData={users}
          dearTableCallback={dearTableCallback}
        />
      </div>
    </>
  );
}

export default App;
```

dearTableData object should follow this structure:

```bash
{
    data: data,
    totalRecords: 75,
    filteredRecords: 75,
}
```

![image-table-preview](https://github.com/user-attachments/assets/ab3847fb-e5ab-4c3c-9e08-4980a280e46a)

#### Table Customization

DearReactTable component takes this six props.

```bash
    <DearReactTable
      dearTableConfig={dearTableConfig}
      dearTableData={users}
      dearTableCallback={dearTableCallback}
      dearTableLayout={dearTableLayout}
      dearTableStyle={dearTableStyle}
      dearTableCustomComponents={dearTableCustomComponents}
    />
```

The dearTableConfig object lets you customize key aspects of the table, including enabling server-side processing, setting options for entries per page, and defining column data. You can specify which columns have sorting or filtering options, determine which columns to include in the global search, and designate where custom components should be rendered.

The dearTableData object is used to provide data to the table component, is responsible for populating rows. The structure of this object should include data, totalRecords, and filteredRecords. It also handles errors that may occur during API calls or data fetching.

The dearTableCallback function is used for calling the API or fetching data whenever the user updates any configuration settings.

The dearTableLayout controls the display and positioning of elements such as length options, search, info, and pagination. It also configures horizontal and vertical scrolling, row selection, and table borders.

The dearTableStyle customizes the color theme and overall visual appearance of the table.

The dearTableCustomComponents object contains two properties. The first, components, is where you pass your custom components, keyed by the names provided in dearTableConfig. The second, componentsProps, is where you pass any additional props that can be accessed within your custom components.

## dearTableConfig

#### how to use individual filter for column?

```bash
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
        searchable: true,
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
        name: "Account Status",
        key: "status",
        filter: {
          type: "select",
          options: [
            {
              label: "unverified",
              value: "0",
            },
            {
              label: "verified",
              value: "1",
            },
          ],
        },
      },
    ],
  };
```

The dearTableConfig object is sent every time the dearTableCallback function is invoked. This configuration object is used to fetch data from the backend based on the current table settings.

| key                        | type    | default value     | description                                                                                                                                                                                                                        |
| -------------------------- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| serverSide                 | Boolean | true              | When serverSide is true, the dearTableCallback function is invoked every time a user changes a configuration (e.g., sorting, pagination). When false, the library handles everything internally without needing to fetch new data. |
| start                      | Number  | 0                 | Indicates the starting point of the data to be displayed, skipping rows before this index.                                                                                                                                         |
| lengthOption               | Array   | [10, 25, 50, 100] | Defines the options for the number of rows to be displayed per page.                                                                                                                                                               |
| searchDebounceDelay        | Number  | 1000              | The delay in milliseconds before executing the search after the user stops typing.                                                                                                                                                 |
| columns                    | Array   |                   | An array of column definitions that configure each column's behavior and appearance.                                                                                                                                               |
| columns[].name             | String  |                   | The display name of the column.                                                                                                                                                                                                    |
| columns[].key              | String  |                   | The unique key corresponding to the column's data field.                                                                                                                                                                           |
| columns[].orderable        | Boolean | false             | Determines whether the column can be sorted.                                                                                                                                                                                       |
| columns[].searchable       | Boolean | false             | Indicates if the column should be included in global searches.                                                                                                                                                                     |
| columns[].filter           | Object  |                   | Specifies an individual filter for the column.                                                                                                                                                                                     |
| columns[].filter.type      | String  |                   | Specifies the filter type (e.g., "text", "select").                                                                                                                                                                                |
| columns[].filter.condition | String  | "equalTo"         | If filter.type is "select", this property defines the condition used for filtering (e.g., "greaterThan", "lessThan").                                                                                                              |
| columns[].filter.options   | Array   |                   | If filter.type is "select", this property provides the available filter options. It should be an array of objects, each containing a label and a value key.                                                                        |

![image-table-with-filter](https://github.com/user-attachments/assets/684524bd-ef83-4879-b432-19779dcc7cfb)

## dearTableData

#### how to handle error?

When using dearTableData, it's important to structure your data properly and handle any errors that might occur during data fetching.

```bash
const finalData = [
  {
    id: 1,
    email: "alexMorgan1@example.com",
    first_name: "Alex",
    last_name: "Morgan",
    about: "I am an investor from the USA.",
    role: "buyer",
    role_type: "investor",
    status: "verified",
  },
  {
    id: 2,
    // More data entries...
  },
  // Additional data entries...
];

const dearTableData = {
  data: finalData,
  totalRecords: 75,
  filteredRecords: 75,
  error: false,
  errorMessage: "Failed to fetch data",
};
```

The dearTableData object should be formatted as shown above. If your data object is nested or if you need to combine multiple keys, you should format the data after fetching it and then pass it to dearTableData. (as we did in basic intiliazation process)

If the data fetching fails for any reason, set error to true and provide an appropriate errorMessage.

| key             | type    | default Value        | description                                                                                       |
| --------------- | ------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| data            | Array   |                      | The array of objects that populate the table. Each object represents a row of data.               |
| totalRecords    | Number  |                      | The total number of entries without any filters applied.                                          |
| filteredRecords | Number  |                      | The total number of entries after applying filters.                                               |
| error           | Boolean | false                | Indicates whether an error occurred during data fetching. Set to true if an error is encountered. |
| errorMessage    | Boolean | Something went wrong | A message describing the error, useful for debugging or displaying a user-friendly error message. |

## dearTableCallback

The dearTableCallback function is triggered during the table's initialization, regardless of whether serverSide is set to true or false. After the initial setup, dearTableCallback will be triggered whenever the user changes any table configuration, such as pagination, searching, sorting, or filtering. However, this will only occur if serverSide is set to true. When serverSide is false, these functionalities are handled internally by the library without triggering the function.

There are two methods to update the dearTableData:

1. By setting a state variable (as demonstrated in the basic initialization):

```bash
  async function dearTableCallback(data) {
    try {
      const responseData = await sendRequest(data);
      console.log("Received data:", responseData);

      const formattedData = formatData(responseData);
      setUsers(formattedData);
    } catch (error) {
      console.log("Processing error:", error);
      setUsers({ error: true });
    }
  }

```

2. By returning the value:

```bash

  async function dearTableCallback(data) {
    try {
      const responseData = await sendRequest(data);
      console.log("Received data:", responseData);

      const formattedData = formatData(responseData);
      return formattedData;
    } catch (error) {
      console.log("Processing error:", error);
      return { error: true };
    }
  }
```

**Recommendation**

Using the second method—returning the value directly—is generally preferred. This approach minimizes unnecessary re-renders of components, leading to better performance and efficiency.

## dearTableLayout

```bash
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
```

The above configuration represents the default values.

| key                             | description                                           | Possible Values                                                                                                                                                                                                                   |
| ------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| display                         | Controls which UI elements are visible on the table.  | search: true/false <br/> info: true/false <br/> length: true/false <br/> pagination: true/false                                                                                                                                   |
| position                        | Determines the position of various table controls.    | topLeft: "length", "search", "info", "pagination" <br/> topRight: "length", "search", "info", "pagination" <br/> bottomLeft: "length", "search", "info", "pagination" <br/> bottomRight: "length", "search", "info", "pagination" |
| table                           | Controls general table settings.                      |
| table.enableScrollX             | If true, enables horizontal scrolling.                |
| table.enableScrollY             | If true, enables vertical scrolling.                  |
| table.border                    | If true, adds borders to the table.                   |
| tbody                           | Controls settings for table body.                     |
| tbody.enableRowHover            | If true, enables row hover effects.                   |
| tbody.allowRowSelection         | If true, allows selecting rows.                       |
| tbody.allowMultipleRowSelection | If true, allows multiple row selection.               |
| tbody.borderX                   | If true, adds horizontal borders to cells.            |
| tbody.borderY                   | If true, adds vertical borders to cells.              |
| tbody.textAlign                 | Text alignment for table body cells.                  | "left", "center", "right"                                                                                                                                                                                                         |
| thead                           | Controls settings for table header.                   |
| thead.borderX                   | If true, adds horizontal borders to the header cells. |
| thead.borderY                   | If true, adds vertical borders to the header cells.   |
| thead.borderYForFilter          | If true, adds vertical borders for filter row cells.  |
| thead.justifyContent            | Justification of header content.                      | "flex-start", "center", "flex-end", "space-between"                                                                                                                                                                               |

## dearTableStyle

To customize the theme, you can pass the dearTableStyle prop with darkTheme: true to enable the dark mode.

```bash
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
```

To switch between light and dark themes, or to adjust any of the parameters listed, pass the desired values in this object through the component props. Any parameters not specified will use the default values.

![image-dark-theme-table](https://github.com/user-attachments/assets/663cd1a6-9efd-46d0-8bd5-65fe4678b5cb)

## dearTableCustomComponents

### How to use custom component in table?

### How to update the data in table?

1. Create Your Custom Component: Define a React component that receives the row's data through the dearRow prop. Update the table data using updateDearTableData rather than setUsers. Using updateDearTableData is recommended to minimize unnecessary re-renders and optimize performance. If you need to pass more than one object, you can provide an array of objects as arguments in updateDearTableData.

```bash
# Button.js

import { updateDearTableData } from "dear-react-table";
import "./button.css";

function Button(props) {
  const { dearRow, dearComponentsProps } = props;
  const { users, setUsers } = dearComponentsProps;

  function handleClick(event) {

    event.stopPropagation();
    // Prevents event from propagating up the DOM tree
    // This is necessary for the proper functioning of various components

    dearRow.status = dearRow.status == "unverified" ? "verified" : "unverified";
    updateDearTableData(dearRow);
  }

  return (
    <>
      <button className="my-button" onClick={handleClick}>
        {dearRow.status == "verified" ? "unverified" : "verified"}
      </button>
    </>
  );
}

export default Button;
```

2. Integrate the Custom Component into Your Table:
   Add a column in your dearTableConfig with the component: true flag. Then, pass your custom component and its props through dearTableCustomComponents.

```bash
# App.js

import Button from "./Button";
import DearReactTable from "dear-react-table";

const dearTableConfig = {
  columns: [
    // Other column definitions
    {
      name: "Action",
      key: "button",
      component: true,
    },
  ],
};

const dearTableCustomComponents = {
  components: {
    button: Button,
  },
  componentsProps: {
    users,
    setUsers,
  },
};

   <DearReactTable
    dearTableConfig={dearTableConfig}
    dearTableData={users}
    dearTableCallback={dearTableCallback}
    dearTableCustomComponents={dearTableCustomComponents}
    />
```

![image-custom-table-component](https://github.com/user-attachments/assets/960e2fae-e6ac-4997-8d10-1b83d788cf5c)

## How to delete the row through custom component in table?

By default, this method only deletes the row from the library’s local data. If you need to delete the row from the server, you will need to add API calls within this function.

```bash
import { updateDearTableData } from "dear-react-table";
import "./button.css";

function Button(data) {
  const { dearRow, dearComponentsProps } = data;
  const { users, setUsers } = dearComponentsProps;

  function handleDelete(event) {
    event.stopPropagation();
    // Prevents event from propagating up the DOM tree
    // This is necessary for the proper functioning of various components

    dearRow.dearDelete = true;
    updateDearTableData(dearRow);

     // Optional: Add an API call here to delete the row from the server
  }

  return (
    <>
      <button className="my-button" onClick={handleDelete}>
        delete
      </button>
    </>
  );
}

export default Button;
```

## How to reload table manually?

To manually reload the table, you can use the reload function from dear-react-table.

```bash
import { reload } from "dear-react-table";
```

Based on our experience, manual reloading of the table is typically unnecessary. However, if you find that a manual reload is required, you can call this function:

```bash
reload();
```

This will trigger a reload of the table data. Use this function only when absolutely needed, as frequent reloads may impact performance.

## Contact Us

If you encounter a bug or issue with the library, please contact me at TheElvishDetroja@gmail.com. Include a screenshot of the error and a brief description of what you were trying to design. We will address and resolve the issue within 24 hours.
