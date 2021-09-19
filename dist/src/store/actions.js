"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_INIT = 'APP_INIT';
exports.ADD_DASHBOARD = 'ADD_DASHBOARD';
exports.UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';
exports.DELETE_DASHBOARD = 'DELETE_DASHBOARD';
exports.ADD_REPORT = 'ADD_REPORT';
exports.UPDATE_REPORT = 'UPDATE_REPORT';
exports.DELETE_REPORT = 'DELETE_REPORT';
exports.REORDER_REPORTS = 'REORDER_REPORTS';
exports.ADD_QUERY = 'ADD_QUERY';
exports.UPDATE_QUERY = 'UPDATE_QUERY';
exports.DELETE_QUERY = 'DELETE_QUERY';
/**
 * Init app
 */
function init(dashboards, reports, queries) {
    return {
        type: exports.APP_INIT,
        payload: { dashboards: dashboards, reports: reports, queries: queries },
    };
}
exports.init = init;
/**
 * Dashboards
 */
function addDashboard(name, description) {
    return {
        type: exports.ADD_DASHBOARD,
        payload: { name: name, description: description },
    };
}
exports.addDashboard = addDashboard;
function updateDashboard(id, name, description) {
    return {
        type: exports.UPDATE_DASHBOARD,
        payload: { id: id, name: name, description: description },
    };
}
exports.updateDashboard = updateDashboard;
function deleteDashboard(id) {
    return {
        type: exports.DELETE_DASHBOARD,
        payload: { id: id },
    };
}
exports.deleteDashboard = deleteDashboard;
function addReport(dashboard, name, database, type, source, query, columns) {
    return {
        type: exports.ADD_REPORT,
        payload: {
            dashboard: dashboard,
            name: name,
            database: database,
            type: type,
            source: source,
            query: query,
            columns: columns
        },
    };
}
exports.addReport = addReport;
function updateReport(id, dashboard, name, database, type, source, query, columns, rows, order) {
    return {
        type: exports.UPDATE_REPORT,
        payload: {
            id: id,
            dashboard: dashboard,
            name: name,
            database: database,
            type: type,
            source: source,
            query: query,
            columns: columns,
            rows: rows,
            order: order,
        },
    };
}
exports.updateReport = updateReport;
function reorderReports(reports) {
    return {
        type: exports.REORDER_REPORTS,
        payload: {
            reports: reports,
        }
    };
}
exports.reorderReports = reorderReports;
function deleteReport(id) {
    return {
        type: exports.DELETE_REPORT,
        payload: { id: id },
    };
}
exports.deleteReport = deleteReport;
/**
 * Queries
 */
function addQuery(name) {
    return {
        type: exports.ADD_QUERY,
        payload: { name: name },
    };
}
exports.addQuery = addQuery;
function deleteQuery(id) {
    return {
        type: exports.DELETE_QUERY,
        payload: { id: id },
    };
}
exports.deleteQuery = deleteQuery;
function updateQuery(payload) {
    return {
        type: exports.UPDATE_QUERY,
        payload: payload,
    };
}
exports.updateQuery = updateQuery;
/**
 * Query Builder
 */
exports.LOAD_QUERY = 'LOAD_QUERY';
exports.ADD_NODE = 'ADD_NODE';
exports.SELECT_NODE = 'SELECT_NODE';
exports.REMOVE_NODE = 'REMOVE_NODE';
exports.ADD_RELATIONSHIP = 'ADD_RELATIONSHIP';
exports.SELECT_RELATIONSHIP = 'SELECT_RELATIONSHIP';
exports.REMOVE_RELATIONSHIP = 'REMOVE_RELATIONSHIP';
exports.ADD_PREDICATE = 'ADD_PREDICATE';
exports.REMOVE_PREDICATE = 'REMOVE_PREDICATE';
exports.ADD_RETURN = 'ADD_RETURN';
exports.REMOVE_RETURN = 'REMOVE_RETURN';
exports.SET_NAME = 'SET_NAME';
function setName(name) {
    return {
        type: exports.SET_NAME,
        payload: { name: name },
    };
}
exports.setName = setName;
function loadQuery(payload) {
    return {
        type: exports.LOAD_QUERY,
        payload: payload,
    };
}
exports.loadQuery = loadQuery;
function addNode(label) {
    return {
        type: exports.ADD_NODE,
        payload: { label: label },
    };
}
exports.addNode = addNode;
function selectNode(payload) {
    return {
        type: exports.SELECT_NODE,
        payload: payload,
    };
}
exports.selectNode = selectNode;
function removeNode(id) {
    return {
        type: exports.REMOVE_NODE,
        payload: { id: id },
    };
}
exports.removeNode = removeNode;
function addRelationship(payload) {
    return {
        type: exports.ADD_RELATIONSHIP,
        payload: payload,
    };
}
exports.addRelationship = addRelationship;
function selectRelationship(payload) {
    return {
        type: exports.SELECT_RELATIONSHIP,
        payload: payload,
    };
}
exports.selectRelationship = selectRelationship;
function removeRelationship(id) {
    return {
        type: exports.REMOVE_RELATIONSHIP,
        payload: { id: id },
    };
}
exports.removeRelationship = removeRelationship;
function addPredicate(payload) {
    return {
        type: exports.ADD_PREDICATE,
        payload: payload
    };
}
exports.addPredicate = addPredicate;
function removePredicate(id) {
    return {
        type: exports.REMOVE_PREDICATE,
        payload: { id: id }
    };
}
exports.removePredicate = removePredicate;
function addReturn(payload) {
    return {
        type: exports.ADD_RETURN,
        payload: payload
    };
}
exports.addReturn = addReturn;
function removeReturn(id) {
    return {
        type: exports.REMOVE_RETURN,
        payload: { id: id }
    };
}
exports.removeReturn = removeReturn;
