import debugLog from "../utils/debugLog";
import deepMerge from "../utils/deepMerge";

function ensureDefaultConfig(tableConfig) {
  //
  const defaultConfig = {
    serverSide: true,
    start: 0,
    length: 10,
    lengthOption: [10, 25, 50, 100],
    searchDebounceDelay: 1000,
    columns: [],
  };

  if (!tableConfig) return defaultConfig;

  Object.keys(defaultConfig).forEach((key) => {
    if (tableConfig[key] == undefined || tableConfig[key] == null) {
      tableConfig[key] = defaultConfig[key];
    }
  });

  if (!Array.isArray(tableConfig.columns)) {
    tableConfig.columns = [];
  }

  return tableConfig;
}

function ensureDefaultData({ tableData, dearTableData = {} }) {
  //
  const defaultData = {
    data: [],
    totalRecords: 0,
    filteredRecords: 0,
    error: false,
    errorMessage: "Something went wrong",
  };

  if (!tableData) return defaultData;

  Object.keys(defaultData).forEach((key) => {
    if (tableData[key] == undefined) {
      tableData[key] = defaultData[key];
    }
  });

  if (!Array.isArray(tableData.data)) {
    tableData.data = [];
  }

  return { ...dearTableData, ...tableData };
}

function dataFramework({ defaultTableConfig, defaultTableData }) {
  //
  if (defaultTableConfig.serverSide) {
    defaultTableData = { ...defaultTableData, forebay: defaultTableData.data };
  } else {
    defaultTableData = {
      ...defaultTableData,
      reservoir: defaultTableData.data,
    };
  }

  delete defaultTableData.data;
  return defaultTableData;
}

function ensureDefaultLayout(layout) {
  //
  const defaultLayout = {
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
    // segment is only used for library
    segment: {
      length: "Length",
      search: "Search",
      info: "Info",
      pagination: "Pagination",
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
    },
    thead: {
      borderX: true,
      borderY: false,
    },
  };

  // final layout start
  const finalLayout = {};
  const mergedDisplay = { ...defaultLayout.display, ...layout.display };
  const mergedPosition = { ...defaultLayout.position, ...layout.position };
  const componentTracker = new Map();

  Object.entries(defaultLayout.position).forEach(([position, component]) => {
    const newComponent = mergedPosition[position];
    if (componentTracker.has(newComponent)) {
      const existingPosition = componentTracker.get(newComponent);
      finalLayout[existingPosition] = {
        display: mergedDisplay[component],
        component,
      };
    }

    finalLayout[position] = {
      display: mergedDisplay[newComponent],
      component: newComponent,
    };

    componentTracker.set(newComponent, position);
  });

  Object.entries(finalLayout).forEach(([position, obj]) => {
    finalLayout[position] = {
      ...finalLayout[position],
      segment: defaultLayout.segment[obj.component],
    };
  });
  // final layout end

  return { ...deepMerge(defaultLayout, layout), location: finalLayout };
}

function ensureDefaultStyle(style) {
  //
  const defaultStyle = {
    borderRadius: "5px",
    maxHeightForScrollY: "300px",
  };

  const defaultStyleLight = {
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
  };

  const defaultStyleDark = {
    parentBGColor: "#212529",
    fontColor: "#dae0e7",

    evenRowColor: "#212529",
    oddRowColor: "#262a2e",
    rowHoverColor: "#292d31",
    rowBorderColor: "#404346",

    selectedRowHoverColor: "#0d6efd",
    selectedRowColor: "#0d6dfcd1",
    selectedRowFontColor: "white",

    arrowActiveColor: "#dfdfdf",
    arrowDefaultColor: "#666666",

    paginationHoverColor: "#262a2e",
    paginationActiveColor: "#424549",
    paginationBorderColor: "#404346",

    orderOddRowColor: "#2d3135",
    orderEvenRowColor: "#25292d",

    columnTitleBGColor: "#212529",

    searchAndLengthBGColor: "#262a2e",
    searchAndLengthBorderColor: "#424549",
    searchAndLengthFocusBorderColor: "#dae0e7",

    loadingPrimaryColor: "#0d6efd",
    loadingSecondaryColor: "#e6e7e8",

    scrollbarColor: "#dfdfdf",
    scrollbarHoverColor: "#c0cedf",
  };

  if (style.darkTheme) {
    Object.assign(defaultStyle, defaultStyleDark);
  } else {
    Object.assign(defaultStyle, defaultStyleLight);
  }

  Object.assign(defaultStyle, style);

  let feedStock = {};

  Object.keys(defaultStyle).forEach((key) => {
    feedStock[`--${key}`] = defaultStyle[key];
  });
  Object.assign(defaultStyle, { feedStock });

  return defaultStyle;
}

function ensureCombine({
  tableConfig,
  tableData,
  dearTableData,
  tableLayout,
  tableStyle,
}) {
  //
  debugLog("ensureCombine Run");

  let defaultTableConfig,
    frameworkTableData,
    defaultTableLayout,
    defaultTableStyle;

  if (tableConfig) {
    defaultTableConfig = ensureDefaultConfig(tableConfig);
  }
  if (tableData) {
    const defaultTableData = ensureDefaultData({ tableData, dearTableData });
    frameworkTableData = dataFramework({
      defaultTableConfig,
      defaultTableData,
    });
  }
  if (tableLayout) {
    defaultTableLayout = ensureDefaultLayout(tableLayout);
  }

  if (tableStyle) {
    defaultTableStyle = ensureDefaultStyle(tableStyle);
  }

  return {
    defaultTableConfig,
    frameworkTableData,
    defaultTableLayout,
    defaultTableStyle,
  };
}

export {
  ensureDefaultConfig,
  ensureDefaultData,
  dataFramework,
  ensureDefaultStyle,
  ensureCombine,
};
