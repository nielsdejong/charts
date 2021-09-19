"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function MetricReport(props) {
    var first = props.first;
    var key = first.keys[0];
    var number = first.get(key);
    if (typeof number.toNumber === 'function')
        number = number.toNumber();
    var count = react_1.default.createElement("span", { style: { fontSize: '6em' } }, number);
    return (react_1.default.createElement("div", { className: "text-blue-600 leading-none pt-2" }, count));
}
exports.default = MetricReport;
