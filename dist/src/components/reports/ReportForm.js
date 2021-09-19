"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var constants_1 = require("../../constants");
var button_1 = __importDefault(require("../forms/button"));
function ReportForm(_a) {
    var dashboard = _a.dashboard, report = _a.report, submitText = _a.submitText, onSubmit = _a.onSubmit;
    var queries = react_redux_1.useSelector(function (state) { return state.queries; });
    var _b = react_1.useState(report.name || ''), name = _b[0], setName = _b[1];
    var _c = react_1.useState(report.columns || 1), columns = _c[0], setColumns = _c[1];
    var _d = react_1.useState(report.rows || 1), rows = _d[0], setRows = _d[1];
    var _e = react_1.useState(report.type || constants_1.reportTypes[0].value), type = _e[0], setType = _e[1];
    var _f = react_1.useState(report.source || constants_1.reportSources[0].value), source = _f[0], setSource = _f[1];
    var _g = react_1.useState(report.query || ''), query = _g[0], setQuery = _g[1];
    var _h = react_1.useState(report.database || ''), database = _h[0], setDatabase = _h[1];
    var handleSubmit = function () {
        // Validate Query Type
        if (name === '' || query === '' || (source === 'query' && !queries.find(function (q) { return q.id === query; })) || !parseInt(rows.toString()) || !parseInt(columns.toString())) {
            console.log('invalid payload');
            return;
        }
        onSubmit(dashboard, name, database, type, source, query, columns, rows);
    };
    return (react_1.default.createElement("form", { className: "pr-2" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "name", className: "block font-bold m-2" }, "Name"),
            react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", id: "name", type: "text", value: name, onChange: function (e) { return setName(e.target.value); } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "type", className: "block font-bold m-2" }, "Type"),
            react_1.default.createElement("select", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", id: "type", value: type, onChange: function (e) { return setType(e.target.value); } }, constants_1.reportTypes.map(function (type) { return react_1.default.createElement("option", { key: type.key, value: type.value }, type.text); })),
            react_1.default.createElement("div", { className: "p-2 mb-2 text-gray-600 text-sm" }, constants_1.getHint(type))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "database", className: "block font-bold m-2" }, "Database"),
            react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", id: "database", type: "text", placeholder: "(Default database)", value: database, onChange: function (e) { return setDatabase(e.target.value); } }),
            react_1.default.createElement("div", { className: "p-2 mb-2 text-gray-600 text-sm" }, "Leave blank to use the default database.")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "columns", className: "block font-bold m-2" }, "Columns"),
            react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", id: "columns", type: "number", min: 1, max: 4, value: columns, onChange: function (e) { return setColumns(parseInt(e.target.value) || ''); } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "source", className: "block font-bold m-2" }, "Source"),
            react_1.default.createElement("select", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", id: "source", value: source, onChange: function (e) { return setSource(e.target.value); } }, constants_1.reportSources.map(function (source) { return react_1.default.createElement("option", { key: source.key, value: source.value }, source.text); }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "query", className: "block font-bold m-2" }, "Query"),
            source === 'cypher' && react_1.default.createElement("textarea", { className: "w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600 font-mono focus:outline-none focus:border-blue-600", id: "query", rows: 8, value: query, onChange: function (e) { return setQuery(e.target.value); } }),
            source === 'query' && react_1.default.createElement("select", { className: "w-full rounded-sm p-2 border border-gray-400 bg-white text-gray-600", value: query, onChange: function (e) { return setQuery(e.target.value); } },
                react_1.default.createElement("option", null),
                queries.map(function (query) { return react_1.default.createElement("option", { key: query.id, value: query.id }, query.name); })),
            source === 'query' && queries.find(function (q) { return query === q.id; }) && react_1.default.createElement(react_router_dom_1.Link, { className: "mt-2 px-2 text-xs text-blue-600", to: "/queries/" + query }, "Edit Query")),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(button_1.default, { onClick: handleSubmit, text: submitText }))));
}
exports.default = ReportForm;
