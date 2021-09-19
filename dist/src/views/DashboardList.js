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
var react_redux_1 = require("react-redux");
var actions_1 = require("../store/actions");
var button_1 = __importDefault(require("../components/forms/button"));
var modal_1 = __importDefault(require("../components/modal"));
var card_1 = __importDefault(require("../components/card"));
var Column_1 = __importDefault(require("../components/grid/Column"));
var ColdStart_1 = __importDefault(require("../components/ColdStart"));
var header_1 = __importDefault(require("../components/header"));
var FeedbackForm_1 = require("../components/feedback/FeedbackForm");
function Dashboards(_a) {
    var history = _a.history, match = _a.match;
    var dispatch = react_redux_1.useDispatch();
    // @ts-ignore
    var dashboards = react_redux_1.useSelector(function (n) { return n.dashboards.dashboards; });
    var _b = react_1.useState(false), showAddForm = _b[0], setShowAddForm = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(''), description = _d[0], setDescription = _d[1];
    var handleShowAddClick = function () {
        setShowAddForm(true);
    };
    var handleAddDashboardClick = function () {
        if (name !== '') {
            dispatch(actions_1.addDashboard(name, description));
            setName('');
            setDescription('');
            setShowAddForm(false);
        }
    };
    var handleDeleteDashboardClick = function (id) {
        if (confirm('Are you sure you want to delete this dashboard?')) {
            dispatch(actions_1.deleteDashboard(id));
        }
    };
    var goToDashboard = function (id) { return history.push("/dashboards/" + id); };
    return (react_1.default.createElement("div", { className: "flex flex-col w-full" },
        react_1.default.createElement(header_1.default, { sectionLink: "/dashboards", sectionText: "Dashboards", buttons: [
                { colour: 'blue', text: 'Add Dashboard', onClick: handleShowAddClick, },
            ] }),
        react_1.default.createElement("div", { className: "w-full" },
            react_1.default.createElement("div", { className: "container m-auto" },
                react_1.default.createElement("div", { className: "flex flex-row flex-wrap pt-8" },
                    dashboards && dashboards.map(function (dashboard) { return react_1.default.createElement(Column_1.default, { columns: 1, key: dashboard.id },
                        react_1.default.createElement(card_1.default, { title: dashboard.name, onTitleClick: function () { return goToDashboard(dashboard.id); }, tabs: [{ text: 'Delete', onClick: function () { return handleDeleteDashboardClick(dashboard.id); } }], actions: [{ text: 'View Dashboard', to: "/dashboards/" + dashboard.id }] }, dashboard.description)); }),
                    !dashboards || !dashboards.length && react_1.default.createElement(ColdStart_1.default, { title: "Let's get exploring!", buttonText: "Add Dashboard", onButtonClick: handleShowAddClick },
                        react_1.default.createElement("p", { className: "mx-auto my-8 text-center" },
                            "You can add a new dashboard by clicking the ",
                            react_1.default.createElement("strong", null, "Add Dashboard"),
                            " button below"))))),
        showAddForm && react_1.default.createElement(modal_1.default, { title: "Add Dashboard", onClose: function () { return setShowAddForm(false); } },
            react_1.default.createElement("form", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "name", className: "block font-bold m-2" }, "Name"),
                    react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", type: "text", onChange: function (e) { return setName(e.target.value); }, placeholder: "name" })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "description", className: "block font-bold m-2" }, "Description"),
                    react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", type: "text", onChange: function (e) { return setDescription(e.target.value); }, placeholder: "description" })),
                react_1.default.createElement("div", { className: "mt-4" },
                    react_1.default.createElement(button_1.default, { text: "Add Dashboard", onClick: handleAddDashboardClick })))),
        react_1.default.createElement(FeedbackForm_1.FeedbackForm, { page: match.path })));
}
exports.default = Dashboards;
