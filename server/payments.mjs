import {createHmac,timingSafeEqual,randomUUID} from 'node:crypto';
import Stripe from 'stripe';
import {getStore} from '@netlify/blobs';

export const PLAN_AMOUNTS={essentials:999,plus:1999,coach:3499};
export const COOKIE_NAME='__Host-lifestyle_membership';
export const idOf=value=>typeof value==='string'?value:value?.id;
export function paymentConfig(env=process.env){
 let site;try{site=new URL(env.PAYMENTS_SITE_URL);}catch{return null;}
 if(site.protocol!=='https:'||site.username||site.password||site.search||site.hash||site.pathname!=='/')return null;
 const key=env.STRIPE_RESTRICTED_KEY||env.STRIPE_SECRET_KEY;
 if(env.PAYMENTS_ENABLED!=='true'||!key||!env.STRIPE_WEBHOOK_SECRET||!env.MEMBERSHIP_COOKIE_SECRET||env.MEMBERSHIP_COOKIE_SECRET.length<32)return null;
 const prices=Object.fromEntries(Object.keys(PLAN_AMOUNTS).map(plan=>[plan,env[`STRIPE_PRICE_${plan.toUpperCase()}`]]));
 if(Object.values(prices).some(id=>typeof id!=='string'||!id.startsWith('price_')))return null;
 return {site:site.origin,key,prices,cookieSecret:env.MEMBERSHIP_COOKIE_SECRET,webhookSecret:env.STRIPE_WEBHOOK_SECRET};
}
export function signSession(sessionId,secret,now=Date.now()){
 const payload=Buffer.from(JSON.stringify({id:sessionId,exp:now+30*86400000})).toString('base64url');
 return `${payload}.${createHmac('sha256',secret).update(payload).digest('base64url')}`;
}
export function verifySession(token,secret,now=Date.now()){
 try{const [body,signature,...extra]=token.split('.');if(!body||!signature||extra.length)return null;
 const expected=createHmac('sha256',secret).update(body).digest('base64url');const a=Buffer.from(signature),b=Buffer.from(expected);
 if(a.length!==b.length||!timingSafeEqual(a,b))return null;
 const data=JSON.parse(Buffer.from(body,'base64url').toString());
 return typeof data.id==='string'&&data.id.startsWith('cs_')&&Number.isFinite(data.exp)&&data.exp>now?data.id:null;
 }catch{return null;}
}
export function readSession(request,secret){
 const entry=(request.headers.get('cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(`${COOKIE_NAME}=`));
 return entry?verifySession(entry.slice(COOKIE_NAME.length+1),secret):null;
}
export const cookie=(sessionId,secret)=>`${COOKIE_NAME}=${signSession(sessionId,secret)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000`;
export const json=(status,body,headers={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
export function validOrigin(request,config){const origin=request.headers.get('origin');return origin===config.site;}
export const createClient=config=>new Stripe(config.key,{timeout:15000,maxNetworkRetries:1});
export const paymentStore=()=>getStore({name:'lifestyle-payments',consistency:'strong'});
export function validPrice(price,plan){return price&&price.active===true&&price.currency==='usd'&&price.type==='recurring'&&price.recurring?.interval==='month'&&price.recurring?.interval_count===1&&price.unit_amount===PLAN_AMOUNTS[plan];}
export const lookupPlan=(priceId,prices)=>Object.keys(prices).find(k=>prices[k]===priceId);
export async function retrieveOwnedSession(request,config,stripe,store){
 const sessionId=readSession(request,config.cookieSecret);if(!sessionId)return null;
 const owned=await store.get(`checkout/${sessionId}`,{type:'json'});if(!owned)return null;
 const session=await stripe.checkout.sessions.retrieve(sessionId,{expand:['subscription','subscription.latest_invoice']});
 if(session.mode!=='subscription'||session.metadata?.application!=='lifestylehub'||session.id!==sessionId)return null;
 return {session,owned};
}
/** @param {Request} request
 * @param {{env?:Record<string,string|undefined>,stripe?:any,store?:any}} [dependencies] */
export async function createCheckout(request,{env=process.env,stripe,store}={}){
 const config=paymentConfig(env);if(!config)return json(503,{error:'Secure checkout is not connected yet. No payment has been taken.'});
 if(request.method!=='POST')return json(405,{error:'Method not allowed.'});
 if(!validOrigin(request,config))return json(403,{error:'Checkout must start on the Lifestyle Hub website.'});
 if(!request.headers.get('content-type')?.includes('application/json'))return json(415,{error:'Expected JSON.'});
 const raw=await request.text();if(Buffer.byteLength(raw)>4096)return json(413,{error:'Request too large.'});
 let input;try{input=JSON.parse(raw);}catch{return json(400,{error:'Invalid request.'});}
 if(!Object.hasOwn(PLAN_AMOUNTS,input.plan)||typeof input.name!=='string'||input.name.trim().length<1||input.name.length>120||typeof input.email!=='string'||input.email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)||input.termsAccepted!==true)return json(400,{error:'Choose a plan and enter your own name, email and consent.'});
 stripe||=createClient(config);store||=paymentStore();
 // A real, reachable state store and tax configuration are required before creating checkout.
 await store.get('readiness');
 const [price,settings,registrations]=await Promise.all([stripe.prices.retrieve(config.prices[input.plan]),stripe.tax.settings.retrieve(),stripe.tax.registrations.list({status:'active',limit:100})]);
 if(!validPrice(price,input.plan))return json(503,{error:'The plan’s active monthly USD price is not configured correctly. No payment has been taken.'});
 if(settings.status!=='active'||!registrations.data.length)return json(503,{error:'Tax collection setup is incomplete. Checkout is unavailable; no payment has been taken.'});
 const letters=Array.from({length:8},()=>String.fromCharCode(97+Math.floor(Math.random()*26))).join('');
 const session=await stripe.checkout.sessions.create({
  mode:'subscription',line_items:[{price:price.id,quantity:1}],customer_email:input.email.trim(),
  currency:'usd',adaptive_pricing:{enabled:false},automatic_tax:{enabled:true},
  metadata:{application:'lifestylehub'},subscription_data:{metadata:{application:'lifestylehub'}},
  success_url:`${config.site}/?checkout=success`,cancel_url:`${config.site}/diet-plan?checkout=cancelled`,
  integration_identifier:`lifestylehub_${letters}`,
 },{idempotencyKey:`lifestyle-${randomUUID()}`});
 if(!session.url||new URL(session.url).hostname!=='checkout.stripe.com')throw new Error('Unexpected checkout URL');
 await store.setJSON(`checkout/${session.id}`,{subscriptionId:idOf(session.subscription)||null,plan:input.plan,confirmed:false});
 return json(200,{url:session.url},{'Set-Cookie':cookie(session.id,config.cookieSecret)});
}
/** @param {Request} request
 * @param {{env?:Record<string,string|undefined>,stripe?:any,store?:any}} [dependencies] */
export async function membership(request,{env=process.env,stripe,store}={}){
 const config=paymentConfig(env);if(!config)return json(200,{subscription:null,verification:'unavailable'});
 if(request.method!=='GET')return json(405,{error:'Method not allowed.'});
 if(!readSession(request,config.cookieSecret))return json(200,{subscription:null});
 stripe||=createClient(config);store||=paymentStore();
 const owned=await retrieveOwnedSession(request,config,stripe,store);
 if(!owned||!owned.owned.confirmed||owned.session.payment_status!=='paid')return json(200,{subscription:null,verification:'pending'});
 const {session}=owned;const sub=session.subscription;if(!sub||typeof sub==='string')return json(200,{subscription:null});
 const tier=lookupPlan(sub.items?.data?.[0]?.price?.id,config.prices);
 const state=await store.get(`subscription/${sub.id}`,{type:'json'});
 const risk=await store.get(`risk/${sub.id}`,{type:'json'});
 if(!tier||!validPrice(sub.items.data[0].price,tier)||sub.status!=='active'||typeof sub.latest_invoice!=='object'||sub.latest_invoice?.status!=='paid'||state?.active!==true||risk?.reviewRequired===true)return json(200,{subscription:null});
 return json(200,{subscription:{isActive:true,tier,subscribedAt:new Date(sub.created*1000).toISOString(),customerName:session.customer_details?.name||'',customerEmail:session.customer_details?.email||'',paymentMethod:'Stripe-hosted checkout',invoiceId:idOf(sub.latest_invoice)||'',autoRenew:!sub.cancel_at_period_end}},{'Set-Cookie':cookie(session.id,config.cookieSecret)});
}
/** @param {Request} request
 * @param {{env?:Record<string,string|undefined>,stripe?:any,store?:any}} [dependencies] */
export async function portal(request,{env=process.env,stripe,store}={}){
 const config=paymentConfig(env);if(!config)return json(503,{error:'Subscription management is unavailable.'});
 if(request.method!=='POST')return json(405,{error:'Method not allowed.'});
 if(!validOrigin(request,config))return json(403,{error:'Invalid origin.'});
 stripe||=createClient(config);store||=paymentStore();const owned=await retrieveOwnedSession(request,config,stripe,store);
 if(!owned?.owned.confirmed||!idOf(owned.session.customer))return json(401,{error:'No verified customer session was found in this browser.'});
 const session=await stripe.billingPortal.sessions.create({customer:idOf(owned.session.customer),return_url:`${config.site}/?billing=return`});
 return json(200,{url:session.url});
}
async function currentSubscriptionState(stripe,id){
 const sub=await stripe.subscriptions.retrieve(id,{expand:['latest_invoice']});
 return {active:sub.status==='active'&&sub.latest_invoice?.status==='paid',status:sub.status};
}
const subOfInvoice=invoice=>idOf(invoice.parent?.subscription_details?.subscription||invoice.subscription);
export async function processEvent(event,stripe,store){
 if(await store.get(`event/${event.id}`))return;
 const object=event.data.object;
 if(['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed'].includes(event.type)){
  const existing=await store.get(`checkout/${object.id}`,{type:'json'});
  if(existing&&object.metadata?.application==='lifestylehub'){
   const subId=idOf(object.subscription);
   const current=await stripe.checkout.sessions.retrieve(object.id);
   const confirmed=current.payment_status==='paid';
   await store.setJSON(`checkout/${object.id}`,{...existing,subscriptionId:subId,confirmed});
   if(subId)await store.setJSON(`subscription/${subId}`,await currentSubscriptionState(stripe,subId));
  }
 }else if(event.type.startsWith('customer.subscription.')){
  await store.setJSON(`subscription/${object.id}`,await currentSubscriptionState(stripe,object.id));
 }else if(['invoice.paid','invoice.payment_failed'].includes(event.type)){
  const subId=subOfInvoice(object);if(subId)await store.setJSON(`subscription/${subId}`,await currentSubscriptionState(stripe,subId));
 }else if(['charge.refunded','charge.dispute.created','radar.early_fraud_warning.created'].includes(event.type)){
  const charge=event.type==='charge.refunded'?object:await stripe.charges.retrieve(idOf(object.charge));
  const intent=idOf(charge.payment_intent);
  if(intent){
   const payments=await stripe.invoicePayments.list({payment:{type:'payment_intent',payment_intent:intent},limit:100});
   for(const payment of payments.data){const invoice=await stripe.invoices.retrieve(idOf(payment.invoice));const subId=subOfInvoice(invoice);if(subId)await store.setJSON(`risk/${subId}`,{reviewRequired:true,eventType:event.type,eventId:event.id});}
  }
 }
 await store.setJSON(`event/${event.id}`,{processedAt:new Date().toISOString(),type:event.type});
}
/** @param {Request} request
 * @param {{env?:Record<string,string|undefined>,stripe?:any,store?:any}} [dependencies] */
export async function webhook(request,{env=process.env,stripe,store}={}){
 const config=paymentConfig(env);if(!config)return json(503,{error:'Webhook is not configured.'});
 if(request.method!=='POST')return json(405,{error:'Method not allowed.'});
 stripe||=createClient(config);const raw=await request.text();if(Buffer.byteLength(raw)>2_000_000)return json(413,{error:'Payload too large.'});
 let event;try{event=stripe.webhooks.constructEvent(raw,request.headers.get('stripe-signature')||'',config.webhookSecret);}catch{return json(400,{error:'Invalid webhook signature.'});}
 store||=paymentStore();await processEvent(event,stripe,store);return json(200,{received:true});
}
export function endpoint(handler){return async request=>{try{return await handler(request);}catch{return json(503,{error:'The payment service is temporarily unavailable. No successful payment or membership is being claimed.'});}};}
