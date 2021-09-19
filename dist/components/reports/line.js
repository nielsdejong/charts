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
var line_1 = require("@nivo/line");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
function LineReport(props) {
    var records = props.records, first = props.first;
    var label = first.keys[0];
    var keys = first.keys.slice(1);
    if (!keys.length) {
        return react_1.default.createElement(error_1.default, { error: { message: 'This report was expecting three columns' } });
    }
    var data = keys.map(function (key) { return ({
        // TODO: colour
        id: key,
        data: []
    }); });
    records.forEach(function (row) {
        keys.forEach(function (key) {
            var index = data.findIndex(function (item) { return item.id === key; });
            var x = utils_1.recordToNative(row.get(label)) || 0;
            var y = utils_1.recordToNative(row.get(key)) || 0;
            data[index].data.push({ x: x, y: y });
        });
    });
    return (react_1.default.createElement("div", { className: "h-full w-full overflow-hidden" },
        react_1.default.createElement(line_1.ResponsiveLine, __assign({ data: data, margin: { top: 24, right: 24, bottom: 38, left: 24 }, xScale: { type: 'point' }, yScale: { type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }, curve: "cardinal", yFormat: " >-.0r", enableGridX: false, enableGridY: false, axisTop: null, axisRight: null, axisBottom: {
                orient: 'bottom',
                tickSize: 6,
                tickPadding: 12,
                tickRotation: 0,
            }, axisLeft: null, pointSize: 10, pointColor: "white", pointBorderWidth: 2, pointBorderColor: { from: 'serieColor' }, pointLabelYOffset: -12, useMesh: true, legends: [
                {
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'right-to-left',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 6,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ] }, props.config))));
}
exports.default = LineReport;
