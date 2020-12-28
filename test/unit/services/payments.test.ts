import { expect } from "chai";
import axios from "axios";

import {clearInstance, getApi} from "../../../src/services/Spayments";
import {MConfig} from "../../../src/models/MConfig";
import MockAdapter from "axios-mock-adapter";
import {MPayment} from "../../../src/models/MPayment";

describe("tests the payments api", () => {

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

  it("listAll, it should return the data as expected", async () => {
    let mock;

    try {
      mock = new MockAdapter(axios);
      let testData = paymentsExpected;
      mock.onGet("/payments").reply(function () {
        return [200, testData];
      });

      let api = getApi(testConfig);
      let paymentsRec: MPayment[] = await api.listAll();

      expect(paymentsRec).to.eql(testData);
    } finally {
      mock?.reset();
    }
  });
});

const paymentsExpected = [
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
