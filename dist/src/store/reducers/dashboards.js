"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var persistence_1 = require("../../persistence");
var actions_1 = require("../actions");
function deleteReport(id) {
    return {
        type: actions_1.DELETE_REPORT,
        payload: { id: id },
    };
}
exports.deleteReport = deleteReport;
var initialState = { dashboards: [], reports: [], ready: false };
function saveState(state) {
    persistence_1.saveDashboards(state);
    return state;
}
function dashboardsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.APP_INIT:
            state = __assign(__assign({}, state), { dashboards: action.payload.dashboards, reports: action.payload.reports, ready: true });
            return state;
        case actions_1.ADD_DASHBOARD:
            state = __assign(__assign({}, state), { dashboards: state.dashboards.concat(__assign({ id: uuid_1.v4(), savedAt: new Date() }, action.payload)) });
            return saveState(state);
        case actions_1.UPDATE_DASHBOARD:
            state = __assign(__assign({}, state), { dashboards: state.dashboards.filter(function (d) { return d.id !== action.payload.id; }).concat(__assign(__assign({}, action.payload), { savedAt: new Date() })) });
            return saveState(state);
        case actions_1.DELETE_DASHBOARD:
            state = __assign(__assign({}, state), { dashboards: state.dashboards.filter(function (d) { return d.id !== action.payload.id; }), reports: state.reports.filter(function (d) { return d.dashboard !== action.payload.id; }) });
            return saveState(state);
        case actions_1.ADD_REPORT:
            var order = state.reports.filter(function (report) { return report.dashboard === action.payload.dashboard; }).length;
            state = __assign(__assign({}, state), { reports: state.reports.concat(__assign({ id: uuid_1.v4(), savedAt: new Date(), order: order }, action.payload)) });
            return saveState(state);
        case actions_1.UPDATE_REPORT:
            // TODO: Re-order reports around the updated report
            state = __assign(__assign({}, state), { reports: state.reports.filter(function (d) { return d.id !== action.payload.id; }).concat(__assign(__assign({}, action.payload), { savedAt: new Date() })) });
            return saveState(state);
        case actions_1.DELETE_REPORT:
            // TODO: Re-order reports around the deleted report
            state = __assign(__assign({}, state), { reports: state.reports.filter(function (d) { return d.id !== action.payload.id; }) });
            return saveState(state);
        case actions_1.REORDER_REPORTS:
            console.log('reorder reports', action.payload);
            state = __assign(__assign({}, state), { reports: state.reports.map(function (report) {
                    var found = action.payload.reports.find(function (item) { return item.id === report.id; });
                    if (found) {
                        return __assign(__assign({}, report), { order: found.order });
                    }
                    return report;
                }) });
            return saveState(state);
    }
    return state;
}
exports.default = dashboardsReducer;
