"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FREQUENCY;
(function (FREQUENCY) {
    FREQUENCY["DAILY"] = "DAILY";
    FREQUENCY["WEEKLY"] = "WEEKLY";
    FREQUENCY["BIWEEKLY"] = "BIWEEKLY";
})(FREQUENCY = exports.FREQUENCY || (exports.FREQUENCY = {}));
exports.DEFAULT_FEQUENCY = FREQUENCY.WEEKLY;
exports.frequencyToDays = {
    DAILY: 1,
    WEEKLY: 7,
    BIWEEKLY: 14
};
//# sourceMappingURL=constants.js.map