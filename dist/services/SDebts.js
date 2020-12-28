"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
//single static class used by all controllers
var SDebit = /** @class */ (function () {
    function SDebit(config) {
        this.config = config;
    }
    SDebit.prototype.listAll = function () {
        return axios_1.default({
            url: '/debts',
            baseURL: this.config.baseAPiUrl,
        }).then(function (r) { return r.data; });
    };
    return SDebit;
}());
exports.SDebit = SDebit;
var sDebit;
function clearInstance() {
    sDebit = undefined;
}
exports.clearInstance = clearInstance;
//returns the instance
function getApi(mConfig) {
    if (mConfig) {
        sDebit = new SDebit(mConfig);
        return sDebit;
    }
    if (!mConfig && sDebit)
        return sDebit;
    throw new Error("the api must receive a configuration before it can be used");
}
exports.getApi = getApi;
//# sourceMappingURL=SDebts.js.map