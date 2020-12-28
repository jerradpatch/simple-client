import { expect } from "chai";
import axios from "axios";
import * as fse from "fs-extra";

import {clearInstance, getApi} from "../../../src/services/SDebts";
import {MConfig} from "../../../src/models/MConfig";
import MockAdapter from "axios-mock-adapter";
import {MDebt} from "../../../src/models/MDebt";

describe("tests the debts api", () => {

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
      mock.onGet("/debts").reply(function () {
        return [200, testData];
      });

      let debtApi = getApi(testConfig);
      let debts: MDebt[] = await debtApi.listAll();

      expect(debts).to.eql(testData);
    } finally {
      mock?.reset();
    }
  });
});


const testData = [
  {
    "amount": 123.46,
    "id": 0
  }, {
    "amount": 100,
    "id": 1
  },{
    "amount": 4920.34,
    "id": 2
  },{
    "amount": 12938,
    "id": 3
  },{
    "amount": 9238.02,
    "id": 4
  }
]