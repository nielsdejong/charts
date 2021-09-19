"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var button_1 = __importDefault(require("./forms/button"));
function ColdStart(_a) {
    var title = _a.title, buttonText = _a.buttonText, children = _a.children, onButtonClick = _a.onButtonClick;
    return (react_1.default.createElement("div", { className: "flex flex-col w-full" },
        react_1.default.createElement("div", { className: "p-12 bg-white w-auto m-auto" },
            react_1.default.createElement("h2", { className: "font-bold text-xl text-center text-blue-600" }, title),
            children,
            react_1.default.createElement("div", { className: "text-center" },
                react_1.default.createElement(button_1.default, { size: "md", colour: "blue", text: buttonText, onClick: onButtonClick })))));
}
exports.default = ColdStart;
