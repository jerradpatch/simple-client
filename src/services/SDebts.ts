import {MConfig} from "../models/MConfig";
import {MDebt} from "../models/MDebt";
import axios, {AxiosResponse} from "axios";

//single static class used by all controllers
export class SDebit {

  constructor(private config: MConfig){}

  listAll(): Promise<MDebt[]> {
    return axios({
      url: '/debts',
      baseURL: this.config.baseAPiUrl,
    }).then((r:AxiosResponse)=>r.data);
  }
}

let sDebit: SDebit | undefined;

export function clearInstance(){
  sDebit = undefined;
}
//returns the instance
export function getApi(mConfig?: MConfig): SDebit {
  if(mConfig) {
    sDebit = new SDebit(mConfig);
    return sDebit;
  }

  if(!mConfig && sDebit)
    return sDebit;
  throw new Error("the api must receive a configuration before it can be used");
}
