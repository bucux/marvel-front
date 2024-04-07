

import axios from "axios";
import { Gstr } from "./global";

export const getAxios = async(suffixe : string) => {
  try{
    const datas = await axios.get(
      Gstr.urlServer + suffixe,
      {
        headers: {'Authorization': `Bearer ${Gstr.token}`}
      }
    )
    return datas.data
  }catch(error: unknown) {
    if (axios.isAxiosError(error)) { 
      console.log(error.response?.data); 
    } else {
      console.log('Une erreur est survenue', error);
    }
  }
  return null
}

export const postAxios = async(suffixe : string, body: {[key: string] : string | undefined}) => { // post simple avec un body de keys/values 
  try{
    console.log(Gstr.urlServer + suffixe)
    const datas = await axios.post(
      Gstr.urlServer + suffixe, 
      body,
      {
        headers: { 'Authorization': `Bearer ${Gstr.token}`}
      }
    )
    return datas.data
  }catch(error: unknown) {
    if (axios.isAxiosError(error)) { 
      console.log(error.response?.data); 
    } else {
      console.log('Une erreur est survenue', error);
    }
  }
  return null
}

