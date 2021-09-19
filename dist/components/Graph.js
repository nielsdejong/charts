"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/actions");
var utils_1 = require("../utils");
function TreeRelationship(_a) {
    var relationship = _a.relationship;
    var dispatch = react_redux_1.useDispatch();
    var handleClick = function () { return dispatch(actions_1.selectRelationship(relationship.id)); };
    var handleNodeClick = function () { return dispatch(actions_1.selectNode(relationship.to)); };
    return react_1.default.createElement("li", null,
        react_1.default.createElement("button", { className: "bg-gray-200 text-gray-700 rounded-md px-4 py-2 mb-2 font-bold mr-2 focus:outline-none", onClick: handleClick },
            relationship.direction === 'in' ? '<' : '',
            "-",
            react_1.default.createElement("span", { className: "bg-gray-100 text-gray-500 px-2 py-1 inline-block ml-1" },
                relationship.id,
                ":",
                relationship.type),
            "-",
            relationship.direction === 'out' ? '>' : ''),
        react_1.default.createElement("button", { className: "bg-gray-300 text-gray-700 rounded-full px-4 py-2 mb-2 font-bold focus:outline-none", onClick: handleNodeClick }, relationship.to));
}
function TreeNode(_a) {
    var node = _a.node;
    var dispatch = react_redux_1.useDispatch();
    var handleNodeClick = function (id) { return dispatch(actions_1.selectNode(id)); };
    var relationships = react_redux_1.useSelector(function (state) { return state.currentQuery.relationships; });
    var predicates = react_redux_1.useSelector(function (state) { return state.currentQuery.predicates; });
    var output = react_redux_1.useSelector(function (state) { return state.currentQuery.output; });
    var theseRels = relationships.filter(function (rel) { return rel.from === node.id; });
    var relationshipList = theseRels.length ? react_1.default.createElement("ul", { className: "ml-6 mb-2" }, theseRels.map(function (rel) { return react_1.default.createElement(TreeRelationship, { key: rel.id, relationship: rel }); })) : null;
    var thesePredicates = predicates.filter(function (p) { return p.alias === node.id; }).map(function (p) { return p.name; });
    var theseOutputs = output.filter(function (p) { return p.alias === node.id; }).map(function (p) { return p.aggregate ? p.aggregate + "(" + p.name + ")" : p.name; });
    return (react_1.default.createElement("li", { key: node.id, className: "mb-4" },
        react_1.default.createElement("button", { onClick: function () { return handleNodeClick(node.id); }, className: "bg-gray-300 text-gray-700 rounded-full px-4 py-2 mb-2 font-bold focus:outline-none" },
            node.id,
            ":",
            react_1.default.createElement("span", { className: "bg-gray-100 text-gray-500 px-2 py-1 inline-block ml-1" }, node.label),
            thesePredicates.length ? react_1.default.createElement("span", { className: "inline-block ml-2" },
                '{',
                thesePredicates.join(', '),
                '}') : '',
            theseOutputs.length ? react_1.default.createElement("span", { className: "inline-block ml-2 text-gray-500" },
                ":: ",
                '{',
                theseOutputs.join(', '),
                '}') : ''),
        relationshipList));
}
function Query() {
    var query = react_redux_1.useSelector(function (state) { return state.currentQuery; });
    var _a = utils_1.queryToCypher(query), cypher = _a.cypher, params = _a.params;
    var paramStatements = Object.entries(params).map(function (_a) {
        var key = _a[0], value = _a[1];
        return react_1.default.createElement("pre", { key: key },
            ":param ",
            key,
            ": ",
            value);
    });
    return react_1.default.createElement("div", { className: "flex-grow p-2 mt-4 leading-8 bg-blue-100 text-blue-800 w-full" },
        paramStatements,
        react_1.default.createElement("pre", { className: "pt-2 mt-4 border-t border-gray-300" }, cypher));
}
function Graph() {
    var _a;
    var nodes = react_redux_1.useSelector(function (state) { return state.currentQuery.nodes; });
    // TODO: make force graph again...
    return (react_1.default.createElement("div", { className: "flex flex-col w-full h-full" },
        react_1.default.createElement("div", { className: "w-full flex-grow overflow-auto" },
            react_1.default.createElement("ul", { className: "p-2" }, (_a = nodes) === null || _a === void 0 ? void 0 : _a.map(function (node) { return react_1.default.createElement(TreeNode, { key: node.id, node: node }); }))),
        react_1.default.createElement(Query, null)));
}
exports.default = Graph;
