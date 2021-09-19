"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var use_neo4j_1 = require("use-neo4j");
var actions_1 = require("../../store/actions");
var button_1 = __importDefault(require("../forms/button"));
var modal_1 = __importDefault(require("../modal"));
function ImportFromNeo4j(props) {
    var _a = use_neo4j_1.useReadCypher("MATCH (c:_Charts) RETURN c"), loading = _a.loading, first = _a.first, error = _a.error;
    var dispatch = react_redux_1.useDispatch();
    if (loading) {
        return (react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-400 bg-opacity-75 flex flex-col justify-center z-20" }, "Loading configuration..."));
    }
    if (!loading && !first) {
        return (react_1.default.createElement(modal_1.default, { title: "Import from Neo4j", onClose: props.onClose },
            react_1.default.createElement("div", { className: "mb-12" },
                react_1.default.createElement("p", { className: "mb-4" }, "We couldn't find a dashboard layout in the current database."),
                react_1.default.createElement("p", { className: "mb-4" },
                    "A configration would be stored in a ",
                    react_1.default.createElement("code", null, "(:_Charts)"),
                    " node.")),
            react_1.default.createElement("div", { className: "pt-4 mt-4 border-t border-gray-400" },
                react_1.default.createElement(button_1.default, { size: "md", colour: "red", text: 'Close', onClick: props.onClose }))));
    }
    var onButtonClick = function () {
        var object = JSON.parse(first.get('c').properties.config);
        var _a = object.dashboards, dashboards = _a === void 0 ? [] : _a, _b = object.reports, reports = _b === void 0 ? [] : _b, _c = object.queries, queries = _c === void 0 ? [] : _c;
        dispatch(actions_1.init(dashboards, reports, queries));
        props.onClose();
    };
    return (react_1.default.createElement(modal_1.default, { title: "Import from Neo4j", onClose: props.onClose },
        react_1.default.createElement("div", { className: "mb-12" },
            react_1.default.createElement("p", { className: "mb-4" },
                "Are you sure you want to load a new layout from the",
                react_1.default.createElement("br", null),
                react_1.default.createElement("code", null, "(:_Charts)"),
                " node in the current database?"),
            react_1.default.createElement("p", { className: "mb-4" }, "This will override the current layout and any queries.")),
        react_1.default.createElement("div", { className: "pt-4 mt-4 border-t border-gray-400" },
            react_1.default.createElement(button_1.default, { size: "md", colour: "blue", text: 'Load from current connection', onClick: onButtonClick }),
            ' ',
            react_1.default.createElement(button_1.default, { size: "md", colour: "red", text: 'Close', onClick: props.onClose }))));
}
exports.default = ImportFromNeo4j;
