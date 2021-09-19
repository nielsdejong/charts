"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var sankey_1 = require("@nivo/sankey");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
var Loading_1 = __importDefault(require("../Loading"));
function SankeyReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['from', 'to', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var nodes = records.reduce(function (acc, row) {
        var from = utils_1.recordToNative(row.get('from'));
        var to = utils_1.recordToNative(row.get('to'));
        if (acc.findIndex(function (row) { return row.id === from; }) === -1) {
            acc = acc.concat({
                id: from,
            });
        }
        if (acc.findIndex(function (row) { return row.id === to; }) === -1) {
            acc = acc.concat({
                id: to,
            });
        }
        return acc;
    }, []);
    var links = records.map(function (row) { return ({
        source: utils_1.recordToNative(row.get('from')),
        target: utils_1.recordToNative(row.get('to')),
        value: utils_1.recordToNative(row.get('value'))
    }); }, [])
        .filter(function (row) { return row.source !== row.target; });
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(sankey_1.ResponsiveSankey, { data: { nodes: nodes, links: links }, margin: { top: 12, right: 0, bottom: 0, left: 0 }, animate: false, align: "justify", 
            // @ts-ignore
            layout: props.layout || 'horizontal', nodeOpacity: 1, nodeThickness: 8, nodeInnerPadding: 0, nodeSpacing: 4, nodeBorderWidth: 0, nodeBorderColor: { from: 'color', modifiers: [['darker', 0.8]] }, linkOpacity: 0.5, linkHoverOthersOpacity: 0.1, enableLinkGradient: true, labelPosition: "inside", labelOrientation: "vertical", labelPadding: 8, labelTextColor: { from: 'color', modifiers: [['darker', 1]] } })));
}
exports.default = SankeyReport;
