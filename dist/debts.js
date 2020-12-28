"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./models/constants");
//merge everything to the left since all the answers need to be done on the debt model which is at the root
// of the joined structure
function mergeOnMDebt(debts, paymentPlans, payments) {
    //payments by payment plan id, quick look up hash table
    var paymentsByPaymentPlanId = payments.reduce(function (acc, c) {
        var sortedPayments = acc[c.payment_plan_id] || [];
        sortedPayments.push(c);
        acc[c.payment_plan_id] = sortedPayments;
        return acc;
    }, {});
    //assumes there is only a single payment plan for a given debt
    var paymentPlansByDebtId = paymentPlans.reduce(function (acc, c) {
        acc[c.debt_id] = c;
        return acc;
    }, {});
    //associate payments to payment plans
    paymentPlans.forEach(function (pp) {
        var paymentPlanId = pp.id;
        pp.payments = paymentsByPaymentPlanId[paymentPlanId] || [];
    });
    //associate payment plans to debts
    debts.forEach(function (dt) {
        var debtId = dt.id;
        dt.paymentPlan = paymentPlansByDebtId[debtId];
    });
    //the original debts array is now a MDebtJoined array,
    //from here we can derive keys such as
    // isInPaymentPlan, remaining amount, and next payment due
}
exports.mergeOnMDebt = mergeOnMDebt;
//adds the is_in_payments_plan key to the debts
function addIsInPaymentPlan(joinDebts) {
    joinDebts.forEach((function (dt) {
        dt.is_in_payment_plan = !!dt.paymentPlan;
    }));
}
exports.addIsInPaymentPlan = addIsInPaymentPlan;
function addRemainingAmount(joinDebts) {
    joinDebts.forEach((function (dt) {
        var _a;
        //if payment plan or payments dont exist use an empty array that will mean there have been no payments
        var payments = ((_a = dt.paymentPlan) === null || _a === void 0 ? void 0 : _a.payments) || [];
        //sum the total payments or 0 if the array is empty
        var totalPayments = payments.reduce(function (acc, c) { return acc += c.amount; }, 0);
        //if debt - total payments is less than 0 then just set remaining amount to 0;
        dt.remaining_amount = Math.max(0, dt.amount - totalPayments);
    }));
}
exports.addRemainingAmount = addRemainingAmount;
function addNextPaymentDueDate(joinDebts) {
    joinDebts.forEach(function (dt) {
        var _a, _b;
        //if no payment plan then today is the start date;
        var startDate = ((_a = dt.paymentPlan) === null || _a === void 0 ? void 0 : _a.start_date) || new Date();
        var dayDue = startDate.getDay();
        var days = constants_1.frequencyToDays[((_b = dt.paymentPlan) === null || _b === void 0 ? void 0 : _b.installment_frequency) || constants_1.DEFAULT_FEQUENCY];
        var dateDue = new Date();
        addDays(dateDue, days);
        dt.next_payment_due_date = dateDue;
    });
}
exports.addNextPaymentDueDate = addNextPaymentDueDate;
function addDays(date, days) {
    var copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
}
//# sourceMappingURL=debts.js.map