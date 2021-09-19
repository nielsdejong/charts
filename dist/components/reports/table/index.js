"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function TableReport(props) {
    var records = props.records, first = props.first;
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", { className: "bg-gray-100" }, first && first.keys.map(function (key) { return react_1.default.createElement("th", { className: "px-2 py-4 text-left", key: key }, key); }))),
        react_1.default.createElement("tbody", null, records.map(function (row, index) { return react_1.default.createElement("tr", { key: index }, row.keys.map(function (key) { var _a; return react_1.default.createElement("td", { className: "px-2 py-4 text-left", key: key + index }, (_a = row.get(key)) === null || _a === void 0 ? void 0 : _a.toString()); })); }))));
}
exports.default = TableReport;
