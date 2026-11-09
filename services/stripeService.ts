import type {SubscriptionState,PlanTier} from '../types';

async function api(path:string,body?:unknown){
 const response=await fetch(`/api/${path}`,{method:body===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(20000),...(body===undefined?{}:{body:JSON.stringify(body)})});
 if(!response.headers.get('content-type')?.includes('application/json'))throw new Error('Secure checkout is not connected to this website yet. No payment has been taken.');
 const data=await response.json();if(!response.ok)throw new Error(typeof data.error==='string'?data.error:'The payment service is unavailable. No successful payment is being claimed.');
 return data;
}
export function stripeHostedUrl(value:unknown,host='checkout.stripe.com'):string|null{
 if(typeof value!=='string')return null;
 try{const u=new URL(value);return u.protocol==='https:'&&u.hostname===host&&!u.port&&!u.username&&!u.password&&u.pathname.length>1?u.href:null;}catch{return null;}
}
export async function getCheckoutAvailability():Promise<boolean>{try{const data=await api('payment-status');return data.available===true;}catch{return false;}}
export async function getVerifiedSubscription():Promise<SubscriptionState|null>{
 const data=await api('membership');const sub=data.subscription;
 return sub?.isActive===true&&['essentials','plus','coach'].includes(sub.tier)&&typeof sub.customerEmail==='string'&&typeof sub.invoiceId==='string'?sub:null;
}
export async function beginCheckout(input:{plan:PlanTier;name:string;email:string;termsAccepted:boolean}){
 if(!await getCheckoutAvailability())throw new Error('Secure checkout is not connected yet. No payment has been taken.');
 const data=await api('checkout',input);const url=stripeHostedUrl(data.url);if(!url)throw new Error('A valid Stripe checkout was not returned. No payment has been taken.');
 window.location.assign(url);
}
export async function openBillingPortal(){const data=await api('billing-portal',{});const url=stripeHostedUrl(data.url,'billing.stripe.com');if(!url)throw new Error('A valid Stripe billing portal was not returned.');window.location.assign(url);}
export async function askCoach(question:string):Promise<string>{const data=await api('coach',{question});if(typeof data.answer!=='string')throw new Error('The coach is unavailable.');return data.answer;}
