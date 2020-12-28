"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var dotenv_1 = __importDefault(require("dotenv"));
var MConfig_1 = require("./models/MConfig");
var SDebts_1 = require("./services/SDebts");
var SPayments_1 = require("./services/SPayments");
var SPaymentPlans_1 = require("./services/SPaymentPlans");
var debts_1 = require("./debts");
dotenv_1.default.config();
function transformDebts(debts, paymentPlans, payments) {
    debts_1.mergeOnMDebt(debts, paymentPlans, payments);
    debts_1.addIsInPaymentPlan(debts);
    debts_1.addNextPaymentDueDate(debts);
    debts_1.addRemainingAmount(debts);
}
//transforms the objects to the desired output
function transformToOutputFormat(debts) {
    debts.forEach(function (dt) {
        //delete linked payment plans
        delete dt.paymentPlan;
        //format the data to the desired output
        if (dt.next_payment_due_date instanceof Date)
            dt.next_payment_due_date = dt.next_payment_due_date.toISOString();
        dt.remaining_amount = +dt.remaining_amount.toFixed(2);
    });
    return debts;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var config, _a, sDebts, sPayments, sPaymentPlans, _b, dataDebts, dataPayments, dataPaymentPlans, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    config = new MConfig_1.MConfig(process_1.default.env);
                    _a = [SDebts_1.getApi(config), SPayments_1.getApi(config), SPaymentPlans_1.getApi(config)], sDebts = _a[0], sPayments = _a[1], sPaymentPlans = _a[2];
                    return [4 /*yield*/, Promise.all([sDebts.listAll(), sPayments.listAll(), sPaymentPlans.listAll()])];
                case 1:
                    _b = _c.sent(), dataDebts = _b[0], dataPayments = _b[1], dataPaymentPlans = _b[2];
                    transformDebts(dataDebts, dataPaymentPlans, dataPayments);
                    transformToOutputFormat(dataDebts);
                    dataDebts.forEach(function (dt) {
                        console.log(JSON.stringify(dt));
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _c.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=main.js.map