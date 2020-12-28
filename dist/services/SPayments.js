"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
//single static class used by all controllers
var SPayments = /** @class */ (function () {
    function SPayments(config) {
        this.config = config;
    }
    SPayments.prototype.listAll = function () {
        return axios_1.default({
            url: '/payments',
            baseURL: this.config.baseAPiUrl,
        }).then(function (r) {
            r.data.forEach(function (d) {
                if (d.date)
                    d.date = new Date(d.date);
            });
            return r.data;
        });
    };
    return SPayments;
}());
var inst;
function clearInstance() {
    inst = undefined;
}
exports.clearInstance = clearInstance;
//returns the instance
function getApi(mConfig) {
    if (mConfig) {
        inst = new SPayments(mConfig);
        return inst;
    }
    if (!mConfig && inst)
        return inst;
    throw new Error("the api must receive a configuration before it can be used");
}
exports.getApi = getApi;
//# sourceMappingURL=SPayments.js.map