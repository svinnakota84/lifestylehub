import type { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import { createApi } from './api';
interface Dependencies { origin:string; admin:SupabaseClient; stripe:()=>Stripe; ready:boolean }
export function createSupabaseHandler(deps:Dependencies){
  return async(request:Request):Promise<Response>=>{
    const origin=request.headers.get('origin');
    const cors={'Access-Control-Allow-Origin':deps.origin,'Access-Control-Allow-Headers':'authorization, apikey, content-type','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Vary':'Origin','Cache-Control':'private, no-store'};
    const json=(value:unknown,status=200)=>Response.json(value,{status,headers:cors});
    if(origin!==deps.origin)return json({error:'Origin not permitted.'},403);
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
    const path=new URL(request.url).pathname.split('/membership/')[1]||'';
    if(path==='config'&&request.method==='GET')return json({membershipReady:deps.ready,billingCurrency:'USD'});
    if(!deps.ready)return json({error:'Secure account and billing services are not connected yet.'},503);
    try{
      const token=request.headers.get('authorization')?.match(/^Bearer ([^\s]+)$/)?.[1];
      if(!token)return json({error:'Sign in to continue.'},401);
      // Authoritative Auth server lookup, never decode-and-trust browser claims.
      const {data,error}=await deps.admin.auth.getUser(token);
      if(error||!data.user?.email_confirmed_at)return json({error:'Sign in with a confirmed email.'},401);
      const user=data.user;
      const {data:allowed,error:limitError}=await deps.admin.rpc('consume_membership_request',{p_user_id:user.id});
      if(limitError)throw limitError;
      if(!allowed)return json({error:'Too many requests. Try again shortly.'},429);
      const store={
        get:async(key:string)=>{if(key!==`customers/${user.id}`)throw new Error('Wrong account');const {data,error}=await deps.admin.from('membership_customers').select('stripe_customer_id').eq('user_id',user.id).maybeSingle();if(error)throw error;return data?{id:data.stripe_customer_id}:null;},
        setJSON:async(key:string,value:{id:string})=>{if(key!==`customers/${user.id}`)throw new Error('Wrong account');const {error}=await deps.admin.from('membership_customers').insert({user_id:user.id,stripe_customer_id:value.id});if(error?.code==='23505')return{modified:false};if(error)throw error;return{modified:true};}
      };
      const url=new URL(request.url);url.pathname=`/api/${path}`;
      const rewritten=new Request(url,{method:request.method,headers:request.headers,body:['GET','HEAD'].includes(request.method)?undefined:await request.text()});
      const response=await createApi({origin:deps.origin,getUser:async()=>({id:user.id,email:user.email,name:user.user_metadata?.full_name||'',confirmedAt:user.email_confirmed_at}),getStripe:deps.stripe,getStore:()=>store as any})(rewritten);
      const headers=new Headers(response.headers);for(const [key,value]of Object.entries(cors))headers.set(key,value);
      return new Response(response.body,{status:response.status,headers});
    }catch{return json({error:'Account or billing service unavailable. Please try again.'},503);}
  };
}
