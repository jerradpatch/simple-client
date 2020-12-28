import {FREQUENCY} from "./constants";

export class MPaymentPlan {
  id: number;
  debt_id: number;
  amount_to_pay: number;
  installment_frequency: FREQUENCY;
  installment_amount: number;
  start_date: Date;
}