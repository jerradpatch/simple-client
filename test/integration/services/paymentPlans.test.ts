import { expect } from "chai";
import axios from "axios";
import * as fse from "fs-extra";

import {clearInstance, getApi} from "../../../src/services/SPaymentPlans";
import {MConfig} from "../../../src/models/MConfig";
import MockAdapter from "axios-mock-adapter";
import {MPaymentPlan} from "../../../src/models/MPaymentPlan";
import {testConfig} from "./consts";

describe("tests the PaymentPlans api", () => {

  afterEach(()=>{
    clearInstance();
  });

  it("listAll, it should return the data as expected", async () => {
    let api = getApi(testConfig);
    let pp: MPaymentPlan[] = await api.listAll();

    expect(pp).to.eql(testData);
  });
});

const testData = [
  {
    "amount_to_pay": 102.5,
    "debt_id": 0,
    "id": 0,
    "installment_amount": 51.25,
    "installment_frequency": "WEEKLY",
    "start_date": new Date("2020-09-28")
  },
  {
    "amount_to_pay": 100,
    "debt_id": 1,
    "id": 1,
    "installment_amount": 25,
    "installment_frequency": "WEEKLY",
    "start_date": new Date("2020-08-01")
  },
  {
    "amount_to_pay": 4920.34,
    "debt_id": 2,
    "id": 2,
    "installment_amount": 1230.085,
    "installment_frequency": "BI_WEEKLY",
    "start_date": new Date("2020-01-01")
  },
  {
    "amount_to_pay": 4312.67,
    "debt_id": 3,
    "id": 3,
    "installment_amount": 1230.085,
    "installment_frequency": "WEEKLY",
    "start_date": new Date("2020-08-01")
  }
]
