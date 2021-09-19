"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var chord_1 = require("@nivo/chord");
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function ChordReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['from', 'to', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var data = records.reduce(function (acc, row) {
        var from = utils_1.recordToNative(row.get('from'));
        var to = utils_1.recordToNative(row.get('to'));
        var value = utils_1.recordToNative(row.get('value'));
        var fromIndex = acc.findIndex(function (row) { return row.id === from; });
        var toIndex = acc.findIndex(function (row) { return row.id === from; });
        if (toIndex === -1) {
            acc.concat({
                id: to,
                amounts: []
            });
        }
        if (fromIndex === -1) {
            return acc.concat({
                id: from,
                amounts: [
                    { to: to, value: value }
                ]
            });
        }
        acc[fromIndex].amounts.push({ to: to, value: value });
        return acc;
    }, []);
    var keys = data.map(function (data) { return data.id; });
    var matrix = data.map(function (from) {
        return keys.map(function (key) { var _a; return ((_a = from.amounts.find(function (row) { return row.to === key; })) === null || _a === void 0 ? void 0 : _a.value) || 0; });
    });
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(chord_1.ResponsiveChord, { layers: ['ribbons', 'arcs'], matrix: matrix, keys: keys, margin: { top: 12, right: 12, bottom: 12, left: 12 }, valueFormat: ".2f", padAngle: 0.02, innerRadiusRatio: 0.96, innerRadiusOffset: 0.02, arcOpacity: 1, arcBorderWidth: 1, arcBorderColor: { from: 'color', modifiers: [['darker', 0.4]] }, ribbonOpacity: 0.5, ribbonBorderWidth: 1, enableLabel: true, label: "id", labelOffset: 12, labelRotation: -90, labelTextColor: { from: 'color', modifiers: [['darker', 1]] }, colors: { scheme: 'nivo' }, isInteractive: true, arcHoverOpacity: 1, arcHoverOthersOpacity: 0.25, ribbonHoverOpacity: 0.75, ribbonHoverOthersOpacity: 0.25, animate: false, motionStiffness: 90, motionDamping: 7 })));
}
exports.default = ChordReport;
