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
/* eslint-disable */
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var actions_1 = require("../store/actions");
var button_1 = __importDefault(require("../components/forms/button"));
var modal_1 = __importDefault(require("../components/modal"));
var Column_1 = __importDefault(require("../components/grid/Column"));
var Report_1 = __importDefault(require("../components/reports/Report"));
var ReportForm_1 = __importDefault(require("../components/reports/ReportForm"));
var ColdStart_1 = __importDefault(require("../components/ColdStart"));
var header_1 = __importDefault(require("../components/header"));
var FeedbackForm_1 = require("../components/feedback/FeedbackForm");
function OrderEditFormItem(_a) {
    var report = _a.report, index = _a.index, length = _a.length, handleUpClick = _a.handleUpClick, handleDownClick = _a.handleDownClick;
    return (react_1.default.createElement("li", { className: "flex justify-between p-2 mb-2 border-b border-gray-200", key: report.id },
        react_1.default.createElement("span", { className: "text-xs text-gray-500 inline-block mr-2" }, report.order),
        react_1.default.createElement("span", { className: "flex-grow" }, report.name),
        react_1.default.createElement("button", { onClick: function () { return handleUpClick(report); }, className: "cursor-pointer outline-none ml-4 " + (index > 0 ? 'text-blue-600' : 'text-gray-300') }, "\u2191"),
        react_1.default.createElement("button", { onClick: function () { return handleDownClick(report); }, className: "cursor-pointer outline-none ml-4 " + (index < length - 1 ? 'text-blue-600' : 'text-gray-300') }, "\u2193")));
}
function OrderEditForm(props) {
    var dispatch = react_redux_1.useDispatch();
    var length = props.reports.length;
    var _a = react_1.useState(props.reports), reports = _a[0], setReports = _a[1];
    var handleUpClick = function (report) {
        var index = reports.findIndex(function (row) { return row.id === report.id; });
        var newOrder = report.order - 1;
        // Don't move top item
        if (newOrder == -1)
            return;
        // Extract the current item
        var extracted = reports.splice(index, 1)[0];
        extracted.order = newOrder;
        // Take a copy of reports and fix the orders
        var newReports = reports.slice(0)
            .map(function (row) { return (__assign(__assign({}, row), { order: row.order <= newOrder ? row.order + 1 : row.order })); })
            // ... and add the extracted item back in
            .concat(extracted);
        // Sort them items by their order
        newReports.sort(function (a, b) { return a.order < b.order ? -1 : 1; });
        // Reset the state
        setReports(newReports);
    };
    var handleDownClick = function (report) {
        var index = reports.findIndex(function (row) { return row.id === report.id; });
        // zero-indexed - don't add anything to the order
        var newOrder = report.order;
        // Don't move bottom item
        if (newOrder === length)
            return;
        // Extract the current item
        var extracted = reports.splice(index, 1)[0];
        extracted.order = newOrder;
        // Take a copy of reports and fix the orders
        var newReports = reports.slice(0)
            .map(function (row) { return (__assign(__assign({}, row), { order: row.order > newOrder ? row.order - 1 : row.order })); })
            // ... and add the extracted item back in
            .concat(extracted);
        // Sort them items by their order
        newReports.sort(function (a, b) { return a.order < b.order ? -1 : 1; });
        // Reset the state
        setReports(newReports);
    };
    var handleSaveClick = function () {
        dispatch(actions_1.reorderReports(reports));
        props.onClose();
    };
    return (react_1.default.createElement(modal_1.default, { title: 'Edit Order', onClose: props.onClose },
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", { className: "flex" },
                react_1.default.createElement("strong", null)),
            reports.map(function (report, index) { return react_1.default.createElement(OrderEditFormItem, { index: index, length: length, key: report.id, report: report, handleUpClick: handleUpClick, handleDownClick: handleDownClick }); })),
        react_1.default.createElement("div", { className: "mt-4" },
            react_1.default.createElement(button_1.default, { colour: "blue", onClick: handleSaveClick, text: "Save Order" }),
            ' ',
            react_1.default.createElement(button_1.default, { colour: "red", onClick: props.onClose, text: "Cancel" }))));
}
function Dashboard(_a) {
    var match = _a.match;
    var dispatch = react_redux_1.useDispatch();
    var dashboard = react_redux_1.useSelector(function (state) { return state.dashboards.dashboards.find(function (row) { return row.id === match.params.id; }); });
    var reports = react_redux_1.useSelector(function (state) { return state.dashboards.reports.filter(function (row) { return row.dashboard === match.params.id; }); });
    var _b = react_1.useState(false), showEditOrder = _b[0], setShowEditOrder = _b[1];
    // Sort reports by `order`
    reports.sort(function (a, b) { return a.order < b.order ? -1 : 1; });
    if (!dashboard) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    var _c = react_1.useState(dashboard.name), name = _c[0], setName = _c[1];
    var _d = react_1.useState(dashboard.description), description = _d[0], setDescription = _d[1];
    var _e = react_1.useState(false), showAddReport = _e[0], setShowAddReport = _e[1];
    var handleDeleteClick = function () {
        if (confirm('Are you sure you want to delete this dashboard?')) {
            dispatch(actions_1.deleteDashboard(match.params.id));
        }
    };
    var handleUpdateClick = function () {
        dispatch(actions_1.updateDashboard(match.params.id, name, description));
    };
    var handleAddReport = function (dashboard, name, database, type, source, query, columns) {
        dispatch(actions_1.addReport(dashboard, name, database, type, source, query, columns));
        setShowAddReport(false);
    };
    var handleShowAddReportClick = function () { return setShowAddReport(true); };
    var handleShowEditOrderClick = function () { return setShowEditOrder(true); };
    return (react_1.default.createElement("div", { className: "flex flex-col w-full" },
        react_1.default.createElement(header_1.default, { sectionLink: "/dashboards", sectionText: "Dashboards", pageTitle: dashboard.name, savedAt: dashboard.savedAt, buttons: [
                { colour: 'blue', text: 'Add Report', onClick: handleShowAddReportClick, },
                { colour: 'blue', text: 'Edit Order', onClick: handleShowEditOrderClick, },
                { colour: 'red', text: 'Delete Dashboard', onClick: handleDeleteClick, },
            ] }),
        showEditOrder && react_1.default.createElement(OrderEditForm, { reports: reports, onClose: function () { return setShowEditOrder(false); } }),
        react_1.default.createElement("div", { className: "container mx-auto pb-16" },
            react_1.default.createElement("div", { className: "px-8 py-8" },
                showAddReport && react_1.default.createElement(modal_1.default, { title: "Add Report", onClose: function () { return setShowAddReport(false); } },
                    react_1.default.createElement(ReportForm_1.default, { dashboard: dashboard.id, submitText: "Add Report", onSubmit: handleAddReport, report: {} })),
                react_1.default.createElement("input", { type: "text", className: "font-bold text-gray-800 py-2 mb-2 bg-transparent border-b border-transparent focus:border-blue-400 focus:outline-none w-full text-xl", value: name, onChange: function (e) { return setName(e.target.value); } }),
                react_1.default.createElement("div", { className: "flex" },
                    react_1.default.createElement("input", { className: "text-gray-600 bg-transparent border-b border-transparent focus:border-blue-400 pb-1 focus:outline-none flex-grow", type: "text", value: description, onChange: function (e) { return setDescription(e.target.value); } }),
                    (dashboard.name !== name || dashboard.description !== description) && react_1.default.createElement("button", { className: "px-2 py-1 text-xs rounded-md border border-green-600 text-green-600 flex-grow-0 ml-2", onClick: handleUpdateClick }, "Save Changes"))),
            react_1.default.createElement("div", { className: "flex flex-row flex-wrap" },
                reports.map(function (report) { return react_1.default.createElement(Column_1.default, { columns: report.columns, key: report.id },
                    react_1.default.createElement(Report_1.default, __assign({}, report))); }),
                !reports.length && react_1.default.createElement(ColdStart_1.default, { title: "Let's get exploring!", buttonText: "Add Report", onButtonClick: handleShowAddReportClick },
                    react_1.default.createElement("p", { className: "mx-auto my-8 text-center" },
                        "You can add a report by clicking the ",
                        react_1.default.createElement("strong", null, "Add Report"),
                        " button below")))),
        react_1.default.createElement(FeedbackForm_1.FeedbackForm, { page: match.path })));
}
exports.default = Dashboard;
