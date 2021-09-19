"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Modal(props) {
    return (react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-400 bg-opacity-75 flex flex-col justify-center z-20" },
        react_1.default.createElement("div", { className: "modal-underlay fixed inset-0 bg-gray-400 bg-opacity-75", onClick: props.onClose }),
        react_1.default.createElement("div", { className: "flex flex-row justify-center z-20" },
            react_1.default.createElement("div", { className: "bg-white rounded-lg shadow-lg overflow-y-auto", style: { minWidth: '480px', maxHeight: '90vh' } },
                react_1.default.createElement("div", { className: "flex flex-row justify-between m-4 mb-0 pb-2 text-gray-600 font-bold border-b border-gray-400" },
                    props.title && react_1.default.createElement("h2", null, props.title),
                    react_1.default.createElement("button", { className: "text-lg text-gray-400 focus:outline-none", onClick: props.onClose }, "x")),
                react_1.default.createElement("div", { className: "p-4 rounded-lg shadow-lg" }, props.children)))));
}
exports.default = Modal;
