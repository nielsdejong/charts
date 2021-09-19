"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var circle_packing_1 = require("@nivo/circle-packing");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
var Loading_1 = __importDefault(require("../Loading"));
function BubbleReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['from', 'to', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var hierarchy = records.reduce(function (hierarchy, row) {
        var from = utils_1.recordToNative(row.get('from'));
        var to = utils_1.recordToNative(row.get('to'));
        var value = utils_1.recordToNative(row.get('value')) || 1;
        var color = row.keys.includes('color') || 'red'
            ? utils_1.recordToNative(row.get('value'))
            : null;
        var fromIndex = hierarchy.findIndex(function (row) { return row.id === from; });
        var toIndex = hierarchy.findIndex(function (row) { return row.id === to; });
        // Append 'from' node and children to the hierarchy
        if (fromIndex === -1) {
            return hierarchy.concat({
                parent: null,
                id: from,
                value: value,
                color: color,
                children: [
                    to
                ]
            });
        }
        // Append 'to' node to hierarchy
        if (toIndex === -1) {
            hierarchy = hierarchy.concat({
                id: to,
                value: value,
                color: color,
                parent: from,
                children: []
            });
        }
        // Push the child into the hierarchy
        hierarchy[fromIndex].children.push(to);
        return hierarchy;
    }, []);
    var buildTree = function (id) {
        var _a, _b, _c, _d, _e, _f;
        if (!id)
            return {};
        var node = hierarchy.find(function (row) { return row.id === id; });
        if (!node) {
            return { id: id };
        }
        return {
            id: (_a = node) === null || _a === void 0 ? void 0 : _a.id,
            name: (_b = node) === null || _b === void 0 ? void 0 : _b.id,
            value: (_c = node) === null || _c === void 0 ? void 0 : _c.value,
            color: (_d = node) === null || _d === void 0 ? void 0 : _d.color,
            children: (_f = (_e = node) === null || _e === void 0 ? void 0 : _e.children) === null || _f === void 0 ? void 0 : _f.map(function (child) { return buildTree(child); })
        };
    };
    var rootNode = hierarchy.find(function (node) { return node.parent === null; });
    var root = buildTree(rootNode.id);
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(circle_packing_1.ResponsiveBubble, { root: root, margin: { top: 12, right: 12, bottom: 12, left: 12 }, identity: "id", value: "value", colors: { scheme: 'nivo' }, padding: 6, labelTextColor: { from: 'color', modifiers: [['darker', 0.8]] }, borderWidth: 1, borderColor: { from: 'color' }, fill: [{ match: { depth: 1 }, id: 'lines' }], animate: false, motionStiffness: 90, motionDamping: 12 })));
}
exports.default = BubbleReport;
