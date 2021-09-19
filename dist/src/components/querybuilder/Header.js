"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../store/actions");
var Loading_1 = __importDefault(require("../Loading"));
function QueryHeader() {
    var dispatch = react_redux_1.useDispatch();
    var currentQuery = react_redux_1.useSelector(function (state) { return state.currentQuery; });
    if (!currentQuery) {
        return react_1.default.createElement(Loading_1.default, null);
    }
    var setUpdatedName = function (name) { return dispatch(actions_1.setName(name)); };
    var handleUpdateQueryClick = function () {
        dispatch(actions_1.updateQuery(currentQuery));
    };
    var handleDeleteClick = function () {
        // eslint-disable-next-line
        if (confirm('Are you sure you want to delete this query?')) {
            dispatch(actions_1.deleteQuery(currentQuery.id));
        }
    };
    return (react_1.default.createElement("div", { className: "query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4" },
        react_1.default.createElement("div", { className: "flex justify-top flex-grow-0 mr-2 py-2" },
            react_1.default.createElement(react_router_dom_1.Link, { className: "block bg-transparent font-bold focus:outline-none", to: "/queries" },
                react_1.default.createElement("span", { className: "text-blue-600 mr-2" }, "Queries"),
                react_1.default.createElement("span", { className: "text-gray-400" }, " / "))),
        react_1.default.createElement("div", { className: "flex flex-grow justify-top" },
            react_1.default.createElement("input", { className: "bg-transparent font-bold focus:outline-none border-b border-transparent focus:border-blue-400 w-full", type: "text", value: currentQuery.name, onChange: function (e) { return setUpdatedName(e.target.value); } })),
        react_1.default.createElement("div", { className: "flex flex-row" },
            currentQuery.savedAt && react_1.default.createElement("div", { className: "p-2 text-gray-500 text-italic text-sm" },
                "Last saved ",
                currentQuery.savedAt.toString()),
            react_1.default.createElement("button", { className: "px-4 py-1 rounded-md border border-red-600 text-red-600 text-sm ml-2", onClick: handleDeleteClick }, "Delete Query"),
            react_1.default.createElement("button", { className: "px-4 py-1 rounded-md border border-blue-600 bg-blue-600 text-white font-bold text-sm ml-2", onClick: handleUpdateQueryClick }, "Save Changes"))));
}
exports.default = QueryHeader;
