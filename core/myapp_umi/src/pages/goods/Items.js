"use strict";
exports.__esModule = true;
var react_1 = require("react");
var umi_1 = require("umi");
var Items = function () {
    var history = umi_1.useHistory();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("button", { onClick: function () {
                history.push("/details/" + 123456);
            } }, "Click")));
};
exports["default"] = Items;
