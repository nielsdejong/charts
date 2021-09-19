"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Column(_a) {
    var columns = _a.columns, children = _a.children;
    var classes = 'p-2 w-full';
    if (columns === 1) {
        classes += ' sm:w-1/2 md:w-1/4';
    }
    else if (columns === 2) {
        classes += ' md:w-2/4';
    }
    else if (columns === 3) {
        classes += ' lg:w-3/4';
    }
    return (react_1.default.createElement("div", { className: classes }, children));
}
exports.default = Column;
