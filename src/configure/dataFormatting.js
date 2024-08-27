import debug from "../utils/debug";
import deepMerge from "../utils/deepMerge";
import {
  defaultConfig,
  defaultData,
  defaultLayout,
  defaultStyle,
  preLightStyle,
  preDarkStyle,
} from "./defaultValues";

function processingConfig({ unprocessedConfig }) {
  //
  debug.info("dataFormatting: processingConfig run");

  if (!unprocessedConfig) return defaultConfig;
  const tableConfig = structuredClone(unprocessedConfig);

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

function processingData({ unprocessedData, existingData = {} }) {
  //
  debug.info("dataFormatting: processingData run");

  if (!unprocessedData) return defaultData;

  const tableData = structuredClone(unprocessedData);
  const dearExistingData = structuredClone(existingData);

  Object.keys(defaultData).forEach((key) => {
    if (tableData[key] == undefined) {
      tableData[key] = defaultData[key];
    }
  });

  if (!Array.isArray(tableData.data)) {
    tableData.data = [];
  }

  return { ...dearExistingData, ...tableData };
}

function frameworkingData({ processedConfig, processedData }) {
  //
  debug.info("dataFormatting: frameworkingData run");

  let frameworkData = structuredClone(processedData);

  frameworkData.data.forEach((dat, idx) => {
    dat.dearId = idx;
  });

  if (processedConfig.serverSide) {
    frameworkData = {
      ...frameworkData,
      forebay: [...frameworkData.data],
    };
  } else {
    frameworkData = {
      ...frameworkData,
      reservoir: frameworkData.data,
    };
  }

  delete frameworkData.data;
  return frameworkData;
}

function processingLayout({ unprocessedLayout }) {
  //
  debug.info("dataFormatting: processingLayout run");

  if (!unprocessedLayout) return defaultLayout;

  const layout = structuredClone(unprocessedLayout);

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

  return { ...deepMerge(defaultLayout, layout), location: finalLayout };
}

function processingStyle({ unprocessedStyle }) {
  //
  debug.info("dataFormatting: processingStyle run");

  if (!unprocessedStyle) return defaultStyle;

  const newStyle = structuredClone(unprocessedStyle);

  let finalStyle = {
    ...defaultStyle,
    ...newStyle,
    style: { ...defaultStyle.style, ...newStyle.style },
    feedStock: {},
  };

  if (finalStyle.darkTheme) {
    Object.assign(finalStyle.style, preDarkStyle, newStyle.style);
  } else {
    Object.assign(finalStyle.style, preLightStyle, newStyle.style);
  }

  Object.keys(finalStyle.style).forEach((key) => {
    finalStyle.feedStock[`--${key}`] = finalStyle.style[key];
  });

  return finalStyle;
}

function formattingCombine({
  unprocessedConfig,
  unprocessedData,
  existingData,
  unprocessedLayout,
  unprocessedStyle,
}) {
  //
  debug.log("dataFormatting: formattingCombine Run");

  let processedConfig,
    processedData,
    frameworkData,
    processedLayout,
    processedStyle;

  processedConfig = processingConfig({ unprocessedConfig });

  processedData = processingData({
    unprocessedData,
    existingData,
  });

  frameworkData = frameworkingData({
    processedConfig,
    processedData,
  });

  processedLayout = processingLayout({ unprocessedLayout });

  processedStyle = processingStyle({ unprocessedStyle });

  return {
    processedConfig,
    frameworkData,
    processedLayout,
    processedStyle,
  };
}

export { formattingCombine };
