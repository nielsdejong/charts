"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function Button(props) {
    var handleClick = function (e) {
        e.preventDefault();
        props.onClick();
    };
    var classes = "px-" + (props.px || 4) + " py-" + (props.py || 2) + " rounded-md bg-" + (props.bg || 'white') + " border border-" + (props.colour || 'blue') + "-600 text-" + (props.colour || 'blue') + "-600 text-" + props.size;
    return (react_1.default.createElement("button", { className: classes, onClick: handleClick, disabled: props.disabled }, props.text));
}
exports.default = Button;
