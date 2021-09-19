import { QueriesState } from "./store/actions";
import { DashboardsState } from "./store/reducers/dashboards";
export declare const DASHBOARD_LOCAL_STORAGE_KEY = "dashboards";
export declare const QUERIES_LOCAL_STORAGE_KEY = "queries";
export declare function saveDashboards(state: DashboardsState): DashboardsState;
export declare function saveQueries(state: QueriesState): QueriesState;
export declare function getInitialState(): void;
