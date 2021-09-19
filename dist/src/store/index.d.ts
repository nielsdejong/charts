declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    queries: any;
    currentQuery: import("./actions").Query;
    dashboards: import("./reducers/dashboards").DashboardsState;
}>, any>;
declare const _default: import("redux").Store<import("redux").CombinedState<{
    queries: any;
    currentQuery: import("./actions").Query;
    dashboards: import("./reducers/dashboards").DashboardsState;
}>, any>;
export default _default;
export declare type RootState = ReturnType<typeof rootReducer>;
