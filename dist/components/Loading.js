"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Loading() {
    return (react_1.default.createElement("div", { className: "bg-blue-100 text-blue-800 p-2 h-full w-full" }, "Loading..."));
}
exports.default = Loading;
