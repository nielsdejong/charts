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
var card_1 = __importDefault(require("../components/card"));
var header_1 = __importDefault(require("../components/header"));
var Report_1 = __importDefault(require("../components/reports/Report"));
var constants_1 = require("../constants");
function ExampleReport(report) {
    var example = undefined;
    if (!report.previewQuery) {
        example = react_1.default.createElement(card_1.default, { title: report.text }, "Preview coming soon...");
    }
    else {
        example = react_1.default.createElement(Report_1.default, { type: report.value, source: 'cypher', query: report.previewQuery });
    }
    return (react_1.default.createElement("div", { className: "flex mb-12" },
        react_1.default.createElement("div", { className: "w-full lg:w-1/2 flex flex-col justify-between px-2" },
            react_1.default.createElement("h3", { className: "text-lg font-bold pb-4 flex-grow-0" }, report.text),
            react_1.default.createElement("div", { className: "flex flex-grow-0" }, report.hint),
            report.exampleQuery && react_1.default.createElement("div", { className: "mt-8" },
                react_1.default.createElement("div", { className: "font-xs text-gray-500 font-bold mb-2" }, "Example Query:"),
                react_1.default.createElement("pre", { className: "flex-grow-0 border-t border-gray-400 pt-2 text-sm rounded-md bg-gray-100 text-gray-6600" }, report.exampleQuery)),
            react_1.default.createElement("div", { className: "flex-grow" })),
        react_1.default.createElement("div", { className: "w-full lg:w-1/2 p-2 pb-0" }, example)));
}
function Help() {
    return (react_1.default.createElement("div", { className: "flex flex-col w-full" },
        react_1.default.createElement(header_1.default, { sectionLink: "/help", sectionText: "Help" }),
        react_1.default.createElement("div", { className: "container mx-auto text-gray-800" },
            react_1.default.createElement("div", { className: "p-8 pb-0" },
                react_1.default.createElement("h2", { className: "font-bold text-gray-800 mb-4 px-2", style: { fontSize: '2rem' } }, "Getting Started")),
            react_1.default.createElement("div", { className: "p-8" },
                react_1.default.createElement("p", { className: "px-2" },
                    react_1.default.createElement("strong", null, "Charts"),
                    " is a Graph App that allows you to quickly create and share dashboards backed by Neo4j data. Charts allows you to create multiple dashboards and reports using a single connection supplied by Neo4j Desktop.")),
            react_1.default.createElement("div", { className: "p-8" },
                react_1.default.createElement("h2", { className: "font-bold text-gray-800 mb-12 border-b border-gray-400 pb-4 px-2", style: { fontSize: '1.4rem' } }, "Report Types"),
                constants_1.reportTypes.map(function (report) { return react_1.default.createElement(ExampleReport, __assign({}, report)); })))));
}
exports.default = Help;
