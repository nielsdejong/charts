"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var calendar_1 = require("@nivo/calendar");
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function CalendarReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['day', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var data = records.map(function (row) { return ({
        day: row.get('day').toString(),
        value: utils_1.recordToNative(row.get('value')),
    }); }).sort(function (a, b) { return a.day < b.day ? -1 : 1; });
    var from = data[0].day;
    var to = data[data.length - 1].day;
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(calendar_1.ResponsiveCalendar, { data: data, from: from, to: to, margin: { top: 12, right: 24, bottom: 12, left: 24 }, monthBorderColor: "#ffffff", dayBorderWidth: 2, dayBorderColor: "#ffffff" })));
}
exports.default = CalendarReport;
