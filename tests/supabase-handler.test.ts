import test from 'node:test';import assert from 'node:assert/strict';
import {createSupabaseHandler} from '../server/supabase-handler';
const origin='https://lifestyle.radiantsparkllc.com';const url='https://example.supabase.co/functions/v1/membership/';
function fixture(options:{user?:any;ready?:boolean;allowed?:boolean}={}){
  let verifiedToken='';
  const admin={auth:{getUser:async(token:string)=>{verifiedToken=token;return{data:{user:options.user===undefined?{id:'user_1',email:'member@example.com',email_confirmed_at:'2026-11-01',user_metadata:{full_name:'Member'}}:options.user},error:null};}},rpc:async()=>({data:options.allowed!==false,error:null}),from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:null,error:null})})})})};
  const handler=createSupabaseHandler({origin,admin:admin as any,stripe:()=>({}) as any,ready:options.ready!==false});
  const request=(path:string,headers:Record<string,string>={},method='GET')=>handler(new Request(url+path,{method,headers:{origin,...headers}}));
  return{request,token:()=>verifiedToken};
}
test('Supabase config is public but contains no secrets',async()=>{const response=await fixture({ready:false}).request('config');assert.equal(response.status,200);assert.deepEqual(await response.json(),{membershipReady:false,billingCurrency:'USD'});});
test('cross-origin requests are rejected',async()=>{assert.equal((await fixture().request('config',{origin:'https://other.example'})).status,403);});
test('CORS preflight permits only the configured website',async()=>{const response=await fixture().request('me',{},'OPTIONS');assert.equal(response.status,204);assert.equal(response.headers.get('Access-Control-Allow-Origin'),origin);});
test('missing or unconfirmed sessions are denied before accessing billing records',async()=>{assert.equal((await fixture().request('me')).status,401);assert.equal((await fixture({user:null}).request('me',{Authorization:'Bearer arbitrary'})).status,401);assert.equal((await fixture({user:{id:'user_1'}}).request('me',{Authorization:'Bearer arbitrary'})).status,401);});
test('the token is checked with the Auth server, not trusted from browser claims',async()=>{const f=fixture();const response=await f.request('me',{Authorization:'Bearer signed-user-jwt'});assert.equal(response.status,200);assert.equal(f.token(),'signed-user-jwt');const body=await response.json();assert.equal(body.user.id,'user_1');assert.equal(body.subscription,null);});
test('rate limits are enforced after authoritative user verification',async()=>{const response=await fixture({allowed:false}).request('me',{Authorization:'Bearer signed-user-jwt'});assert.equal(response.status,429);});
test('unconfigured backend does not claim that checkout works',async()=>{assert.equal((await fixture({ready:false}).request('checkout',{Authorization:'Bearer signed-user-jwt'})).status,503);});
