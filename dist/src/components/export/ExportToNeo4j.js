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
var react_2 = require("react");
var react_3 = require("react");
var react_redux_1 = require("react-redux");
var use_neo4j_1 = require("use-neo4j");
var button_1 = __importDefault(require("../forms/button"));
var modal_1 = __importDefault(require("../modal"));
function ExportToNeo4j(props) {
    var _a = react_3.useState(), confirmation = _a[0], setConfirmation = _a[1];
    var _b = react_3.useState(false), started = _b[0], setStarted = _b[1];
    var _c = use_neo4j_1.useLazyWriteCypher("MERGE (c:_Charts) SET c.config = $json"), save = _c[0], _d = _c[1], loading = _d.loading, error = _d.error;
    var _e = react_3.useState(false), isSaving = _e[0], setIsSaving = _e[1];
    var getState = react_redux_1.useStore().getState;
    var onButtonClick = function () {
        var _a = getState(), dashboards = _a.dashboards, queries = _a.queries;
        var json = JSON.stringify(__assign(__assign({}, dashboards), { queries: queries }));
        setStarted(true);
        save({ json: json });
    };
    react_2.useEffect(function () {
        setIsSaving(loading);
        if (started && !loading && !error) {
            setConfirmation('Dashboard saved!');
        }
        else {
            setConfirmation(undefined);
        }
    }, [loading]);
    return (react_1.default.createElement(modal_1.default, { title: "Save to Neo4j", onClose: props.onClose },
        react_1.default.createElement("div", { className: "mb-12" },
            react_1.default.createElement("p", { className: "mb-4" }, "Are you sure you want to save the current layout to Neo4j?"),
            react_1.default.createElement("p", { className: "mb-4" },
                "This will create or overwrite a node in the current graph with a label ",
                react_1.default.createElement("code", null, "_Charts"),
                ".")),
        react_1.default.createElement("div", { className: "pt-4 mt-4 border-t border-gray-400" },
            react_1.default.createElement(button_1.default, { size: "md", colour: "blue", text: 'Save to Neo4j', onClick: onButtonClick, disabled: isSaving }),
            ' ',
            react_1.default.createElement(button_1.default, { size: "md", colour: "red", text: 'Close', onClick: props.onClose, disabled: isSaving }),
            isSaving && react_1.default.createElement("span", { className: "inline-block ml-2 italic" }, "Saving..."),
            error && react_1.default.createElement("span", { className: "inline-block ml-2 italic text-red-700" }, error.message),
            confirmation && react_1.default.createElement("span", { className: "inline-block ml-2 italic text-green-700" }, confirmation))));
}
exports.default = ExportToNeo4j;
