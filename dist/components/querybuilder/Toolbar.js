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
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var constants_1 = require("../../constants");
var actions_1 = require("../../store/actions");
var tab_1 = __importDefault(require("../tab"));
function ToolbarHeader(_a) {
    var text = _a.text;
    return react_1.default.createElement("div", { className: "toolbar-header bg-white p-4 font-bold text-gray-700 text-lg border-b border-gray-400" }, text);
}
// function ToolbarSubheader({ text }) {
//     return <div className="toolbar-subheader bg-white p-4 font-bold text-gray-600 border-b border-gray-200 mb-4">{text}</div>
// }
function ToolbarRelationship(props) {
    var dispatch = react_redux_1.useDispatch();
    var handleRelationshipClick = function () { return dispatch(actions_1.addRelationship(props)); };
    var text = "(" + props.from + ")" + (props.direction === 'in' ? '<' : '') + "-[:" + props.type + "]-" + (props.direction === 'out' ? '>' : '') + "(:" + props.label + ")";
    return react_1.default.createElement("button", { onClick: handleRelationshipClick, className: "text-left w-full bg-gray-100 text-gray-700 rounded-md px-2 py-2 mb-2 font-bold" },
        react_1.default.createElement("span", { className: "inline-block px-2 text-xs rounded-md bg-green-300 text-green-800 mr-2" }, "+"),
        text);
}
function ExistingPredicate(props) {
    var dispatch = react_redux_1.useDispatch();
    var id = props.id, name = props.name, condition = props.condition, negative = props.negative, value = props.value;
    var handleRemoveClick = function () {
        dispatch(actions_1.removePredicate(id));
    };
    return react_1.default.createElement("div", { className: "flex flex-row justify-between p-2 mb-2 border-b border-gray-300" },
        react_1.default.createElement("div", { className: "flex flex-grow-1" }, name),
        react_1.default.createElement("div", { className: "flex flex-grow-1" },
            negative ? 'NOT' : 'IS',
            " ",
            condition),
        react_1.default.createElement("pre", { className: "flex flex-grow-1" }, value),
        react_1.default.createElement("button", { className: "p-2 rounded-sm border border-red-600 text-red-600 font-bold leading-none", onClick: handleRemoveClick }, "x"));
}
function Predicates(_a) {
    var id = _a.id;
    var predicates = react_redux_1.useSelector(function (state) { return state.currentQuery.predicates; });
    var thesePredicates = predicates.filter(function (p) { return p.alias === id; })
        .map(function (row) { return react_1.default.createElement(ExistingPredicate, __assign({ key: [row.id, row.name, row.negative ? 'NOT' : 'IS', row.condition, row.value].join('||') }, row)); });
    if (!thesePredicates.length)
        return null;
    return react_1.default.createElement("div", { className: "p-4 flex flex-col" }, thesePredicates);
}
function AddPredicateForm(_a) {
    var id = _a.id, properties = _a.properties;
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), value = _c[0], setValue = _c[1];
    var _d = react_1.useState(false), negative = _d[0], setNegative = _d[1];
    var _e = react_1.useState(constants_1.conditions[0]), condition = _e[0], setCondition = _e[1];
    var handleAddPredicate = function () {
        if (name && value !== '') {
            var thisProperty = properties[name];
            dispatch(actions_1.addPredicate({ alias: id, name: name, condition: condition, negative: negative, type: thisProperty.type, value: value }));
            setValue('');
            setCondition(constants_1.conditions[0]);
        }
    };
    return react_1.default.createElement("div", { className: "p-4 flex flex-col" },
        react_1.default.createElement("select", { className: "p-2 rounded-md border border-gray-400 mb-2", value: name, onChange: function (e) { return setName(e.target.value); } },
            react_1.default.createElement("option", null),
            Object.keys(properties).map(function (key) { return react_1.default.createElement("option", { key: key, value: key },
                key,
                " (",
                properties[key].type,
                ")"); })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("input", { id: "negative", type: "checkbox", checked: negative, onChange: function (e) { return setNegative(e.target.checked); } }),
            react_1.default.createElement("label", { className: "ml-2 inline-block font-bold text-xs mb-2 leading-none", htmlFor: "negative" }, "NOT")),
        react_1.default.createElement("select", { className: "p-2 rounded-md border border-gray-400 mb-2", value: condition, onChange: function (e) { return setCondition(e.target.value); } },
            react_1.default.createElement("option", null),
            constants_1.conditions.map(function (key) { return react_1.default.createElement("option", { key: key, value: key }, key); })),
        react_1.default.createElement("input", { className: "p-2 rounded-md border border-gray-400 mb-2", value: value, onChange: function (e) { return setValue(e.target.value); } }),
        react_1.default.createElement("button", { className: "px-4 py-2 rounded-md border font-bold border-blue-600 text-blue-600", onClick: handleAddPredicate }, "Add Predicate"));
}
function ReturnFields(_a) {
    var id = _a.id;
    var dispatch = react_redux_1.useDispatch();
    var output = react_redux_1.useSelector(function (state) { return state.currentQuery.output; });
    var handleRemoveClick = function (id) { return dispatch(actions_1.removeReturn(id)); };
    var theseFields = output.filter(function (p) { return p.alias === id; })
        .map(function (row) { return react_1.default.createElement("div", { className: "flex justify-between", key: row.id },
        react_1.default.createElement("div", null,
            row.aggregate && react_1.default.createElement("span", { className: "text-blue-700" },
                row.aggregate,
                "("),
            react_1.default.createElement("span", { className: "font-bold" }, row.name),
            row.aggregate && react_1.default.createElement("span", { className: "text-blue-600" }, ")"),
            row.as && react_1.default.createElement("span", { className: "text-green-600" },
                " AS ",
                row.as)),
        react_1.default.createElement("button", { className: "p-2 rounded-sm border border-red-600 text-red-600 font-bold leading-none", onClick: function () { return handleRemoveClick(row.id); } }, "x")); });
    if (!theseFields.length)
        return null;
    return react_1.default.createElement("div", { className: "p-4 flex flex-col" }, theseFields);
}
function AddReturnForm(_a) {
    var id = _a.id, properties = _a.properties;
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(Object.keys(properties)[0]), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), aggregate = _c[0], setAggregate = _c[1];
    var _d = react_1.useState(''), as = _d[0], setAs = _d[1];
    var handleAddReturn = function () {
        if (name) {
            dispatch(actions_1.addReturn({ alias: id, name: name, as: as, aggregate: aggregate !== '' ? aggregate : undefined }));
            setAs('');
            setAggregate('');
        }
    };
    return react_1.default.createElement("div", { className: "p-4 flex flex-col" },
        react_1.default.createElement("select", { className: "p-2 rounded-md border border-gray-400 mb-2", value: name, onChange: function (e) { return setName(e.target.value); } }, Object.keys(properties).map(function (key) { return react_1.default.createElement("option", { key: key, value: key }, key); })),
        react_1.default.createElement("input", { className: "p-2 rounded-md border border-gray-400 mb-2", value: as, onChange: function (e) { return setAs(e.target.value); }, placeholder: "Alias Field?" }),
        react_1.default.createElement("select", { className: "p-2 rounded-md border border-gray-400 mb-2", value: aggregate, onChange: function (e) { return setAggregate(e.target.value); } },
            react_1.default.createElement("option", { value: "" }, "Aggregate?"),
            constants_1.aggregateFunctions.map(function (_a) {
                var key = _a.key, value = _a.value, text = _a.text;
                return react_1.default.createElement("option", { key: key, value: value }, text);
            })),
        react_1.default.createElement("button", { className: "px-4 py-2 rounded-md border font-bold border-blue-600 text-blue-600", onClick: handleAddReturn }, "Add Return"));
}
function ToolbarTabs(_a) {
    var tabs = _a.tabs;
    return (react_1.default.createElement("div", { className: "flex flex-row px-2 pt-4 mb-2 border-b border-gray-300" }, tabs.map(function (tab, index) { return react_1.default.createElement(tab_1.default, { key: index, text: tab.text, active: tab.active, onClick: tab.onClick }); })));
}
function NodeToolbar(props) {
    var _a, _b;
    var dispatch = react_redux_1.useDispatch();
    var selected = react_redux_1.useSelector(function (state) { return state.currentQuery.selected; });
    var nodes = react_redux_1.useSelector(function (state) { return state.currentQuery.nodes; });
    var thisNode = nodes.find(function (node) { return node.id === selected; });
    var _c = react_1.useState('relationships'), tab = _c[0], setTab = _c[1];
    var thisLabel = thisNode && props.labels.find(function (label) { return label.label === thisNode.label; });
    if (!selected || !thisNode || !thisLabel)
        return react_1.default.createElement("div", null);
    var handleRemoveClick = function () { return dispatch(actions_1.removeNode(thisNode.id)); };
    var tabs = [
        { text: 'Relationships', active: tab === 'relationships', onClick: function () { return setTab('relationships'); } },
        { text: 'Where', active: tab === 'predicates', onClick: function () { return setTab('predicates'); } },
        { text: 'Return', active: tab === 'return', onClick: function () { return setTab('return'); } },
    ];
    var activeTab = react_1.default.createElement("div", null);
    if (tab === 'predicates') {
        activeTab = react_1.default.createElement("div", { className: "toolbar-predicates" },
            react_1.default.createElement(Predicates, { id: thisNode.id }),
            react_1.default.createElement(AddPredicateForm, { id: thisNode.id, properties: thisLabel.properties }));
    }
    else if (tab === 'return') {
        activeTab = react_1.default.createElement("div", { className: "toolbar-predicates" },
            react_1.default.createElement(ReturnFields, { id: thisNode.id }),
            react_1.default.createElement(AddReturnForm, { id: thisNode.id, properties: thisLabel.properties }));
    }
    else if (tab === 'relationships') {
        var addRelationshipOptions = thisLabel.relationships.map(function (rel) { return rel.labels.map(function (label) { return (__assign({ key: rel.type + "||" + rel.direction + "||" + label, label: label }, rel)); }); })
            .reduce(function (acc, next) { return acc.concat(next); }, [])
            .map(function (rel) { return react_1.default.createElement(ToolbarRelationship, __assign({ key: rel.key, from: selected }, rel)); });
        activeTab = (react_1.default.createElement("div", { className: "pt-2" },
            react_1.default.createElement("div", { className: "px-2" }, addRelationshipOptions)));
    }
    return react_1.default.createElement("div", { className: "toolbar flex-grow flex-shrink-0 node-toolbar h-full flex flex-col bg-white border-l border-gray-300", style: { width: '420px' } },
        react_1.default.createElement(ToolbarHeader, { text: "(" + ((_a = thisNode) === null || _a === void 0 ? void 0 : _a.id) + ":" + ((_b = thisNode) === null || _b === void 0 ? void 0 : _b.label) + ")" }),
        react_1.default.createElement(ToolbarTabs, { tabs: tabs }),
        react_1.default.createElement("div", { className: "toolbar-scrollable flex flex-col flex-shrink flex-grow overflow-auto" }, activeTab),
        react_1.default.createElement(ToolbarFooter, { handleRemoveClick: handleRemoveClick, removeText: "Remove Node" }));
}
function RelationshipToolbar(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var dispatch = react_redux_1.useDispatch();
    var selected = react_redux_1.useSelector(function (state) { return state.currentQuery.selected; });
    var nodes = react_redux_1.useSelector(function (state) { return state.currentQuery.nodes; });
    var relationships = react_redux_1.useSelector(function (state) { return state.currentQuery.relationships; });
    var thisRelationship = relationships.find(function (r) { return r.id === selected; });
    var thisType = props.types.find(function (type) { var _a; return type.type === ((_a = thisRelationship) === null || _a === void 0 ? void 0 : _a.type); });
    var _j = react_1.useState('predicates'), tab = _j[0], setTab = _j[1];
    var tabs = [
        { text: 'Predicates', active: tab === 'predicates', onClick: function () { return setTab('predicates'); } },
        { text: 'Return', active: tab === 'return', onClick: function () { return setTab('return'); } },
    ];
    if (!thisType) {
        return react_1.default.createElement("div", null);
    }
    var handleRemoveClick = function () { return dispatch(actions_1.removeRelationship(thisRelationship.id)); };
    var startNode = nodes.find(function (node) { var _a; return node.id === ((_a = thisRelationship) === null || _a === void 0 ? void 0 : _a.from); });
    var endNode = nodes.find(function (node) { var _a; return node.id === ((_a = thisRelationship) === null || _a === void 0 ? void 0 : _a.to); });
    var text = "(" + ((_a = startNode) === null || _a === void 0 ? void 0 : _a.id) + ":" + ((_b = startNode) === null || _b === void 0 ? void 0 : _b.label) + ")" + (((_c = thisRelationship) === null || _c === void 0 ? void 0 : _c.direction) === 'in' ? '<' : '') + "-[" + ((_d = thisRelationship) === null || _d === void 0 ? void 0 : _d.id) + ":" + ((_e = thisRelationship) === null || _e === void 0 ? void 0 : _e.type) + "]-" + (((_f = thisRelationship) === null || _f === void 0 ? void 0 : _f.direction) === 'out' ? '>' : '') + "(" + ((_g = endNode) === null || _g === void 0 ? void 0 : _g.id) + ":" + ((_h = endNode) === null || _h === void 0 ? void 0 : _h.label) + ")";
    var activeTab = react_1.default.createElement("div", null);
    if (tab === 'predicates') {
        activeTab = Object.keys(thisType.properties).length ? (react_1.default.createElement("div", null,
            react_1.default.createElement(Predicates, { id: thisRelationship.id }),
            react_1.default.createElement(AddPredicateForm, { id: thisRelationship.id, properties: thisType.properties }))) : react_1.default.createElement("div", { className: "p-4" }, "There are no properties on this relationship");
    }
    else if (tab === 'return') {
        activeTab = Object.keys(thisType.properties).length ? (react_1.default.createElement("div", null,
            react_1.default.createElement(ReturnFields, { id: thisRelationship.id }),
            react_1.default.createElement(AddReturnForm, { id: thisRelationship.id, properties: thisType.properties }))) : react_1.default.createElement("div", { className: "p-4" }, "There are no properties to return this relationship");
    }
    return (react_1.default.createElement("div", { className: "toolbar flex-grow flex-shrink-0 node-toolbar h-full flex flex-col bg-white border-l border-gray-300", style: { width: '420px' } },
        react_1.default.createElement(ToolbarHeader, { text: text }),
        react_1.default.createElement(ToolbarTabs, { tabs: tabs }),
        react_1.default.createElement("div", { className: "toolbar-scrollable flex flex-col flex-shrink flex-grow overflow-auto" }, activeTab),
        react_1.default.createElement(ToolbarFooter, { handleRemoveClick: handleRemoveClick, removeText: "Remove Relationship" })));
}
function ToolbarFooter(_a) {
    var handleRemoveClick = _a.handleRemoveClick, removeText = _a.removeText;
    return react_1.default.createElement("div", { className: "toolbar-footer p-4 border-t border-gray-400" },
        react_1.default.createElement("button", { className: "block w-full p-4 rounded-md border border-red-600 text-red-600 font-bold leading-none active:bg-red-100 focus:outline-none", onClick: handleRemoveClick }, removeText));
}
function Toolbar(props) {
    var selected = react_redux_1.useSelector(function (state) { return state.currentQuery.selected; });
    if (selected && selected.startsWith('n')) {
        return react_1.default.createElement(NodeToolbar, __assign({}, props));
    }
    else if (selected && selected.startsWith('r')) {
        return react_1.default.createElement(RelationshipToolbar, __assign({}, props));
    }
    return react_1.default.createElement("div", null);
}
exports.default = Toolbar;
