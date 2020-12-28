import { expect } from "chai";
import axios from "axios";
import * as fse from "fs-extra";

import {clearInstance, getApi} from "../../../src/services/SPaymentPlans";
import {MConfig} from "../../../src/models/MConfig";
import MockAdapter from "axios-mock-adapter";
import {MPaymentPlan} from "../../../src/models/MPaymentPlan";

describe("tests the PaymentPlans api", () => {

  const testEnvConfig = {"BASE_API_URL": 'http://testEndpoint'};
  const testConfig = new MConfig(testEnvConfig);

  afterEach(()=>{
    clearInstance();
  });
  
  describe("getApi, should function as expected ", () => {

    it("instance config, should throw when no config is passed", (done) => {
      try {
        getApi();
        done(new Error('should have thrown an error'));
      } catch(e){
        done();
      }
    });

    it("instance config, it should have not thrown an error after a config was passed", (done) => {
      getApi(testConfig);
      done();
    });

    it("instance config, after configuration the same instance should be returned", (done) => {
      let api1 = getApi(testConfig);
      let api2 = getApi();
      expect(api1).to.be.eq(api2);
      done();
    });
  });

  it("listAll a, it should return the data as expected", async () => {
    let mock;

    try {
      mock = new MockAdapter(axios);
      let testData = paymentPlans;
      mock.onGet("/payment_plans").reply(function () {
        return [200, testData];
      });

      let api = getApi(testConfig);
      let pp: MPaymentPlan[] = await api.listAll();

      expect(pp).to.eql(testData);
    } finally {
      mock?.reset();
    }
  });
});

const paymentPlans = [
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
