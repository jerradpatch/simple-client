import process from 'process';
import dotenv from 'dotenv';
import {MConfig} from "./models/MConfig";
import {getApi as dApi} from "./services/SDebts";
import {getApi as pApi} from "./services/SPayments";
import {getApi as ppApi} from "./services/SPaymentPlans";
import {
  addIsInPaymentPlan,
  addNextPaymentDueDate,
  addRemainingAmount,
  MDebtJoined,
  mergeOnMDebt,
  MOutputDebt
} from "./debts";
import {MDebt} from "./models/MDebt";
import {MPaymentPlan} from "./models/MPaymentPlan";
import {MPayment} from "./models/MPayment";

dotenv.config();

function transformDebts(debts: MDebt[], paymentPlans: MPaymentPlan[], payments: MPayment[]): void {
  mergeOnMDebt(debts, paymentPlans, payments);
  addIsInPaymentPlan(debts);
  addNextPaymentDueDate(debts);
  addRemainingAmount(debts);
}

//transforms the objects to the desired output
function transformToOutputFormat(debts: (MDebtJoined & MOutputDebt)[]): MOutputDebt[] {
  debts.forEach(dt=>{
    //delete linked payment plans
    delete dt.paymentPlan;
    //format the data to the desired output
    if(dt.next_payment_due_date instanceof Date)
      dt.next_payment_due_date = dt.next_payment_due_date.toISOString();
    dt.remaining_amount = +dt.remaining_amount.toFixed(2)
  });
  return debts;
}

export async function main(){
  try {
    const config = new MConfig(process.env);
    const [sDebts, sPayments, sPaymentPlans] = [dApi(config), pApi(config), ppApi(config)];
    const [dataDebts, dataPayments, dataPaymentPlans] =
      await Promise.all([sDebts.listAll(), sPayments.listAll(), sPaymentPlans.listAll()]);

    transformDebts(dataDebts, dataPaymentPlans, dataPayments);
    transformToOutputFormat(dataDebts as (MDebtJoined & MOutputDebt)[]);

    dataDebts.forEach(dt => {
      console.log(JSON.stringify(dt));
    });
  } catch(e) {
    console.log(e);
  }
}
