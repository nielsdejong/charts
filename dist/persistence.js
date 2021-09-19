"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var desktop_1 = require("./desktop");
var store_1 = __importDefault(require("./store"));
var actions_1 = require("./store/actions");
exports.DASHBOARD_LOCAL_STORAGE_KEY = 'dashboards';
exports.QUERIES_LOCAL_STORAGE_KEY = 'queries';
var DASHBOARD_FILE = 'charts-dashboards.json';
var QUERIES_FILE = 'charts-queries.json';
function saveDashboards(state) {
    if (desktop_1.relateApiToken) {
        desktop_1.saveFile(DASHBOARD_FILE, JSON.stringify(state));
    }
    window.localStorage.setItem(exports.DASHBOARD_LOCAL_STORAGE_KEY, JSON.stringify(state));
    return state;
}
exports.saveDashboards = saveDashboards;
function saveQueries(state) {
    if (desktop_1.relateApiToken) {
        desktop_1.saveFile(QUERIES_FILE, JSON.stringify(state));
    }
    window.localStorage.setItem(exports.QUERIES_LOCAL_STORAGE_KEY, JSON.stringify(state));
    return state;
}
exports.saveQueries = saveQueries;
function getDashboardDataFromLocalStorage() {
    var raw = window.localStorage.getItem(exports.DASHBOARD_LOCAL_STORAGE_KEY);
    if (raw === null) {
        return Promise.resolve({
            dashboards: [],
            reports: [],
        });
    }
    return Promise.resolve(JSON.parse(raw));
}
function getDashboardDataFromDesktop(files) {
    var dashboardsFile = files.find(function (file) { return file.name === DASHBOARD_FILE; });
    if (!dashboardsFile) {
        return getDashboardDataFromLocalStorage();
    }
    return desktop_1.getFileContentsAsJson(dashboardsFile.name, dashboardsFile.downloadToken)
        .catch(function (e) {
        console.log("Error loading " + DASHBOARD_FILE + ", using default state");
        console.log(e);
        return {
            dashboards: [],
            reports: [],
        };
    });
}
function getQueryDataFromDesktop(files) {
    var queriesFile = files.find(function (file) { return file.name === QUERIES_FILE; });
    if (!queriesFile) {
        return Promise.resolve([]);
    }
    return desktop_1.getFileContentsAsJson(queriesFile.name, queriesFile.downloadToken)
        .catch(function (e) {
        console.log("Error loading " + QUERIES_FILE + ", using default");
        console.log(e);
        return {
            dashboards: [],
            reports: [],
        };
    });
}
function getStateFromDesktop() {
    return desktop_1.getProjectFiles()
        .then(function (files) {
        return Promise.all([
            getDashboardDataFromDesktop(files),
            getQueryDataFromDesktop(files),
        ]);
    })
        .then(function (_a) {
        var dashboardData = _a[0], queries = _a[1];
        return ({
            dashboards: dashboardData ? dashboardData.dashboards : [],
            reports: dashboardData ? dashboardData.reports : [],
            queries: queries || []
        });
    })
        .catch(function (e) {
        console.log('Error loading state from Neo4j Desktop', e);
        return getStateFromLocalStorage();
    });
}
function getStateFromLocalStorage() {
    var _a = JSON.parse(window.localStorage.getItem(exports.DASHBOARD_LOCAL_STORAGE_KEY) || '{"dashboards":[],"reports":[]}'), dashboards = _a.dashboards, reports = _a.reports;
    var queries = JSON.parse(window.localStorage.getItem(exports.QUERIES_LOCAL_STORAGE_KEY) || '[]');
    return Promise.resolve({ dashboards: dashboards, reports: reports, queries: queries });
}
function getInitialState() {
    if (desktop_1.relateApiToken) {
        getStateFromDesktop()
            .then(function (state) {
            console.log('state from', state);
            store_1.default.dispatch(actions_1.init(state.dashboards, state.reports, state.queries));
        });
    }
    else {
        getStateFromLocalStorage()
            .then(function (state) { return store_1.default.dispatch(actions_1.init(state.dashboards, state.reports, state.queries)); });
    }
}
exports.getInitialState = getInitialState;
