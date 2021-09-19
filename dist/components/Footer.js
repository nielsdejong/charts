"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var use_neo4j_1 = require("use-neo4j");
function Footer() {
    var context = react_1.useContext(use_neo4j_1.Neo4jContext);
    var host = react_1.default.createElement("span", null);
    if (context.driver) {
        var address = context.driver['_meta'].address;
        var auth = context.driver['_connectionProvider']['_authToken'];
        host = react_1.default.createElement("span", null,
            " |  Connected to",
            ' ',
            react_1.default.createElement("strong", null,
                address._host,
                ":",
                address._port),
            " as",
            ' ',
            react_1.default.createElement("strong", null, auth.principal));
    }
    return (react_1.default.createElement("div", { className: "container m-auto" },
        react_1.default.createElement("div", { className: "text-xs border-t border-gray-400 p-4 bg-gray-100" },
            "Charts",
            host)));
}
exports.default = Footer;
