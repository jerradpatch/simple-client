
interface Env {
  BASE_API_URL: string
}

export class MConfig {

  baseAPiUrl: string;

  constructor(env: Env | any){
    if(env.BASE_API_URL)
      this.baseAPiUrl = env.BASE_API_URL;
    else
      throw new Error('BASE_API_URL must be defined')
  }
}