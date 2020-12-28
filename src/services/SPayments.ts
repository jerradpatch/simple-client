import {MConfig} from "../models/MConfig";
import axios, {AxiosResponse} from "axios";
import {MPayment} from "../models/MPayment";

//single static class used by all controllers
class SPayments {

  constructor(private config: MConfig){}

  listAll(): Promise<MPayment[]> {
    return axios({
      url: '/payments',
      baseURL: this.config.baseAPiUrl,
    }).then((r:AxiosResponse)=>{
      r.data.forEach((d: any)=> {
        if (d.date)
          d.date = new Date(d.date);
      });
      return r.data;
    });
  }
}

let inst: SPayments | undefined;

export function clearInstance(){
  inst = undefined;
}
//returns the instance
export function getApi(mConfig?: MConfig): SPayments {
  if(mConfig) {
    inst = new SPayments(mConfig);
    return inst;
  }

  if(!mConfig && inst)
    return inst;
  throw new Error("the api must receive a configuration before it can be used");
}
