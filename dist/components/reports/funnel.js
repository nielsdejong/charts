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
var funnel_1 = require("@nivo/funnel");
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function FunnelReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['id', 'value', 'label']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var data = records.map(function (row) { return ({
        id: utils_1.recordToNative(row.get('id')),
        value: utils_1.recordToNative(row.get('value')),
        label: utils_1.recordToNative(row.get('label')),
    }); });
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(funnel_1.ResponsiveFunnel, __assign({ data: data, margin: { top: 20, right: 0, bottom: 20, left: 0 }, direction: props.layout || 'vertical', colors: { scheme: 'nivo' }, borderWidth: 20, labelColor: { from: 'color', modifiers: [['darker', 3]] }, beforeSeparatorLength: 24, beforeSeparatorOffset: 20, afterSeparatorLength: 24, afterSeparatorOffset: 20, currentPartSizeExtension: 10, currentBorderWidth: 30 }, props.config))));
}
exports.default = FunnelReport;
