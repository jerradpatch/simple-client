import { expect } from "chai";
import axios from "axios";
import * as fse from "fs-extra";

import {clearInstance, getApi} from "../../../src/services/SDebts";
import {MConfig} from "../../../src/models/MConfig";
import MockAdapter from "axios-mock-adapter";
import {MDebt} from "../../../src/models/MDebt";
import {testConfig} from "./consts";

describe("tests the debts api", () => {

  afterEach(()=>{
    clearInstance();
  });

  it("listAll, it should return the data as expected", async () => {

      let debtApi = getApi(testConfig);
      let debts: MDebt[] = await debtApi.listAll();

      expect(debts).to.eql(testData);
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
