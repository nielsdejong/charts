"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var button_1 = __importDefault(require("./forms/button"));
function Header(props) {
    var sectionText = props.sectionText, sectionLink = props.sectionLink, pageTitle = props.pageTitle, buttons = props.buttons, savedAt = props.savedAt, children = props.children;
    return (react_1.default.createElement("div", { className: "query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4" },
        react_1.default.createElement("div", { className: "flex justify-top flex-grow-0 mr-2 py-2" },
            react_1.default.createElement(react_router_dom_1.Link, { className: "block bg-transparent font-bold focus:outline-none", to: sectionLink },
                react_1.default.createElement("span", { className: "text-blue-600 mr-2" }, sectionText),
                pageTitle && react_1.default.createElement("span", { className: "text-gray-400" }, " / "))),
        react_1.default.createElement("div", { className: "flex justify-top font-bold py-2" }, pageTitle),
        children,
        react_1.default.createElement("div", { className: "flex flex-grow" }),
        react_1.default.createElement("div", { className: "ml-2 flex flex-row" },
            savedAt && react_1.default.createElement("div", { className: "p-2 text-gray-500 text-italic text-sm" },
                "Last saved ",
                savedAt.toString()),
            buttons && buttons.map(function (button) { return react_1.default.createElement("div", { className: "ml-2", key: button.text },
                react_1.default.createElement(button_1.default, { size: "sm", colour: button.colour || 'blue', text: button.text, onClick: button.onClick })); }))));
}
exports.default = Header;
