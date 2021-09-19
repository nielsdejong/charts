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
var radar_1 = require("@nivo/radar");
var utils_1 = require("../../utils");
function RadarReport(props) {
    var records = props.records;
    var keys = [];
    var data = records.reduce(function (data, row) {
        var _a;
        if (!row.has('index'))
            return data;
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
    return (react_1.default.createElement(radar_1.ResponsiveRadar, __assign({ data: data, keys: keys, indexBy: "index", maxValue: "auto", margin: { top: 24, right: 12, bottom: 24, left: 48 }, curve: "linearClosed", borderWidth: 2, borderColor: { from: 'color' }, gridLevels: 5, gridShape: "circular", gridLabelOffset: 36, enableDots: true, dotSize: 10, dotColor: { theme: 'background' }, dotBorderWidth: 2, dotBorderColor: { from: 'color' }, enableDotLabel: true, dotLabel: "value", dotLabelYOffset: -12, colors: { scheme: 'nivo' }, fillOpacity: 0.25, blendMode: "multiply", animate: false, isInteractive: true, legends: [
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -48,
                translateY: -12,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ] }, props.config)));
}
exports.default = RadarReport;
