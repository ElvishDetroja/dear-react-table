const defaultConfig = {
  serverSide: true,
  start: 0,
  length: 10,
  lengthOption: [10, 25, 50, 100],
  searchDebounceDelay: 1000,
  columns: [],
};

const defaultData = {
  data: [],
  totalRecords: 0,
  filteredRecords: 0,
  error: false,
  errorMessage: "Something went wrong",
};

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

const defaultStyle = {
  darkTheme: false,
  style: {
    borderRadius: "5px",
    maxHeightForScrollY: "400px",
  },
};

const preLightStyle = {
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

const preDarkStyle = {
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

const defaultComponents = {
  components: {},
  componentsProps: {},
};

export {
  defaultConfig,
  defaultData,
  defaultLayout,
  defaultStyle,
  preLightStyle,
  preDarkStyle,
  defaultComponents,
};
