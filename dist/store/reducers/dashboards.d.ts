export declare type Source = 'cypher' | 'query';
export interface Dashboard {
    id: string;
    name: string;
    description: string;
    savedAt: Date;
}
export interface Report {
    id: string;
    dashboard: string;
    database?: string;
    name: string;
    order: number;
    savedAt: Date;
    columns: number;
    rows: number;
    type: string;
    source: Source;
    query: string;
}
export interface DashboardsState {
    ready: boolean;
    dashboards: Dashboard[];
    reports: Report[];
}
export declare function deleteReport(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export default function dashboardsReducer(state: DashboardsState | undefined, action: Record<string, any>): DashboardsState;
