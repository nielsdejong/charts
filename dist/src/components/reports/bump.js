"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var bump_1 = require("@nivo/bump");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
var Loading_1 = __importDefault(require("../Loading"));
function BumpReport(props) {
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
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(bump_1.ResponsiveBump, { data: data, margin: { top: 32, right: 100, bottom: 32, left: 12 }, colors: { scheme: 'spectral' }, pointSize: 10, activePointSize: 16, inactivePointSize: 0, pointColor: { theme: 'background' }, pointBorderWidth: 3, activePointBorderWidth: 3, pointBorderColor: { from: 'serie.color' }, axisTop: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }, axisRight: null, axisBottom: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }, axisLeft: null })));
}
exports.default = BumpReport;
