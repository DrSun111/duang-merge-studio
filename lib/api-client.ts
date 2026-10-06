import {GameConfig,validate} from './game-config';
export const CLOUD_ORIGIN='https://duang-merge-studio.kasun11.chatgpt.site';
export const isGithub=()=>typeof window!=='undefined'&&window.location.hostname==='drsun111.github.io';
let adminToken='';
export function setAdminToken(token:string){adminToken=token}
export function requestHeaders(jsonBody=false){const h:Record<string,string>={};if(jsonBody)h['Content-Type']='application/json';if(isGithub()&&adminToken)h.Authorization='Bearer '+adminToken;return h}
export async function serviceFetch(path:string,options:RequestInit={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 try{return await fetch((isGithub()?CLOUD_ORIGIN:'')+'/api/'+path,{...options,signal:controller.signal})}
 catch{throw Error('无法连接云端服务，请检查网络后重试。游戏仍可使用本机配置运行。')}
 finally{clearTimeout(timer)}
}
export async function api(path:string,method='GET',data?:unknown){
 const r=await serviceFetch(path,{method,headers:requestHeaders(data!==undefined),body:data!==undefined?JSON.stringify(data):undefined});
 let b:{error?:string;config:GameConfig;version:number;authenticated:boolean;url:string;token?:string};
 try{b=await r.json()}catch{throw Error('云端服务暂时无法访问，请稍后重试。')}
 if(!r.ok)throw Error(b.error||'操作失败');return b;
}
const CACHE_KEY='duang-published-config-v1';
export function cachedConfig(){try{const b=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');if(!b||!Number.isInteger(b.version)||b.version<0)return null;validate(b.config);return b as {config:GameConfig;version:number}}catch{return null}}
export function cacheConfig(config:GameConfig,version:number){try{localStorage.setItem(CACHE_KEY,JSON.stringify({config,version}))}catch{}}
