import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { createSupabaseHandler } from './supabase-handler';
declare const Deno:{env:{get:(name:string)=>string|undefined};serve:(handler:(request:Request)=>Promise<Response>)=>unknown};
const origin=Deno.env.get('APP_ORIGIN')||'https://lifestyle.radiantsparkllc.com';
const key=Deno.env.get('STRIPE_SECRET_KEY')||'';
const admin=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false,autoRefreshToken:false}});
let stripe:Stripe|undefined;
Deno.serve(createSupabaseHandler({origin,admin,ready:/^(sk|rk)_(live|test)_/.test(key),stripe:()=>stripe||=new Stripe(key,{httpClient:Stripe.createFetchHttpClient(),maxNetworkRetries:2,timeout:10000})}));
