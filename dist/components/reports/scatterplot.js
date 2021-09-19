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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var scatterplot_1 = require("@nivo/scatterplot");
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function ScatterPlotReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['id', 'x', 'y']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var data = records.map(function (row) { return ({
        id: utils_1.recordToNative(row.get('id')),
        x: utils_1.recordToNative(row.get('x')),
        y: utils_1.recordToNative(row.get('y')),
    }); })
        .reduce(function (acc, row) {
        var index = acc.findIndex(function (item) { return item.id === row.id; });
        if (index === -1) {
            return acc.concat({
                id: row.id,
                data: [{ x: row.x, y: row.y }]
            });
        }
        acc[index].data.push({ x: row.x, y: row.y });
        acc[index].data.sort(function (a, b) { return a.x > b.x ? -1 : 1; });
        return acc;
    }, []);
    return (react_1.default.createElement(scatterplot_1.ResponsiveScatterPlot, __assign({ data: data, margin: { top: 24, right: 24, bottom: 38, left: 32 } }, props.config)));
}
exports.default = ScatterPlotReport;
