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
var QueryEditor_1 = __importDefault(require("./views/QueryEditor"));
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var DashboardView_1 = __importDefault(require("./views/DashboardView"));
var DashboardList_1 = __importDefault(require("./views/DashboardList"));
var QueryList_1 = __importDefault(require("./views/QueryList"));
var react_redux_1 = require("react-redux");
var persistence_1 = require("./persistence");
var Help_1 = __importDefault(require("./views/Help"));
var ExportForm_1 = __importDefault(require("./components/export/ExportForm"));
var Footer_1 = __importDefault(require("./components/Footer"));
function App() {
    var ready = react_redux_1.useSelector(function (state) { return state.dashboards.ready; });
    react_1.useEffect(function () {
        persistence_1.getInitialState();
    }, []);
    if (!ready) {
        return react_1.default.createElement("div", null, "...");
    }
    return (react_1.default.createElement("div", { className: "App flex flex-col text-gray-600" },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: "flex flex-row w-full bg-gray-800 flex-grow-0 flex-shrink-0" },
                react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "px-4 py-6 bg-gray-700 text-white text-sm hover:text-gray-200 font-bold" },
                    react_1.default.createElement("span", null, "Charts")),
                react_1.default.createElement("div", { className: "flex flex-grow" }),
                react_1.default.createElement(react_router_dom_1.Link, { className: "text-sm text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700", to: "/dashboards" }, "Dashboards"),
                react_1.default.createElement(react_router_dom_1.Link, { className: "text-sm text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700", to: "/queries" }, "Queries"),
                react_1.default.createElement(react_router_dom_1.Link, { className: "text-sm text-white px-4 py-6 hover:text-gray-200 hover:bg-gray-700", to: "/help" }, "Help")),
            react_1.default.createElement("div", { className: "flex flex-col flex-grow w-full bg-gray-100 overflow-auto pb-12" },
                react_1.default.createElement(react_router_dom_1.Switch, null,
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/dashboards", component: DashboardList_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { exact: true, path: "/queries", component: QueryList_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboards/:id", component: DashboardView_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/queries/:id", component: QueryEditor_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/help", component: Help_1.default }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "*", component: DashboardList_1.default })),
                react_1.default.createElement(Footer_1.default, null))),
        react_1.default.createElement(ExportForm_1.default, null)));
}
exports.default = App;
