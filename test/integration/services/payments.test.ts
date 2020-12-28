import { expect } from "chai";
import axios from "axios";

import {clearInstance, getApi} from "../../../src/services/Spayments";
import {MPayment} from "../../../src/models/MPayment";
import {testConfig} from "./consts";

describe("tests the payments api", () => {

  afterEach(()=>{
    clearInstance();
  });

  it("listAll, it should return the data as expected", async () => {
    let api = getApi(testConfig);
    let paymentsRec: MPayment[] = await api.listAll();

    expect(paymentsRec).to.eql(testData);
  });
});

const testData = [
  {
    "amount": 51.25,
    "date": "2020-09-29",
    "payment_plan_id": 0
  },
  {
    "amount": 51.25,
    "date": "2020-10-29",
    "payment_plan_id": 0
  },
  {
    "amount": 25,
    "date": "2020-08-08",
    "payment_plan_id": 1
  },
  {
    "amount": 25,
    "date": "2020-08-08",
    "payment_plan_id": 1
  },
  {
    "amount": 4312.67,
    "date": "2020-08-08",
    "payment_plan_id": 2
  },
  {
    "amount": 1230.085,
    "date": "2020-01-02",
    "payment_plan_id": 3
  },
  {
    "amount": 1230.085,
    "date": "2020-01-15",
    "payment_plan_id": 3
  },
  {
    "amount": 1230.085,
    "date": "2020-02-14",
    "payment_plan_id": 3
  }
].map(a=>{
  a.date = new Date(a.date) as any
  return a;
})
