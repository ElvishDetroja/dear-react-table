import debug from "../utils/debug";
import deepMerge from "../utils/deepMerge";
import {
  defaultConfig,
  defaultData,
  defaultLayout,
  defaultStyle,
  defaultStyleLight,
  defaultStyleDark,
} from "./defaultValues";

function ensureDefaultConfig(tableConfig) {
  //
  debug.info("ensureDefaultValues: ensureDefaultConfig run");

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
  debug.info("ensureDefaultValues: ensureDefaultData run");

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
  debug.info("ensureDefaultValues: dataFramework run");

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
  debug.info("ensureDefaultValues: ensureDefaultLayout run");

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
  debug.info("ensureDefaultValues: ensureDefaultStyle run");

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
  debug.log("ensureDefaultValues: ensureCombine Run");

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

function newDataInDearTableData({ newData, contextValue }) {
  //
  debug.log("newDataInDearTableData run", newData);

  const { dearTableData, setDearTableData, statusRef, dearTableConfig } =
    contextValue;

  const { frameworkTableData } = ensureCombine({
    tableConfig: dearTableConfig,
    tableData: newData,
    dearTableData: dearTableData,
  });

  debug.info("frameworkTableData", frameworkTableData);

  setDearTableData({ ...frameworkTableData, loading: false });

  statusRef.current = { ...statusRef.current, dataUpdated: true };
}

export {
  ensureDefaultConfig,
  ensureDefaultData,
  dataFramework,
  ensureDefaultStyle,
  ensureCombine,
  newDataInDearTableData,
};
