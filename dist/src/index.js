"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./App"));
var serviceWorker = __importStar(require("./serviceWorker"));
var use_neo4j_1 = require("use-neo4j");
var package_json_1 = require("use-neo4j/package.json");
var logo_svg_1 = __importDefault(require("./logo.svg"));
// import 'semantic-ui-css/semantic.min.css'
require("tailwindcss/dist/tailwind.css");
require("./index.css");
var store_1 = __importDefault(require("./store"));
var react_redux_1 = require("react-redux");
var logo = function () {
    return (react_1.default.createElement("div", { className: "logo" },
        react_1.default.createElement("img", { src: logo_svg_1.default, alt: "logo" })));
};
var footer = function () {
    return (react_1.default.createElement("div", { className: "footer" },
        react_1.default.createElement("a", { href: "https://github.com/adam-cowley/graphapp-starter-react", rel: "noopener noreferrer", target: "_blank" },
            "Built with GraphApp Starter Kit using",
            react_1.default.createElement("br", null),
            react_1.default.createElement("code", null, "use-neo4j"),
            " version ",
            package_json_1.version)));
};
var driver = undefined;
if (process.env.REACT_APP_NEO4J_SCHEME) {
    driver = use_neo4j_1.createDriver(process.env.REACT_APP_NEO4J_SCHEME, process.env.REACT_APP_NEO4J_HOST, process.env.REACT_APP_NEO4J_PORT, process.env.REACT_APP_NEO4J_USERNAME, process.env.REACT_APP_NEO4J_PASSWORD);
}
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(use_neo4j_1.Neo4jProvider, { driver: driver, logo: logo(), footer: footer() },
            react_1.default.createElement(App_1.default, null)))), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
