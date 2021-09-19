"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Graph_1 = __importDefault(require("../Graph"));
var InitialNodeSelector_1 = __importDefault(require("./InitialNodeSelector"));
var Toolbar_1 = __importDefault(require("./Toolbar"));
var react_redux_1 = require("react-redux");
var Header_1 = __importDefault(require("./Header"));
function QueryEditorForm(_a) {
    var labels = _a.labels, types = _a.types;
    var nodes = react_redux_1.useSelector(function (state) { return state.currentQuery.nodes; });
    var selected = react_redux_1.useSelector(function (state) { return state.currentQuery.selected; });
    var graph = react_1.default.createElement(InitialNodeSelector_1.default, { labels: labels });
    if (nodes.length) {
        graph = react_1.default.createElement(Graph_1.default, null);
    }
    return (react_1.default.createElement("div", { className: "query-stage flex flex-col w-full h-full" },
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", { className: "query-stage flex flex-grow-1 h-full flex-row bg-gray-100" },
            graph,
            selected && react_1.default.createElement(Toolbar_1.default, { labels: labels, types: types }))));
}
exports.default = QueryEditorForm;
