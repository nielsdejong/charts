"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
function InitialNodeSelector(props) {
    var labels = props.labels;
    var dispatch = react_redux_1.useDispatch();
    var handleButtonClick = function (label) { return dispatch(actions_1.addNode(label)); };
    return react_1.default.createElement("div", { className: "flex flex-col h-full flex-grow justify-between" },
        react_1.default.createElement("div", { className: "flex flex-col h-full justify-center align-center" },
            react_1.default.createElement("div", { className: "bg-gray-200 p-4 rounded-md w-auto justify-center mx-auto", style: { maxWidth: '320px' } },
                react_1.default.createElement("p", { className: "font-bold mb-8" }, "Which label would you like to start the query from?"),
                labels.map(function (label) { return react_1.default.createElement("button", { key: label.label, onClick: function () { return handleButtonClick(label.label); }, className: "bg-gray-100 text-gray-700 rounded-full px-4 py-2 mb-2 font-bold mr-2" },
                    label.label,
                    react_1.default.createElement("span", { className: "bg-gray-200 text-gray-500 px-2 py-1 inline-block ml-2 text-sm rounded-full" },
                        "(",
                        label.count,
                        ")")); }))));
}
exports.default = InitialNodeSelector;
