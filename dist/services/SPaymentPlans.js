"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
//single static class used by all controllers
var SPaymentPlans = /** @class */ (function () {
    function SPaymentPlans(config) {
        this.config = config;
    }
    SPaymentPlans.prototype.listAll = function () {
        return axios_1.default({
            url: '/payment_plans',
            baseURL: this.config.baseAPiUrl,
        }).then(function (r) {
            r.data.forEach(function (d) {
                if (d.start_date)
                    d.start_date = new Date(d.start_date);
            });
            return r.data;
        });
    };
    return SPaymentPlans;
}());
var inst;
function clearInstance() {
    inst = undefined;
}
exports.clearInstance = clearInstance;
//returns the instance
function getApi(mConfig) {
    if (mConfig) {
        inst = new SPaymentPlans(mConfig);
        return inst;
    }
    if (!mConfig && inst)
        return inst;
    throw new Error("the api must receive a configuration before it can be used");
}
exports.getApi = getApi;
//# sourceMappingURL=SPaymentPlans.js.map