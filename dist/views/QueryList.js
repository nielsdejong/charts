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
var button_1 = __importDefault(require("../components/forms/button"));
var modal_1 = __importDefault(require("../components/modal"));
var card_1 = __importDefault(require("../components/card"));
var Column_1 = __importDefault(require("../components/grid/Column"));
var ColdStart_1 = __importDefault(require("../components/ColdStart"));
function Queries(_a) {
    var history = _a.history;
    var dispatch = react_redux_1.useDispatch();
    var queries = react_redux_1.useSelector(function (state) { return state.queries; });
    var _b = react_1.useState(false), showAddForm = _b[0], setShowAddForm = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var handleNameChange = function (e) { return setName(e.target.value); };
    var handleAddQuery = function () {
        if (name !== '') {
            dispatch(actions_1.addQuery(name));
            setName('');
            setShowAddForm(false);
        }
    };
    var handleShowAddFormClick = function () { return setShowAddForm(true); };
    var handleHideAddFormClick = function () { return setShowAddForm(false); };
    var handleDeleteQueryClick = function (id) {
        if (confirm('Are you sure you want to delete this query and all subsequent reports?')) {
            dispatch(actions_1.deleteQuery(id));
        }
    };
    var goToQuery = function (id) { return history.push("/queries/" + id); };
    return (react_1.default.createElement("div", { className: "flex flex-col w-full" },
        react_1.default.createElement("div", { className: "query-header flex flex-row flex-grow-0 bg-white border-b border-gray-300 p-4 mb-4" },
            react_1.default.createElement("div", { className: "flex justify-top flex-grow-0 mr-2 py-2" },
                react_1.default.createElement(react_router_dom_1.Link, { className: "block bg-transparent text-lg font-bold focus:outline-none", to: "/queries" },
                    react_1.default.createElement("span", { className: "text-blue-600 mr-2" }, "Queries"))),
            react_1.default.createElement("div", { className: "flex flex-grow" }),
            react_1.default.createElement("div", { className: "ml-2" },
                react_1.default.createElement(button_1.default, { size: "sm", colour: "blue", text: "Add Query", onClick: handleShowAddFormClick }))),
        react_1.default.createElement("div", { className: "w-full" },
            react_1.default.createElement("div", { className: "container m-auto" },
                react_1.default.createElement("div", { className: "flex flex-row flex-wrap pt-8" },
                    queries.map(function (query) { return (react_1.default.createElement(Column_1.default, { columns: 1, key: query.id },
                        react_1.default.createElement(card_1.default, { title: query.name, onTitleClick: function () { return goToQuery(query.id); }, tabs: [{ text: 'Delete', onClick: function () { return handleDeleteQueryClick(query.id); } }], actions: [{ text: 'View Query', to: "/queries/" + query.id }] }))); }),
                    !queries.length && react_1.default.createElement(ColdStart_1.default, { title: "Let's get exploring!", buttonText: "Add Query", onButtonClick: handleShowAddFormClick },
                        react_1.default.createElement("p", { className: "mx-auto my-8 text-center" },
                            "You can add a new query by clicking the ",
                            react_1.default.createElement("strong", null, "Add Query"),
                            " button below"))))),
        showAddForm && react_1.default.createElement(modal_1.default, { title: "Add Query", onClose: handleHideAddFormClick },
            react_1.default.createElement("form", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("label", { htmlFor: "description", className: "block font-bold m-2" }, "Query Name"),
                    react_1.default.createElement("input", { className: "w-full rounded-md p-2 border border-gray-400 bg-white text-gray-600", type: "text", value: name, onChange: handleNameChange })),
                react_1.default.createElement("div", { className: "mt-4" },
                    react_1.default.createElement(button_1.default, { text: "Add Query", onClick: handleAddQuery }))))));
}
exports.default = Queries;
