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
exports.postFeedback = function (body) {
    var formData = new URLSearchParams();
    formData.append("project", "@graphapps/charts");
    formData.append("helpful", body.helpful);
    formData.append("url", "@graphapps/charts" + body.page);
    if (body.reason) {
        formData.append("reason", body.reason);
    }
    if (body.moreInformation) {
        formData.append("moreInformation", body.moreInformation);
    }
    return fetch('https://uglfznxroe.execute-api.us-east-1.amazonaws.com/dev/Feedback', {
        method: 'post',
        body: formData,
        mode: "no-cors"
    }).then(function (response) {
        return response;
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.log(error);
    });
};
var reasons = {
    missing: 'It has missing information',
    'hard-to-follow': 'It’s hard to use or confusing',
    inaccurate: 'It’s inaccurate, out of date, or doesn’t work',
    other: 'Something else'
};
exports.FeedbackForm = function (props) {
    var _a = react_1.useState(false), helpful = _a[0], setHelpful = _a[1];
    var _b = react_1.useState('missing'), reason = _b[0], setReason = _b[1];
    var _c = react_1.useState(''), moreInformation = _c[0], setMoreInformation = _c[1];
    var _d = react_1.useState(props.page), page = _d[0], setPage = _d[1];
    react_1.useEffect(function () {
        setPage(props.page);
        setHelpful(undefined);
    }, [props.page]);
    var colour = 'blue';
    var view;
    var handleSendFeedback = function () {
        exports.postFeedback({ page: page, helpful: helpful, reason: reason, moreInformation: moreInformation });
        setReason('missing');
        setMoreInformation('');
        setHelpful(true);
    };
    if (helpful === undefined) {
        view = (react_1.default.createElement("div", { className: "flex p-2 font-bold" },
            react_1.default.createElement("h1", { className: "flex-grow font-bold mb-2" }, "Is this Graph App Useful?"),
            react_1.default.createElement("svg", { width: "22px", height: "22px", viewBox: "0 0 22 22", role: "button", className: "no stroke-current ml-2", "aria-label": "No, this page isn't helpful", onClick: function () { return setHelpful(false); } },
                react_1.default.createElement("g", { fill: "transparent" },
                    react_1.default.createElement("path", { d: "M6.25,15.8333333 C6.25,13.7622655 7.92893219,12.0833333 10,12.0833333 C12.0710678,12.0833333 13.75,13.7622655 13.75,15.8333333" }),
                    react_1.default.createElement("circle", { cx: "10", cy: "10", r: "9.58333333" }),
                    react_1.default.createElement("path", { d: "M12.5,4.58333333 C12.8934466,4.05873783 13.5109223,3.75 14.1666667,3.75 C14.822411,3.75 15.4398867,4.05873783 15.8333333,4.58333333" }),
                    react_1.default.createElement("line", { x1: "4.58333333", y1: "7.91666667", x2: "7.08333333", y2: "7.91666667" }),
                    react_1.default.createElement("path", { d: "M7.08333333,8.54166667 C6.96827401,8.54166667 6.875,8.44839266 6.875,8.33333333 C6.875,8.21827401 6.96827401,8.125 7.08333333,8.125 C7.19839266,8.125 7.29166667,8.21827401 7.29166667,8.33333333 C7.29166667,8.44839266 7.19839266,8.54166667 7.08333333,8.54166667" }),
                    react_1.default.createElement("line", { x1: "12.9166667", y1: "7.91666667", x2: "15.4166667", y2: "7.91666667" }),
                    react_1.default.createElement("path", { d: "M15.4166667,8.54166667 C15.3016073,8.54166667 15.2083333,8.44839266 15.2083333,8.33333333 C15.2083333,8.21827401 15.3016073,8.125 15.4166667,8.125 C15.531726,8.125 15.625,8.21827401 15.625,8.33333333 C15.625,8.44839266 15.531726,8.54166667 15.4166667,8.54166667" }),
                    react_1.default.createElement("path", { d: "M4.16666667,4.58333333 C4.5601133,4.05873783 5.17758895,3.75 5.83333333,3.75 C6.48907772,3.75 7.10655337,4.05873783 7.5,4.58333333" }))),
            react_1.default.createElement("svg", { width: "22px", height: "22px", viewBox: "0 0 22 22", role: "button", className: "yes stroke-current ml-2", "aria-label": "Yes, this page is helpful", onClick: function () { setHelpful(true); exports.postFeedback({ page: page, helpful: true }); } },
                react_1.default.createElement("g", { fill: "transparent" },
                    react_1.default.createElement("circle", { cx: "10", cy: "10", r: "9.58333333" }),
                    react_1.default.createElement("path", { d: "M5.41666667,8.125 C5.53172599,8.125 5.625,8.21827401 5.625,8.33333333 C5.625,8.44839266 5.53172599,8.54166667 5.41666667,8.54166667 C5.30160734,8.54166667 5.20833333,8.44839266 5.20833333,8.33333333 C5.20833333,8.21827401 5.30160734,8.125 5.41666667,8.125" }),
                    react_1.default.createElement("path", { d: "M14.5833333,8.125 C14.468274,8.125 14.375,8.21827401 14.375,8.33333333 C14.375,8.44839266 14.468274,8.54166667 14.5833333,8.54166667 C14.6983927,8.54166667 14.7916667,8.44839266 14.7916667,8.33333333 C14.7916667,8.21827401 14.6983927,8.125 14.5833333,8.125" }),
                    react_1.default.createElement("path", { d: "M13.2275,12.9166657 C13.4853075,12.9162808 13.7287776,13.035241 13.8869095,13.2388563 C14.0450415,13.4424715 14.1000278,13.7078123 14.0358333,13.9575 C13.562901,15.7999679 11.9021969,17.0882321 10,17.0882321 C8.09780311,17.0882321 6.43709903,15.7999679 5.96416667,13.9575 C5.89997223,13.7078123 5.95495852,13.4424715 6.11309045,13.2388563 C6.27122239,13.035241 6.51469246,12.9162808 6.7725,12.9166657 L13.2275,12.9166657 Z" })))));
    }
    else if (helpful === false) {
        colour = 'red';
        view = (react_1.default.createElement("div", { className: "p-2" },
            react_1.default.createElement("div", { className: "flex" },
                react_1.default.createElement("h1", { className: "flex-grow font-bold mb-2" }, "We're sorry to hear that..."),
                react_1.default.createElement("svg", { width: "14px", height: "22px", viewBox: "0 0 22 22", role: "button", className: "cancel stroke-current", "aria-label": "Cancel Feedback", onClick: function () { return setHelpful(undefined); } },
                    react_1.default.createElement("line", { x1: "19.5833333", y1: "0.416666667", x2: "0.416666667", y2: "19.5833333" }),
                    react_1.default.createElement("line", { x1: "19.5833333", y1: "19.5833333", x2: "0.416666667", y2: "0.416666667" }))),
            react_1.default.createElement("div", { className: "bg-white p-2 -mx-2 rounded-md" },
                react_1.default.createElement("p", { className: "mb-4 font-bold text-sm" }, "How could we improve this Graph App?"),
                Object.entries(reasons).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return react_1.default.createElement("div", { className: "mb-2 text-sm", key: key },
                        react_1.default.createElement("input", { className: "mr-2 h-4 w-4", id: "reason-" + key, name: "reason", type: "radio", value: key, checked: reason === key, onChange: function (e) { return setReason(e.currentTarget.value); } }),
                        react_1.default.createElement("label", { htmlFor: "reason-" + key }, value));
                }),
                react_1.default.createElement("div", { className: "my-2 text-sm" },
                    react_1.default.createElement("label", { htmlFor: "more", className: "font-bold mb-2" }, "More information"),
                    react_1.default.createElement("textarea", { id: "more", rows: 3, className: "border border-red-300 text-red-800 text-sm w-full p-2 rounded-sm outline-none focus:border-red-400", value: moreInformation, onChange: function (e) { return setMoreInformation(e.target.value); } }, moreInformation)),
                react_1.default.createElement("div", { className: "flex justify-between" },
                    react_1.default.createElement("button", { className: "px-4 py-1 border border-red-600 bg-red-600 text-white rounded-sm text-sm", onClick: function () { return handleSendFeedback(); } }, "Submit Feedback"),
                    react_1.default.createElement("button", { className: "px-4 py-1 border border-red-600 text-red-600 rounded-sm text-sm", onClick: function () { return setHelpful(undefined); } }, "Skip")))));
    }
    else if (helpful === true) {
        colour = 'green';
        view = (react_1.default.createElement("div", { className: "flex p-2 pb-4 font-bold" }, "Great! Thank you for your feedback!"));
    }
    return (react_1.default.createElement("div", { className: "fixed bottom-0 mx-4 -mb-2 p-2 rounded-md shadow-md bg-" + colour + "-200 text-" + colour + "-800", style: { width: '320px', right: '60px' } }, view));
};
