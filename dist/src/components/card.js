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
var react_router_dom_1 = require("react-router-dom");
var tab_1 = __importDefault(require("./tab"));
function Card(props) {
    var _a, _b;
    var handleTitleClick = function () {
        props.onTitleClick && props.onTitleClick();
    };
    var titleClasses = "card-title text-xl text-gray-700 font-bold pb-4 cursor-pointer border-b-2 " + (props.titleActive ? 'border-blue-600' : 'border-transparent');
    var cardClasses = "card bg-white  p-4";
    var containerClasses = "container flex flex-col overflow-auto text-gray-600";
    if (props.expanded) {
        cardClasses += " absolute inset-0 z-20";
        containerClasses += " h-full";
    }
    else {
        cardClasses += " shadow-sm rounded-md";
        containerClasses += " h-64";
    }
    return (react_1.default.createElement("div", { className: cardClasses },
        react_1.default.createElement("div", { className: "card-header border-b border-gray-200 pt-2 flex flex-row align-baseline mb-2" },
            react_1.default.createElement("h1", { className: titleClasses, onClick: handleTitleClick }, props.title),
            react_1.default.createElement("div", { className: "card-spacer flex-grow" }), (_a = props.tabs) === null || _a === void 0 ? void 0 :
            _a.map(function (tab, index) { return react_1.default.createElement(tab_1.default, __assign({ key: index }, tab)); })),
        react_1.default.createElement("div", { className: containerClasses }, props.children),
        ((_b = props.actions) === null || _b === void 0 ? void 0 : _b.length) && react_1.default.createElement("div", { className: "flex flex-grow-0 justify-end border-t border-gray-200 pt-3" }, props.actions.map(function (action) { return react_1.default.createElement(react_router_dom_1.Link, { key: action.text, to: action.to, className: "px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100" }, action.text); }))));
}
exports.default = Card;
