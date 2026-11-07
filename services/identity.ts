import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as netlify from '@netlify/identity';
export interface RuntimeConfig { provider:'supabase'|'netlify'|'unconfigured'; supabaseUrl?:string; supabasePublishableKey?:string; apiBaseUrl?:string }
let config:RuntimeConfig={provider:'unconfigured'};let client:SupabaseClient|undefined;let recovery=false;
export async function loadRuntimeConfig():Promise<RuntimeConfig>{
  try{const response=await fetch('/runtime-config.json',{cache:'no-store'});if(!response.ok)return config;const value=await response.json();
    if(value.provider==='supabase'){
      const url=new URL(value.supabaseUrl);const api=new URL(value.apiBaseUrl);
      if(url.protocol!=='https:'||api.protocol!=='https:'||url.origin!==api.origin||typeof value.supabasePublishableKey!=='string'||!value.supabasePublishableKey)throw new Error('Invalid public account configuration');
      config={provider:'supabase',supabaseUrl:url.origin,supabasePublishableKey:value.supabasePublishableKey,apiBaseUrl:api.href.replace(/\/$/,'')};
    }else if(value.provider==='netlify')config={provider:'netlify'};
  }catch{/* No demo accounts or credentials are substituted for missing configuration. */}
  return config;
}
function supabase(){
  if(!client){client=createClient(config.supabaseUrl!,config.supabasePublishableKey!,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});client.auth.onAuthStateChange(event=>{if(event==='PASSWORD_RECOVERY')recovery=true;});}
  return client;
}
function required(){if(config.provider==='unconfigured'){const error=new Error('Account services have not been connected.');error.name='MissingIdentityError';throw error;}}
const normalize=(user:any)=>({id:user.id,email:user.email,name:user.user_metadata?.full_name||'',confirmedAt:user.email_confirmed_at});
export async function getUser(){required();if(config.provider==='netlify')return netlify.getUser();const {data,error}=await supabase().auth.getUser();return error||!data.user?null:normalize(data.user);}
export async function accessToken(){if(config.provider!=='supabase')return null;const {data,error}=await supabase().auth.getSession();if(error)throw error;return data.session?.access_token||null;}
export async function login(email:string,password:string){required();if(config.provider==='netlify')return netlify.login(email,password);const {data,error}=await supabase().auth.signInWithPassword({email,password});if(error)throw error;return normalize(data.user);}
export async function signup(email:string,password:string,metadata:{full_name:string}){required();if(config.provider==='netlify')return netlify.signup(email,password,metadata);const {data,error}=await supabase().auth.signUp({email,password,options:{data:metadata,emailRedirectTo:window.location.origin+'/'}});if(error||!data.user)throw error||new Error('Signup failed');return normalize(data.user);}
export async function requestPasswordRecovery(email:string){required();if(config.provider==='netlify')return netlify.requestPasswordRecovery(email);const {error}=await supabase().auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/'});if(error)throw error;}
export async function updateUser(value:{password:string}){required();if(config.provider==='netlify')return netlify.updateUser(value);const {data,error}=await supabase().auth.updateUser(value);if(error)throw error;return normalize(data.user);}
export async function acceptInvite(token:string,password:string){required();if(config.provider==='netlify')return netlify.acceptInvite(token,password);throw new Error('Use the verified account confirmation flow.');}
export async function logout(){required();if(config.provider==='netlify')return netlify.logout();const {error}=await supabase().auth.signOut({scope:'global'});if(error)throw error;}
export async function handleAuthCallback():Promise<{type:string;token?:string}|null>{required();if(config.provider==='netlify')return netlify.handleAuthCallback();const {error}=await supabase().auth.getSession();if(error)throw error;if(recovery){recovery=false;return{type:'recovery'};}return null;}
