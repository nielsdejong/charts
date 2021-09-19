"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/actions");
var querybuilder_1 = __importDefault(require("../components/querybuilder"));
var use_neo4j_1 = require("use-neo4j");
function QueryEditor(_a) {
    var match = _a.match;
    var _b = use_neo4j_1.useSchema(), loading = _b.loading, labels = _b.labels, types = _b.types;
    var dispatch = react_redux_1.useDispatch();
    var query = react_redux_1.useSelector(function (state) { return state.queries.find(function (query) { return query.id === match.params.id; }); });
    react_1.useEffect(function () {
        if (query)
            dispatch(actions_1.loadQuery(query));
    }, [query]);
    if (!query) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    if (loading || !query) {
        return (react_1.default.createElement("div", { className: "flex flex-col h-screen" },
            react_1.default.createElement("div", { className: "flex flex-col h-full justify-center align-center" },
                react_1.default.createElement("div", { className: "bg-gray-200 p-4 rounded-md w-auto justify-center mx-auto text-center", style: { width: '200px' } },
                    react_1.default.createElement("p", { className: "font-bold mb-4" }, "Loading Schema...")))));
    }
    return react_1.default.createElement(querybuilder_1.default, { labels: labels, types: types });
}
exports.default = QueryEditor;
