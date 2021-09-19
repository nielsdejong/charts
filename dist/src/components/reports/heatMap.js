"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var heatmap_1 = require("@nivo/heatmap");
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function HeatMap(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['index', 'key', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var keys = [];
    var data = records.reduce(function (data, row) {
        var _a;
        var index = utils_1.recordToNative(row.get('index'));
        var idx = data.findIndex(function (item) { return item.index === index; });
        var key = utils_1.recordToNative(row.get('key'));
        var value = utils_1.recordToNative(row.get('value'));
        if (!keys.includes(key)) {
            keys.push(key);
        }
        if (idx > -1) {
            data[idx][key] = value;
        }
        else {
            data.push((_a = { index: index }, _a[key] = value, _a));
        }
        return data;
    }, [])
        .map(function (row) {
        keys.forEach(function (key) {
            if (!row.hasOwnProperty(key)) {
                row[key] = 0;
            }
        });
        return row;
    });
    return (react_1.default.createElement(heatmap_1.ResponsiveHeatMap, { data: data, keys: keys, indexBy: "index", margin: { top: 100, right: 60, bottom: 60, left: 60 }, axisTop: { orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36 } }));
}
exports.default = HeatMap;
