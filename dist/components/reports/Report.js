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
var actions_1 = require("../../store/actions");
var constants_1 = require("../../constants");
var card_1 = __importDefault(require("../card"));
var metric_1 = __importDefault(require("./metric"));
var table_1 = __importDefault(require("./table"));
var line_1 = __importDefault(require("./line"));
var bar_1 = __importDefault(require("./bar"));
var ReportForm_1 = __importDefault(require("./ReportForm"));
var radar_1 = __importDefault(require("./radar"));
var funnel_1 = __importDefault(require("./funnel"));
var bump_1 = __importDefault(require("./bump"));
var chord_1 = __importDefault(require("./chord"));
var areaBump_1 = __importDefault(require("./areaBump"));
var bubble_1 = __importDefault(require("./bubble"));
var calendar_1 = __importDefault(require("./calendar"));
var heatMap_1 = __importDefault(require("./heatMap"));
var network_1 = __importDefault(require("./network"));
var sankey_1 = __importDefault(require("./sankey"));
var utils_1 = require("../../utils");
var Loading_1 = __importDefault(require("../Loading"));
var error_1 = __importDefault(require("./error"));
function ExpandIcon(_a) {
    var onClick = _a.onClick;
    return (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", onClick: onClick, className: "expand w-4 h-4 mt-2 ml-2" },
        react_1.default.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" },
            react_1.default.createElement("g", { stroke: "#718096", strokeWidth: "1.5" },
                react_1.default.createElement("line", { x1: "9.75", y1: "14.248", x2: "0.75", y2: "23.248", id: "Shape" }),
                react_1.default.createElement("polyline", { id: "Shape", points: "23.25 7.498 23.25 0.748 16.5 0.748" }),
                react_1.default.createElement("polyline", { id: "Shape", points: "0.75 16.498 0.75 23.248 7.5 23.248" }),
                react_1.default.createElement("line", { x1: "23.25", y1: "0.748", x2: "14.25", y2: "9.748", id: "Shape" })))));
}
function ContractIcon(_a) {
    var onClick = _a.onClick;
    return (react_1.default.createElement("svg", { width: "24px", height: "24px", viewBox: "0 0 24 24", onClick: onClick, className: "contract w-4 h-4 mt-2 ml-2" },
        react_1.default.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" },
            react_1.default.createElement("g", { stroke: "#718096", strokeWidth: "1.5" },
                react_1.default.createElement("line", { x1: "23.25", y1: "0.748", x2: "14.25", y2: "9.748", id: "Shape" }),
                react_1.default.createElement("polyline", { id: "Shape", points: "9.75 20.998 9.75 14.248 3 14.248" }),
                react_1.default.createElement("polyline", { id: "Shape", points: "14.25 2.998 14.25 9.748 21 9.748" }),
                react_1.default.createElement("line", { x1: "9.75", y1: "14.248", x2: "0.75", y2: "23.248", id: "Shape" })))));
}
function Report(props) {
    var _a, _b;
    var dispatch = react_redux_1.useDispatch();
    // Tab State
    var _c = react_1.useState(false), expanded = _c[0], setExpanded = _c[1];
    var _d = react_1.useState('report'), tab = _d[0], setTab = _d[1];
    var handleDelete = function () {
        // eslint-disable-next-line
        if (confirm('Are you sure you want to delete this report?')) {
            dispatch(actions_1.deleteReport(props.id));
        }
    };
    var handleUpdateReport = function (dashboard, name, database, type, source, query, columns, rows) {
        dispatch(actions_1.updateReport(props.id, dashboard, name, database, type, source, query, columns, rows, props.order));
        setTab('report');
    };
    var expandContract = expanded
        ? { children: react_1.default.createElement(ContractIcon, { onClick: function () { return setExpanded(false); } }) }
        : { children: react_1.default.createElement(ExpandIcon, { onClick: function () { return setExpanded(true); } }) };
    var tabs = [
        { text: 'Edit', active: tab === 'edit', onClick: function () { return setTab('edit'); } },
        { text: 'Delete', onClick: function () { return handleDelete(); } },
        expandContract
    ];
    // Data
    var _e = utils_1.useReportResults(props), loading = _e.loading, error = _e.error, first = _e.first, records = _e.records, run = _e.run, params = _e.params;
    // Re-run query if it changes
    react_1.useEffect(function () {
        run(params, props.database);
        // eslint-disable-next-line
    }, [props.query, props.database]);
    var content = react_1.default.createElement("pre", null, JSON.stringify(props, null, 2));
    try {
        if (tab === 'edit') {
            content = react_1.default.createElement(ReportForm_1.default, { dashboard: props.dashboard, report: props, submitText: "Update Report", onSubmit: handleUpdateReport });
        }
        else if (loading) {
            content = react_1.default.createElement(Loading_1.default, null);
        }
        else if (error) {
            content = error_1.default({ error: error });
        }
        else if (!((_a = records) === null || _a === void 0 ? void 0 : _a.length)) {
            content = react_1.default.createElement("div", { className: "font-bold rounded-md text-green-600" }, "No results were returned for this query");
        }
        else if (props.type === constants_1.TYPE_METRIC) {
            content = react_1.default.createElement(metric_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_TABLE) {
            content = react_1.default.createElement(table_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_LINE) {
            content = react_1.default.createElement(line_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_BAR) {
            content = react_1.default.createElement(bar_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_STACKED_BAR) {
            content = react_1.default.createElement(bar_1.default, { records: records, first: first, stacked: true });
        }
        else if (props.type === constants_1.TYPE_HORIZONTAL_BAR) {
            content = react_1.default.createElement(bar_1.default, { records: records, first: first, layout: "horizontal" });
        }
        else if (props.type === constants_1.TYPE_HORIZONTAL_STACKED_BAR) {
            content = react_1.default.createElement(bar_1.default, { records: records, first: first, stacked: true, layout: "horizontal" });
        }
        else if (props.type === constants_1.TYPE_HORIZONTAL_STACKED_BAR) {
            content = react_1.default.createElement(bar_1.default, { records: records, first: first, stacked: true, layout: "horizontal" });
        }
        else if (props.type === constants_1.TYPE_RADAR) {
            content = react_1.default.createElement(radar_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_FUNNEL) {
            content = react_1.default.createElement(funnel_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_HORIZONTAL_FUNNEL) {
            content = react_1.default.createElement(funnel_1.default, { records: records, first: first, layout: "horizontal" });
        }
        else if (props.type === constants_1.TYPE_BUMP) {
            content = react_1.default.createElement(bump_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_AREA_BUMP) {
            content = react_1.default.createElement(areaBump_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_CHORD) {
            content = react_1.default.createElement(chord_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_BUBBLE) {
            content = react_1.default.createElement(bubble_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_CALENDAR) {
            content = react_1.default.createElement(calendar_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_HEAT_MAP) {
            content = react_1.default.createElement(heatMap_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_NETWORK) {
            content = react_1.default.createElement(network_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_SANKEY) {
            content = react_1.default.createElement(sankey_1.default, { records: records, first: first });
        }
        else if (props.type === constants_1.TYPE_VERTICAL_SANKEY) {
            content = react_1.default.createElement(sankey_1.default, { records: records, first: first, layout: "vertical" });
        }
        else {
            var report = constants_1.reportTypes.find(function (report) { return report.value === props.type; });
            if (report) {
                var componentProps = ((_b = report) === null || _b === void 0 ? void 0 : _b.props) || {};
                content = report.component(__assign({ records: records, first: first }, componentProps));
            }
        }
    }
    catch (error) {
        content = error_1.default({ error: error });
    }
    return (react_1.default.createElement(card_1.default, { title: props.name, titleActive: tab === 'report', tabs: tabs, onTitleClick: function () { return setTab('report'); }, expanded: expanded, rows: props.rows }, content));
}
exports.default = Report;
