import {MPaymentPlan} from "./models/MPaymentPlan";
import {MPayment} from "./models/MPayment";
import {MDebt} from "./models/MDebt";
import {DEFAULT_FEQUENCY, frequencyToDays} from "./models/constants";

// MDebt <- MPaymentPlan <- MPayment

interface MPaymentPlanJoined extends MPaymentPlan {
  payments?: MPayment[];
}

export interface MDebtJoined extends MDebt {
  paymentPlan?: MPaymentPlanJoined;
}

export interface MOutputDebt extends MDebt {
  is_in_payment_plan: boolean;
  remaining_amount: number;
  next_payment_due_date: Date | string;
}

//merge everything to the left since all the answers need to be done on the debt model which is at the root
// of the joined structure
export function mergeOnMDebt(debts: MDebt[], paymentPlans: MPaymentPlan[], payments: MPayment[]): void {
  //payments by payment plan id, quick look up hash table
  const paymentsByPaymentPlanId = payments.reduce((acc,c: MPayment)=>{
    let sortedPayments = acc[c.payment_plan_id] || [] as MPayment[];
    sortedPayments.push(c);
    acc[c.payment_plan_id] = sortedPayments;
    return acc;
  }, {} as {[paymentPlanId: number]: MPayment[]});

  //assumes there is only a single payment plan for a given debt
  const paymentPlansByDebtId = paymentPlans.reduce((acc,c: MPaymentPlan)=>{
    acc[c.debt_id] = c;
    return acc;
  }, {} as {[debt_id: number]: MPaymentPlan});

  //associate payments to payment plans
  (paymentPlans as MPaymentPlanJoined[]).forEach((pp)=>{
    const paymentPlanId = pp.id;
    pp.payments = paymentsByPaymentPlanId[paymentPlanId] || [];
  });

  //associate payment plans to debts
  (debts as MDebtJoined[]).forEach((dt)=>{
    const debtId = dt.id;
    dt.paymentPlan = paymentPlansByDebtId[debtId] as MPaymentPlanJoined;
  });

  //the original debts array is now a MDebtJoined array,
  //from here we can derive keys such as
  // isInPaymentPlan, remaining amount, and next payment due

}

//adds the is_in_payments_plan key to the debts
export function addIsInPaymentPlan(joinDebts: MDebtJoined[]): void {
  joinDebts.forEach((dt=>{
    (dt as unknown as MOutputDebt).is_in_payment_plan = !!dt.paymentPlan;
  }))
}

export function addRemainingAmount(joinDebts: MDebtJoined[]): void {
  joinDebts.forEach((dt=>{
    //if payment plan or payments dont exist use an empty array that will mean there have been no payments
    const payments = (dt.paymentPlan?.payments) || [];
    //sum the total payments or 0 if the array is empty
    const totalPayments = payments.reduce((acc, c)=> acc += c.amount, 0);
    //if debt - total payments is less than 0 then just set remaining amount to 0;
    (dt as unknown as MOutputDebt).remaining_amount = Math.max(0, dt.amount - totalPayments);
  }))
}

export function addNextPaymentDueDate(joinDebts: MDebtJoined[]): void {

  joinDebts.forEach(dt=>{
    //if no payment plan then today is the start date;
    const startDate: Date = dt.paymentPlan?.start_date || new Date();
    const dayDue = startDate.getDay();
    const days = frequencyToDays[dt.paymentPlan?.installment_frequency || DEFAULT_FEQUENCY]
    let dateDue = new Date();
    addDays(dateDue, days);
    (dt as unknown as MOutputDebt).next_payment_due_date = dateDue;
  })

}

function addDays(date: Date, days: number) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}