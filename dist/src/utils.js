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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var querybuilder_1 = __importStar(require("@neode/querybuilder"));
var react_redux_1 = require("react-redux");
var use_neo4j_1 = require("use-neo4j");
var constants_1 = require("./constants");
function queryToCypher(query) {
    var _a;
    if (typeof query === 'string') {
        return {
            cypher: query,
            params: {}
        };
    }
    var builder = new querybuilder_1.default();
    var _b = query, nodes = _b.nodes, relationships = _b.relationships, predicates = _b.predicates, output = _b.output;
    var endNodes = relationships.map(function (rel) { return rel.to; });
    var root = nodes.find(function (node) { return !endNodes.includes(node.id); });
    builder.match(root.id, (_a = root) === null || _a === void 0 ? void 0 : _a.label);
    var lastEnd = root.id;
    relationships.map(function (rel) {
        var _a;
        var to = nodes.find(function (node) { return node.id === rel.to; });
        if (lastEnd !== rel.from) {
            builder.match(rel.from);
        }
        lastEnd = rel.to;
        builder.relationship(rel.type, constants_1.directions[rel.direction], rel.id);
        builder.to(rel.to, (_a = to) === null || _a === void 0 ? void 0 : _a.label);
    });
    predicates.map(function (output) {
        var operator = constants_1.operators[output.condition];
        if (output.negative) {
            switch (operator) {
                case querybuilder_1.Operator.CONTAINS:
                    builder.whereNotContains(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.STARTS_WITH:
                    builder.whereNotStartsWith(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.ENDS_WITH:
                    builder.whereNotEndsWith(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.GREATER_THAN:
                    builder.whereLessThan(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.GREATER_THAN_OR_EQUAL:
                    builder.whereLessThanOrEqual(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.LESS_THAN:
                    builder.whereGreaterThan(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.LESS_THAN_OR_EQUAL:
                    builder.whereGreaterThanOrEqual(output.alias + "." + output.name, output.value);
                    break;
                default:
                    builder.whereNot(output.alias + "." + output.name, output.value);
                    break;
            }
        }
        else {
            switch (operator) {
                case querybuilder_1.Operator.CONTAINS:
                    builder.whereContains(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.STARTS_WITH:
                    builder.whereStartsWith(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.ENDS_WITH:
                    builder.whereEndsWith(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.GREATER_THAN:
                    builder.whereGreaterThan(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.GREATER_THAN_OR_EQUAL:
                    builder.whereGreaterThanOrEqual(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.LESS_THAN:
                    builder.whereLessThan(output.alias + "." + output.name, output.value);
                    break;
                case querybuilder_1.Operator.LESS_THAN_OR_EQUAL:
                    builder.whereLessThanOrEqual(output.alias + "." + output.name, output.value);
                    break;
                default:
                    builder.where(output.alias + "." + output.name, output.value);
                    break;
            }
        }
    });
    output.map(function (output) {
        var field = output.alias + "." + output.name;
        if (output.aggregate) {
            field = output.aggregate + "(" + field + ")";
        }
        if (output.as) {
            field += " AS " + output.as;
        }
        builder.return(field);
    });
    return builder.build();
}
exports.queryToCypher = queryToCypher;
function useReportResults(props) {
    var queries = react_redux_1.useSelector(function (state) { return state.queries; });
    var cypher = props.query;
    var params = {};
    if (props.source === 'query') {
        var output = queryToCypher(queries.find(function (query) { return query.id === props.query; }));
        cypher = output.cypher;
        params = output.params;
    }
    return __assign({ params: params }, use_neo4j_1.useReadCypher(cypher, params, props.database));
}
exports.useReportResults = useReportResults;
function recordToNative(input) {
    if (!input && input !== false) {
        return null;
    }
    else if (typeof input.keys === 'object' && typeof input.get === 'function') {
        return Object.fromEntries(input.keys.map(function (key) { return [key, recordToNative(input.get(key))]; }));
    }
    else if (typeof input.toNumber === 'function') {
        return input.toNumber();
    }
    else if (Array.isArray(input)) {
        return input.map(function (item) { return recordToNative(item); });
    }
    else if (typeof input === 'object') {
        var converted = Object.entries(input).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, recordToNative(value)];
        });
        return Object.fromEntries(converted);
    }
    return input;
}
exports.recordToNative = recordToNative;
function resultToNative(result) {
    if (!result)
        return {};
    return result.records.map(function (row) { return recordToNative(row); });
}
exports.resultToNative = resultToNative;
function checkResultKeys(first, keys) {
    var missing = keys.filter(function (key) { return !first.keys.includes(key); });
    if (missing.length > 0) {
        return new Error("The query is missing the following key" + (missing.length > 1 ? 's' : '') + ": " + missing.join(', ') + ".  The expected keys are: " + keys.join(', '));
    }
    return false;
}
exports.checkResultKeys = checkResultKeys;
