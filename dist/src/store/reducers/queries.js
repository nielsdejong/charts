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
function queriesReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.APP_INIT:
            return action.payload.queries;
        case actions_1.ADD_QUERY:
            state = state.concat(__assign({ id: uuid_1.v4(), name: 'Untitled Query', nodes: [], relationships: [], predicates: [], output: [] }, action.payload));
            return persistence_1.saveQueries(state);
        case actions_1.UPDATE_QUERY:
            state = state.filter(function (query) { return query.id !== action.payload.id; })
                .concat(__assign(__assign({}, action.payload), { updated: false, savedAt: new Date() }));
            return persistence_1.saveQueries(state);
        case actions_1.DELETE_QUERY:
            state = state.filter(function (query) { return query.id !== action.payload.id; });
            return persistence_1.saveQueries(state);
    }
    return state;
}
exports.default = queriesReducer;
