"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var currentQuery_1 = __importDefault(require("./reducers/currentQuery"));
var queries_1 = __importDefault(require("./reducers/queries"));
var dashboards_1 = __importDefault(require("./reducers/dashboards"));
var rootReducer = redux_1.combineReducers({
    queries: queries_1.default,
    currentQuery: currentQuery_1.default,
    dashboards: dashboards_1.default,
});
exports.default = redux_1.createStore(rootReducer);
