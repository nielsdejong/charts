"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var network_1 = require("@nivo/network");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
var Loading_1 = __importDefault(require("../Loading"));
function NetworkReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['from', 'to']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var nodes = records.reduce(function (acc, row) {
        var from = utils_1.recordToNative(row.get('from'));
        var to = utils_1.recordToNative(row.get('to'));
        if (acc.findIndex(function (row) { return row.id === from; }) === -1) {
            acc = acc.concat({
                id: from,
                radius: 10,
                depth: 1,
                color: "rgb(97, 205, 187)"
            });
        }
        if (acc.findIndex(function (row) { return row.id === to; }) === -1) {
            acc = acc.concat({
                id: to,
                radius: 10,
                depth: 1,
                color: "rgb(97, 205, 187)"
            });
        }
        return acc;
    }, []);
    var links = records.map(function (row) { return ({
        source: utils_1.recordToNative(row.get('from')),
        target: utils_1.recordToNative(row.get('to')),
    }); }, []);
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(network_1.ResponsiveNetwork
        // @ts-ignore
        , { 
            // @ts-ignore
            nodes: nodes, links: links, 
            // margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            repulsivity: 6, iterations: 60, nodeColor: function (e) { return e.color || 'rgba(215, 100, 69, 1)'; }, nodeBorderWidth: 1, nodeBorderColor: { from: 'color', modifiers: [['darker', 0.4]] }, 
            // // linkThickness={function(e){return Math.max(2*(2-e.source.depth), 1)}}
            // linkThickness={2}
            motionStiffness: 160, motionDamping: 12, distanceMin: 10, distanceMax: 50 })));
}
exports.default = NetworkReport;
