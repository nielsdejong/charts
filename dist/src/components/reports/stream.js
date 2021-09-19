"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var stream_1 = require("@nivo/stream");
var utils_1 = require("../../utils");
function StreamReport(props) {
    var records = props.records, first = props.first;
    var keys = first.keys;
    var data = records.map(function (row) { return Object.fromEntries(row.keys.map(function (key) { return [key, utils_1.recordToNative(row.get(key))]; })); });
    return (react_1.default.createElement(stream_1.ResponsiveStream, { data: data, keys: keys, margin: { top: 24, left: 0, right: 0, bottom: 24 }, axisBottom: null }));
}
exports.default = StreamReport;
