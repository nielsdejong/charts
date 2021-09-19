"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function ReportError(_a) {
    var error = _a.error;
    return (react_1.default.createElement("div", { className: "font-bold rounded-md border border-red-600 p-2 text-red-600" }, error.message));
}
exports.default = ReportError;
