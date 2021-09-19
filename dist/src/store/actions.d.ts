import { AggregationFunction } from "@neode/querybuilder";
import { ApocDirection, Condition } from "../constants";
import { Dashboard, Report } from "./reducers/dashboards";
export declare type QueriesState = Query[];
export interface Query {
    loaded: boolean;
    updated: boolean;
    id?: string;
    name?: string;
    savedAt?: Date;
    selected?: string;
    nodes: TreeNode[];
    relationships: TreeRelationship[];
    predicates: TreePredicate[];
    output: TreeReturn[];
}
export interface TreeNode {
    id: string;
    label: string;
}
export interface TreeRelationship {
    id: string;
    from: string;
    to: string;
    type: string;
    direction: ApocDirection;
}
export interface TreePredicatePayload {
    alias: string;
    name: string;
    type: any;
    condition: Condition;
    negative?: boolean;
    value: any;
}
export interface TreePredicate extends TreePredicatePayload {
    id: string;
}
export interface TreeReturnPayload {
    alias: string;
    name: string;
    aggregate?: AggregationFunction;
    as?: string;
}
export interface TreeReturn extends TreeReturnPayload {
    id: string;
}
export declare const APP_INIT = "APP_INIT";
export declare const ADD_DASHBOARD = "ADD_DASHBOARD";
export declare const UPDATE_DASHBOARD = "UPDATE_DASHBOARD";
export declare const DELETE_DASHBOARD = "DELETE_DASHBOARD";
export declare const ADD_REPORT = "ADD_REPORT";
export declare const UPDATE_REPORT = "UPDATE_REPORT";
export declare const DELETE_REPORT = "DELETE_REPORT";
export declare const REORDER_REPORTS = "REORDER_REPORTS";
export declare const ADD_QUERY = "ADD_QUERY";
export declare const UPDATE_QUERY = "UPDATE_QUERY";
export declare const DELETE_QUERY = "DELETE_QUERY";
/**
 * Init app
 */
export declare function init(dashboards: Dashboard[], reports: Report[], queries: Query[]): {
    type: string;
    payload: {
        dashboards: Dashboard[];
        reports: Report[];
        queries: Query[];
    };
};
/**
 * Dashboards
 */
export declare function addDashboard(name: string, description: string): {
    type: string;
    payload: {
        name: string;
        description: string;
    };
};
export declare function updateDashboard(id: string, name: string, description: string): {
    type: string;
    payload: {
        id: string;
        name: string;
        description: string;
    };
};
export declare function deleteDashboard(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export declare function addReport(dashboard: string, name: string, database: string | undefined, type: string, source: string, query: string, columns: number): {
    type: string;
    payload: {
        dashboard: string;
        name: string;
        database: string | undefined;
        type: string;
        source: string;
        query: string;
        columns: number;
    };
};
export declare function updateReport(id: string, dashboard: string, name: string, database: string | undefined, type: string, source: string, query: string, columns: number, rows: number, order: number): {
    type: string;
    payload: {
        id: string;
        dashboard: string;
        name: string;
        database: string | undefined;
        type: string;
        source: string;
        query: string;
        columns: number;
        rows: number;
        order: number;
    };
};
export declare function reorderReports(reports: Report[]): {
    type: string;
    payload: {
        reports: Report[];
    };
};
export declare function deleteReport(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
/**
 * Queries
 */
export declare function addQuery(name: string): {
    type: string;
    payload: {
        name: string;
    };
};
export declare function deleteQuery(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export declare function updateQuery(payload: Query): {
    type: string;
    payload: Query;
};
/**
 * Query Builder
 */
export declare const LOAD_QUERY = "LOAD_QUERY";
export declare const ADD_NODE = "ADD_NODE";
export declare const SELECT_NODE = "SELECT_NODE";
export declare const REMOVE_NODE = "REMOVE_NODE";
export declare const ADD_RELATIONSHIP = "ADD_RELATIONSHIP";
export declare const SELECT_RELATIONSHIP = "SELECT_RELATIONSHIP";
export declare const REMOVE_RELATIONSHIP = "REMOVE_RELATIONSHIP";
export declare const ADD_PREDICATE = "ADD_PREDICATE";
export declare const REMOVE_PREDICATE = "REMOVE_PREDICATE";
export declare const ADD_RETURN = "ADD_RETURN";
export declare const REMOVE_RETURN = "REMOVE_RETURN";
export declare const SET_NAME = "SET_NAME";
export declare function setName(name: string | undefined): {
    type: string;
    payload: {
        name: string | undefined;
    };
};
export declare function loadQuery(payload: any): {
    type: string;
    payload: any;
};
export declare function addNode(label: string): {
    type: string;
    payload: {
        label: string;
    };
};
export declare function selectNode(payload: string): {
    type: string;
    payload: string;
};
export declare function removeNode(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export declare function addRelationship(payload: TreeRelationship): {
    type: string;
    payload: TreeRelationship;
};
export declare function selectRelationship(payload: string): {
    type: string;
    payload: string;
};
export declare function removeRelationship(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export declare function addPredicate(payload: TreePredicatePayload): {
    type: string;
    payload: TreePredicatePayload;
};
export declare function removePredicate(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
export declare function addReturn(payload: TreeReturnPayload): {
    type: string;
    payload: TreeReturnPayload;
};
export declare function removeReturn(id: string): {
    type: string;
    payload: {
        id: string;
    };
};
