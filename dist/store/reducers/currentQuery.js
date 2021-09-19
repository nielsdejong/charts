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
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var initialState = {
    updated: false,
    loaded: false,
    nodes: [],
    relationships: [],
    predicates: [],
    output: [],
};
function removeRelationshipFromTree(id, state) {
    var toRemove = state.relationships.find(function (rel) { return rel.id === id; });
    // Remove the end node of this relationship
    if (toRemove) {
        state = removeNodeFromTree(toRemove.to, state);
    }
    // Remove the relationship from the state
    state.relationships = state.relationships.filter(function (rel) { return rel.id !== id; });
    // Remove predicates
    state.predicates = state.predicates.filter(function (p) { return p.alias !== id; });
    // Remove Return
    state.output = state.output.filter(function (p) { return p.alias !== id; });
    // Reset selected
    state.selected = undefined;
    return state;
}
function removeNodeFromTree(id, state) {
    var atStart = state.relationships.filter(function (row) { return row.from === id; });
    // If node is at the start, remove all relationships further down the chain
    // eslint-disable-next-line
    atStart.map(function (rel) {
        state = removeNodeFromTree(rel.to, state);
    });
    // Remove relationships where the node is at the end
    state.relationships = state.relationships.filter(function (row) { return row.to !== id; });
    // Remove the node from the node tree
    state.nodes = state.nodes.filter(function (node) { return node.id !== id; });
    // Remove predicates
    state.predicates = state.predicates.filter(function (p) { return p.alias !== id; });
    // Remove Return
    state.output = state.output.filter(function (p) { return p.alias !== id; });
    // Reset selected
    state.selected = undefined;
    return state;
}
function queryReducer(state, action) {
    if (state === void 0) { state = initialState; }
    state.updated = false;
    switch (action.type) {
        case actions_1.LOAD_QUERY:
            return action.payload;
        case actions_1.SET_NAME:
            return __assign(__assign({}, state), { name: action.payload.name });
        case actions_1.ADD_NODE:
            return __assign(__assign({}, state), { nodes: state.nodes.slice(0).concat(__assign(__assign({}, action.payload), { id: "n" + (state.nodes.length + 1) })) });
        case actions_1.REMOVE_NODE:
            return removeNodeFromTree(action.payload.id, state);
        case actions_1.ADD_RELATIONSHIP:
            var to = "n" + (state.nodes.length + 1);
            return __assign(__assign({}, state), { nodes: state.nodes.slice(0).concat({ label: action.payload.label, id: to }), relationships: state.relationships.slice(0).concat(__assign(__assign({}, action.payload), { to: to, id: "r" + (state.relationships.length + 1) })) });
        case actions_1.REMOVE_RELATIONSHIP:
            return removeRelationshipFromTree(action.payload.id, state);
        case actions_1.SELECT_NODE:
        case actions_1.SELECT_RELATIONSHIP:
            return __assign(__assign({}, state), { selected: action.payload });
        case actions_1.ADD_PREDICATE:
            return __assign(__assign({}, state), { predicates: state.predicates.slice(0).concat(__assign(__assign({}, action.payload), { id: "p" + (state.predicates.length + 1) })) });
        case actions_1.REMOVE_PREDICATE:
            return __assign(__assign({}, state), { predicates: state.predicates.slice(0).filter(function (p) { return p.id !== action.payload.id; }) });
        case actions_1.ADD_RETURN:
            return __assign(__assign({}, state), { output: state.output.slice(0).concat(__assign(__assign({}, action.payload), { id: "o" + (state.output.length + 1) })) });
        case actions_1.REMOVE_RETURN:
            return __assign(__assign({}, state), { output: state.output.slice(0).filter(function (p) { return p.id !== action.payload.id; }) });
    }
    return state;
}
exports.default = queryReducer;
