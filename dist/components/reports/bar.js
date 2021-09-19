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
var bar_1 = require("@nivo/bar");
var utils_1 = require("../../utils");
var error_1 = __importDefault(require("./error"));
var Loading_1 = __importDefault(require("../Loading"));
function BarReport(props) {
    var records = props.records, first = props.first;
    if (!first) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var error = utils_1.checkResultKeys(first, ['index', 'key', 'value']);
    if (error !== false) {
        return react_1.default.createElement(error_1.default, { error: error });
    }
    var keys = [];
    var data = records.reduce(function (data, row) {
        var _a;
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
    return react_1.default.createElement(bar_1.ResponsiveBar, __assign({ layout: props.layout, groupMode: props.stacked ? 'stacked' : 'grouped', data: data, keys: keys, indexBy: "index", margin: { top: 24, right: 128, bottom: 38, left: 36 }, padding: 0.3, valueScale: { type: 'linear' }, colors: { scheme: 'nivo' }, axisTop: null, axisRight: null, axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }, axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }, labelSkipWidth: 12, labelSkipHeight: 12, labelTextColor: { from: 'color', modifiers: [['darker', 1.6]] }, legends: [
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'right-to-left',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ], animate: false, motionStiffness: 90, motionDamping: 15 }, props.config));
}
exports.default = BarReport;
