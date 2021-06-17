const globalDataFactory = (() => {
  let globalState = {};

  function getGlobalData(key: globalKeys) {
    if (key === undefined) {
      return globalState;
    }
    return globalState[key];
  }
  /**
   * 非响应式
   */
  function mergeGlobalData(data: any) {
    globalState = {
      ...globalState,
      ...data,
    };
  }

  /**
   * 非响应式
   */
  function resetGlobalData(data: any) {
    globalState = data;
  }

  return {
    getGlobalData,
    mergeGlobalData,
    resetGlobalData,
  };
})();

export enum globalKeys {
  pageInfo,
}

function getPageData(): {
  pageId: string;
  pageName: string;
} {
  return globalDataFactory.getGlobalData(globalKeys.pageInfo) || {};
}

function setPageData(pageData: any) {
  globalDataFactory.mergeGlobalData({ [globalKeys.pageInfo]: pageData });
}
export { globalDataFactory, getPageData, setPageData };
