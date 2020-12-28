import {MConfig} from "../models/MConfig";
import axios, {AxiosResponse} from "axios";
import {MPaymentPlan} from "../models/MPaymentPlan";

//single static class used by all controllers
class SPaymentPlans {

  constructor(private config: MConfig){}

  listAll(): Promise<MPaymentPlan[]> {
    return axios({
      url: '/payment_plans',
      baseURL: this.config.baseAPiUrl,
    }).then((r:AxiosResponse)=>{
      r.data.forEach((d: any)=> {
        if (d.start_date)
          d.start_date = new Date(d.start_date);
      });
      return r.data
    });
  }
}

let inst: SPaymentPlans | undefined;

export function clearInstance(){
  inst = undefined;
}
//returns the instance
export function getApi(mConfig?: MConfig): SPaymentPlans {
  if(mConfig) {
    inst = new SPaymentPlans(mConfig);
    return inst;
  }

  if(!mConfig && inst)
    return inst;
  throw new Error("the api must receive a configuration before it can be used");
}
