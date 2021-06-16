import React, {
  Dispatch,
  FC,
  ReactElement,
  useContext,
  useMemo,
  useReducer,
} from "react";

export const AppContext = React.createContext<{
  state: any;
  setAppData: Dispatch<any>;
}>({
  state: {},
  setAppData: () => {},
});

export function getAppContext() {
  return useContext(AppContext);
}

/**
 * 结合 useMemo，避免子组件因使用 useContext 而导致不必要的 re-render
 * 类似 redux 中的 reselect
 */
export function dvConnect(Components: FC, selector: any) {
  return (props: any): ReactElement => {
    const { state, setAppData } = useContext(AppContext);
    const deps = selector(state)(props);
    return useMemo(
      () => <Components setAppData={setAppData} {...props} {...deps} />,
      [...Object.values(deps), ...Object.values(props)]
    );
  };
}

/**
 * 包装应用入口以注入 context
 */
export function DvProvider({ children }) {
  const [state, setAppData] = useReducer((s, action) => {
    return { ...s, ...action };
  }, {});

  return (
    <AppContext.Provider value={{ state, setAppData }}>
      {children}
    </AppContext.Provider>
  );
}
