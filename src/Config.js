import {getUsername} from './oAuth';

{/*export const serverUrl = "http://211.57.201.165:8080/api";*/}
{/*export const imgUrl = "http://" + location.host;*/}
export const serverUrl = "https://nexybit.com/api";
export const imgUrl = "https://" + location.host;

export const requestSuccess = () => {
  sessionStorage.setItem("errorCount",0);
}

export const requestFailure = () => {
  sessionStorage.setItem("errorCount",(sessionStorage.getItem("errorCount")*1)+1);
  return sessionStorage.getItem("errorCount");
}

export const requestCheck = () => {
  if(sessionStorage.getItem("errorCount")<=10 && getUsername()!=null){
    return true;
  }else{
    return false;
  }
}
