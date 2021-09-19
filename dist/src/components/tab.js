"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Tab(props) {
    var classes = 'card-tab border-b-2 pb-2 text-sm focus:outline-none ';
    if (props.active) {
        classes += 'text-blue-800 border-blue-600';
    }
    else {
        classes += 'text-gray-600 border-transparent';
    }
    return (react_1.default.createElement("div", { className: "flex flex-row justify-baseline ml-2" },
        props.text && react_1.default.createElement("button", { className: classes, onClick: props.onClick }, props.text),
        props.children));
}
exports.default = Tab;
